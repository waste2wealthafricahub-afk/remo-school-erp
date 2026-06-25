import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function ReportExtrasForm() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    admission_no: "",
    term: "",
    session: "",
    school_opened: 0,
    times_present: 0,

    punctuality: 3,
    neatness: 3,
    honesty: 3,
    leadership: 3,
    cooperation: 3,
    politeness: 3,

    handwriting: 3,
    sports: 3,
    creativity: 3,
    practical_skills: 3,
    drawing: 3,

    principal_remark: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const { data } = await supabase
      .from("students")
      .select("*")
      .order("surname");

    setStudents(data || []);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "number"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const saveExtras = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from("report_extras")
      .insert([formData]);

    if (error) {
      console.error(error);
      alert("Failed to save");
    } else {
      alert("Report extras saved");
    }

    setLoading(false);
  };

  return (
        <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">
          Report Extras Entry
        </h1>

        <form
          onSubmit={saveExtras}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* Student */}
          <div>
            <label className="block font-semibold mb-2">
              Student
            </label>

            <select
              name="admission_no"
              value={formData.admission_no}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="">Select Student</option>

              {students.map((student) => (
                <option
                  key={student.id}
                  value={student.admission_no}
                >
                  {student.admission_no} - {student.surname}{" "}
                  {student.other_names}
                </option>
              ))}
            </select>
          </div>

          {/* Term */}
          <div>
            <label className="block font-semibold mb-2">
              Term
            </label>

            <select
              name="term"
              value={formData.term}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="">Select Term</option>
              <option value="first">First Term</option>
              <option value="second">Second Term</option>
              <option value="third">Third Term</option>
            </select>
          </div>

          {/* Session */}
          <InputField
            label="Session"
            name="session"
            value={formData.session}
            onChange={handleChange}
          />

          <InputField
            label="School Opened"
            name="school_opened"
            type="number"
            value={formData.school_opened}
            onChange={handleChange}
          />

          <InputField
            label="Times Present"
            name="times_present"
            type="number"
            value={formData.times_present}
            onChange={handleChange}
          />

          {/* Affective */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-blue-900 mt-4">
              Affective Domain (1–5)
            </h2>
          </div>

          <ScoreField label="Punctuality" name="punctuality" value={formData.punctuality} onChange={handleChange} />
          <ScoreField label="Neatness" name="neatness" value={formData.neatness} onChange={handleChange} />
          <ScoreField label="Honesty" name="honesty" value={formData.honesty} onChange={handleChange} />
          <ScoreField label="Leadership" name="leadership" value={formData.leadership} onChange={handleChange} />
          <ScoreField label="Cooperation" name="cooperation" value={formData.cooperation} onChange={handleChange} />
          <ScoreField label="Politeness" name="politeness" value={formData.politeness} onChange={handleChange} />

          {/* Psychomotor */}
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-blue-900 mt-4">
              Psychomotor (1–5)
            </h2>
          </div>

          <ScoreField label="Handwriting" name="handwriting" value={formData.handwriting} onChange={handleChange} />
          <ScoreField label="Sports" name="sports" value={formData.sports} onChange={handleChange} />
          <ScoreField label="Creativity" name="creativity" value={formData.creativity} onChange={handleChange} />
          <ScoreField label="Practical Skills" name="practical_skills" value={formData.practical_skills} onChange={handleChange} />
          <ScoreField label="Drawing" name="drawing" value={formData.drawing} onChange={handleChange} />

          {/* Remark */}
          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">
              Principal Remark
            </label>

            <textarea
              name="principal_remark"
              value={formData.principal_remark}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white py-4 rounded-xl font-bold"
            >
              {loading ? "Saving..." : "Save Report Extras"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>
      <label className="block font-semibold mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-xl px-4 py-3"
      />
    </div>
  );
}

function ScoreField({
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

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-xl px-4 py-3"
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
    </div>
  );
}