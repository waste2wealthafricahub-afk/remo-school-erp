import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function SubjectManagement() {
  const [subjects, setSubjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    subject_name: "",
    subject_code: "",
    school_section: "",
    category: "",
  });

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .order("id", { ascending: false });

    if (!error) {
      setSubjects(data || []);
    } else {
      console.error(error);
    }

    setLoading(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addSubject = async (e) => {
    e.preventDefault();

    const { error } = await supabase
      .from("subjects")
      .insert([
        {
          ...formData,
          status: "Active",
        },
      ]);

    if (error) {
      alert("Failed to add subject");
      console.error(error);
    } else {
    setMessage("Subject added successfully");
      setFormData({
        subject_name: "",
        subject_code: "",
        school_section: "",
        category: "",
      });
      fetchSubjects();
    }
  };

  const deleteSubject = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this subject?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("subjects")
      .delete()
      .eq("id", id);

    if (!error) {
      fetchSubjects();
    }
  };

  const filteredSubjects = subjects.filter((subject) =>
    `${subject.subject_name} ${subject.subject_code}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-900 mb-8">
          Subject Management
        </h1>

        {/* FORM */}
        <form
          onSubmit={addSubject}
          className="bg-white rounded-2xl shadow-xl p-8 mb-8 grid md:grid-cols-2 gap-6"
        >
          <InputField
            label="Subject Name"
            name="subject_name"
            value={formData.subject_name}
            onChange={handleChange}
          />

          <InputField
            label="Subject Code"
            name="subject_code"
            value={formData.subject_code}
            onChange={handleChange}
          />

          <div>
            <label className="block font-semibold mb-2">
              School Section
            </label>

            <select
              name="school_section"
              value={formData.school_section}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="">Select Section</option>
              <option>Junior</option>
              <option>Senior</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="">Select Category</option>
              <option>General</option>
              <option>Science</option>
              <option>Arts</option>
              <option>Commercial</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              className="w-full bg-blue-900 hover:bg-blue-800 text-white py-4 rounded-xl font-bold"
            >
              Add Subject
            </button>
          </div>
        </form>

        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search subject..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full md:w-96 border rounded-xl px-4 py-3 mb-8"
        />

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">

          {loading ? (
            <p className="p-8">Loading...</p>
          ) : (
            <table className="w-full">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="px-4 py-4 text-left">Subject</th>
                  <th className="px-4 py-4 text-left">Code</th>
                  <th className="px-4 py-4 text-left">Section</th>
                  <th className="px-4 py-4 text-left">Category</th>
                  <th className="px-4 py-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredSubjects.map((subject) => (
                  <tr
                    key={subject.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-4 py-4">
                      {subject.subject_name}
                    </td>

                    <td className="px-4 py-4">
                      {subject.subject_code}
                    </td>

                    <td className="px-4 py-4">
                      {subject.school_section}
                    </td>

                    <td className="px-4 py-4">
                      {subject.category}
                    </td>

                    <td className="px-4 py-4">
                      <button
                        onClick={() =>
                          deleteSubject(subject.id)
                        }
                        className="bg-red-500 text-white px-3 py-2 rounded-lg"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="block font-semibold mb-2">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-xl px-4 py-3"
      />
    </div>
  );
}