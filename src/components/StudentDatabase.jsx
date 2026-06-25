import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function StudentDatabase() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from("students")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.error(error);
    } else {
      setStudents(data || []);
    }

    setLoading(false);
  };

  const deleteStudent = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this student?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("students")
      .delete()
      .eq("id", id);

    if (error) {
      alert("Failed to delete student");
      console.error(error);
    } else {
      alert("Student deleted successfully");
      fetchStudents();
    }
  };

  const filteredStudents = students.filter((student) =>
    `${student.surname || ""} ${student.other_names || ""} ${student.admission_no || ""}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const totalStudents = students.length;
  const juniorStudents = students.filter(
    (s) => s.school_section === "Junior"
  ).length;
  const seniorStudents = students.filter(
    (s) => s.school_section === "Senior"
  ).length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-900 mb-8">
          Student Database
        </h1>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard title="Total Students" value={totalStudents} />
          <StatCard title="Junior Students" value={juniorStudents} />
          <StatCard title="Senior Students" value={seniorStudents} />
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or admission number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 border rounded-xl px-4 py-3 mb-8"
        />

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
          {loading ? (
            <p className="p-8">Loading students...</p>
          ) : (
            <table className="w-full">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className={headerStyle}>Admission No</th>
                  <th className={headerStyle}>Name</th>
                  <th className={headerStyle}>Class</th>
                  <th className={headerStyle}>Arm</th>
                  <th className={headerStyle}>Section</th>
                  <th className={headerStyle}>Parent Phone</th>
                  <th className={headerStyle}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredStudents.map((student) => (
                  <tr
                    key={student.id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className={cellStyle}>
                      {student.admission_no}
                    </td>

                    <td className={cellStyle}>
                      {student.surname} {student.other_names}
                    </td>

                    <td className={cellStyle}>
                      {student.class}
                    </td>

                    <td className={cellStyle}>
                      {student.arm}
                    </td>

                    <td className={cellStyle}>
                      {student.school_section}
                    </td>

                    <td className={cellStyle}>
                      {student.parent_phone}
                    </td>

                    <td className={cellStyle}>
                      <div className="flex gap-2">

                        <button
  onClick={() =>
    window.location.href =
      `/student-registration?id=${student.id}`
  }
  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg"
>
  Edit
</button>

                        <button
                          onClick={() =>
                            deleteStudent(student.id)
                          }
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg"
                        >
                          Delete
                        </button>

                      </div>
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

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h2 className="text-lg text-gray-600">
        {title}
      </h2>

      <p className="text-4xl font-bold text-blue-900 mt-3">
        {value}
      </p>
    </div>
  );
}

const headerStyle = "px-4 py-4 text-left";
const cellStyle = "px-4 py-4";