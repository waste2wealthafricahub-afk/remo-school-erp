import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export default function ResultEntry() {
  const [students, setStudents] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState(null);

  const [formData, setFormData] = useState({
    admission_no: "",
    student_name: "",
    class: "",
    arm: "",
    subject: "",
    term: "",
    session: "",
    ca1: "",
    ca2: "",
    exam: "",
  });

  const [computed, setComputed] = useState({
    total: 0,
    grade: "",
    remark: "",
  });

  useEffect(() => {
    const storedTeacher =
      localStorage.getItem("teacher");

    if (storedTeacher) {
      const teacherData =
        JSON.parse(storedTeacher);

      setTeacher(teacherData);

      setFormData((prev) => ({
        ...prev,
        subject: teacherData.subject,
        class: teacherData.class,
        arm: teacherData.arm,
      }));

      fetchStudents(
        teacherData.class,
        teacherData.arm
      );
    } else {
      fetchStudents();
      fetchSubjects();
    }
  }, []);

  const fetchStudents = async (
    teacherClass = null,
    teacherArm = null
  ) => {
    let query = supabase
      .from("students")
      .select("*")
      .order("surname");

    if (teacherClass) {
      query = query.eq("class", teacherClass);
    }

    if (teacherArm) {
      query = query.eq("arm", teacherArm);
    }

    const { data, error } = await query;

    if (!error) {
      setStudents(data || []);
    } else {
      console.error(error);
    }
  };

  const fetchSubjects = async () => {
    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .order("subject_name");

    if (!error) {
      setSubjects(data || []);
    }
  };

  const handleStudentChange = (e) => {
    const selectedAdmissionNo = e.target.value;

    const student = students.find(
      (s) => s.admission_no === selectedAdmissionNo
    );

    if (student) {
      setFormData((prev) => ({
        ...prev,
        admission_no: student.admission_no,
        student_name: `${student.surname} ${student.other_names}`,
        class: student.class,
        arm: student.arm,
      }));
    }
  };

  const calculateGrade = (total) => {
    if (total >= 70) return ["A", "Excellent"];
    if (total >= 60) return ["B", "Very Good"];
    if (total >= 50) return ["C", "Good"];
    if (total >= 45) return ["D", "Fair"];
    if (total >= 40) return ["E", "Pass"];
    return ["F", "Fail"];
  };

  const handleChange = (e) => {
    const updated = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    setFormData(updated);

    const ca1 = Number(updated.ca1 || 0);
    const ca2 = Number(updated.ca2 || 0);
    const exam = Number(updated.exam || 0);

    const total = ca1 + ca2 + exam;
    const [grade, remark] =
      calculateGrade(total);

    setComputed({
      total,
      grade,
      remark,
    });
  };

  const saveResult = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      admission_no: formData.admission_no,
      student_name: formData.student_name,
      class: formData.class,
      arm: formData.arm,
      subject: formData.subject,
      term: formData.term,
      session: formData.session,
      ca1: Number(formData.ca1),
      ca2: Number(formData.ca2),
      exam: Number(formData.exam),
      total: computed.total,
      score: computed.total,
      grade: computed.grade,
      teacher_remark: computed.remark,
    };

    const { error } = await supabase
      .from("results")
      .insert([payload]);

    if (error) {
      console.error(error);
      alert("Failed to save result");
    } else {
      alert("Result saved successfully");

      setFormData((prev) => ({
        ...prev,
        admission_no: "",
        student_name: "",
        term: "",
        session: "",
        ca1: "",
        ca2: "",
        exam: "",
      }));

      setComputed({
        total: 0,
        grade: "",
        remark: "",
      });
    }

    setLoading(false);
  };

  return (
      <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">
          Result Entry
        </h1>

        {teacher && (
          <div className="mb-6 bg-green-50 border border-green-300 rounded-xl p-4">
            <p className="font-bold text-green-700">
              Teacher Mode Enabled
            </p>
            <p>
              Subject: <b>{teacher.subject}</b> | Class:{" "}
              <b>{teacher.class}</b> | Arm:{" "}
              <b>{teacher.arm}</b>
            </p>
          </div>
        )}

        <form
          onSubmit={saveResult}
          className="grid md:grid-cols-2 gap-6"
        >
          {/* STUDENT */}
          <div>
            <label className="block font-semibold mb-2">
              Student
            </label>

            <select
              onChange={handleStudentChange}
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

          {/* SUBJECT */}
          <div>
            <label className="block font-semibold mb-2">
              Subject
            </label>

            {teacher ? (
              <input
                value={formData.subject}
                readOnly
                className="w-full border rounded-xl px-4 py-3 bg-gray-100"
              />
            ) : (
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option value="">
                  Select Subject
                </option>

                {subjects.map((subject) => (
                  <option
                    key={subject.id}
                    value={subject.subject_name}
                  >
                    {subject.subject_name}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* TERM */}
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
              <option value="first">
                First Term
              </option>
              <option value="second">
                Second Term
              </option>
              <option value="third">
                Third Term
              </option>
            </select>
          </div>

          {/* SESSION */}
          <div>
            <label className="block font-semibold mb-2">
              Session
            </label>

            <select
              name="session"
              value={formData.session}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="">
                Select Session
              </option>
              <option value="2024/2025">
                2024/2025
              </option>
              <option value="2025/2026">
                2025/2026
              </option>
              <option value="2026/2027">
                2026/2027
              </option>
            </select>
          </div>

          <InputField
            label="CA1"
            name="ca1"
            type="number"
            value={formData.ca1}
            onChange={handleChange}
          />

          <InputField
            label="CA2"
            name="ca2"
            type="number"
            value={formData.ca2}
            onChange={handleChange}
          />

          <InputField
            label="Exam"
            name="exam"
            type="number"
            value={formData.exam}
            onChange={handleChange}
          />

          {/* SUMMARY */}
          <div className="bg-blue-50 rounded-xl p-5">
            <p><b>Total:</b> {computed.total}</p>
            <p><b>Grade:</b> {computed.grade}</p>
            <p><b>Remark:</b> {computed.remark}</p>
            <p><b>Class:</b> {formData.class}</p>
            <p><b>Arm:</b> {formData.arm}</p>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white py-4 rounded-xl font-bold"
            >
              {loading
                ? "Saving..."
                : "Save Result"}
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