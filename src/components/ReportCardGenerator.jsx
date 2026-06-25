import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import rssLogo from "../assets/rss-logo.png";

export default function ReportCardGenerator() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [term, setTerm] = useState("");
  const [session, setSession] = useState("");

  const [results, setResults] = useState([]);
  const [studentInfo, setStudentInfo] = useState(null);
  const [extras, setExtras] = useState(null);

  const [position, setPosition] = useState(null);
  const [classSize, setClassSize] = useState(0);

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

  const calculatePosition = async (
    student,
    selectedTerm,
    selectedSession
  ) => {
    const { data } = await supabase
      .from("results")
      .select("*")
      .eq("class", student.class)
      .eq("arm", student.arm)
      .eq("term", selectedTerm)
      .eq("session", selectedSession);

    if (!data) return;

    const grouped = {};

    data.forEach((row) => {
      if (!grouped[row.admission_no]) {
        grouped[row.admission_no] = {
          total: 0,
          count: 0,
        };
      }

      grouped[row.admission_no].total += Number(row.total || 0);
      grouped[row.admission_no].count += 1;
    });

    const ranking = Object.entries(grouped)
      .map(([admission_no, scores]) => ({
        admission_no,
        average: scores.total / scores.count,
      }))
      .sort((a, b) => b.average - a.average);

    const rank =
      ranking.findIndex(
        (item) =>
          item.admission_no === student.admission_no
      ) + 1;

    setPosition(rank);
    setClassSize(ranking.length);
  };

  const generateReport = async () => {
    if (!selectedStudent || !term || !session) {
      alert("Select student, term and session");
      return;
    }

    const student = students.find(
      (s) => s.admission_no === selectedStudent
    );

    if (!student) return;

    setStudentInfo(student);

    await calculatePosition(student, term, session);

    const { data: resultData } = await supabase
      .from("results")
      .select("*")
      .eq("admission_no", selectedStudent)
      .eq("term", term)
      .eq("session", session);

    setResults(resultData || []);

    const { data: extrasData } = await supabase
      .from("report_extras")
      .select("*")
      .eq("admission_no", selectedStudent)
      .eq("term", term)
      .eq("session", session)
      .single();

    setExtras(extrasData || null);
  };

  const totalScore = results.reduce(
    (sum, item) => sum + Number(item.total || 0),
    0
  );

  const average =
    results.length > 0
      ? (totalScore / results.length).toFixed(1)
      : 0;
  return (

        <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">
          Report Card Generator
        </h1>

        {/* Controls */}
        <div className="no-print grid md:grid-cols-4 gap-4 mb-8">
          <select
            value={selectedStudent}
            onChange={(e) =>
              setSelectedStudent(e.target.value)
            }
            className="border rounded-xl px-4 py-3"
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

          <select
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="">Select Term</option>
            <option value="first">First Term</option>
            <option value="second">Second Term</option>
            <option value="third">Third Term</option>
          </select>

          <select
            value={session}
            onChange={(e) => setSession(e.target.value)}
            className="border rounded-xl px-4 py-3"
          >
            <option value="">Select Session</option>
            <option value="2024/2025">2024/2025</option>
            <option value="2025/2026">2025/2026</option>
            <option value="2026/2027">2026/2027</option>
          </select>

          <button
            onClick={generateReport}
            className="bg-blue-900 text-white rounded-xl px-4 py-3 font-bold"
          >
            Generate
          </button>
        </div>

        {studentInfo && results.length > 0 && (
          <div className="print-card border-2 rounded-2xl p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-8">
              <img
                src={rssLogo}
                alt="Logo"
                className="w-24 h-24"
              />

              <div className="text-center flex-1">
                <h2 className="text-3xl font-bold text-green-700">
                  REMO SECONDARY SCHOOL
                </h2>

                <p className="italic mt-2">
                  For God and Fatherland
                </p>

                <h3 className="text-xl font-bold mt-3 text-yellow-600">
                  TERMINAL REPORT CARD
                </h3>
              </div>

              <img
                src={
                  studentInfo.passport_url ||
                  "https://via.placeholder.com/120"
                }
                alt="Passport"
                className="w-24 h-28 border object-cover"
              />
            </div>

            {/* Student Info */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <p>
                <b>Name:</b> {studentInfo.surname}{" "}
                {studentInfo.other_names}
              </p>

              <p>
                <b>Admission No:</b>{" "}
                {studentInfo.admission_no}
              </p>

              <p>
                <b>Class:</b> {studentInfo.class}
              </p>

              <p>
                <b>Arm:</b> {studentInfo.arm}
              </p>

              <p>
                <b>Term:</b> {term}
              </p>

              <p>
                <b>Session:</b> {session}
              </p>

              <p>
                <b>Position:</b> {position} / {classSize}
              </p>

              <p>
                <b>Average:</b> {average}
              </p>
            </div>

            {/* Result Table */}
            <table className="w-full border mb-8">
              <thead className="bg-green-700 text-white">
                <tr>
                  <th className="p-3">Subject</th>
                  <th className="p-3">CA1</th>
                  <th className="p-3">CA2</th>
                  <th className="p-3">Exam</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Grade</th>
                </tr>
              </thead>

              <tbody>
                {results.map((item) => (
                  <tr key={item.id} className="border-b">
                    <td className="p-3">{item.subject}</td>
                    <td className="p-3 text-center">{item.ca1}</td>
                    <td className="p-3 text-center">{item.ca2}</td>
                    <td className="p-3 text-center">{item.exam}</td>
                    <td className="p-3 text-center">{item.total}</td>
                    <td className="p-3 text-center font-bold">
                      {item.grade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
                        {/* Attendance + Extras */}
            {extras && (
              <>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Attendance */}
                  <div className="border rounded-xl p-4">
                    <h3 className="font-bold text-lg mb-3 text-blue-900">
                      Attendance Summary
                    </h3>

                    <p>
                      <b>School Opened:</b>{" "}
                      {extras.school_opened}
                    </p>

                    <p>
                      <b>Times Present:</b>{" "}
                      {extras.times_present}
                    </p>

                    <p>
                      <b>Times Absent:</b>{" "}
                      {extras.school_opened -
                        extras.times_present}
                    </p>
                  </div>

                  {/* Affective */}
                  <div className="border rounded-xl p-4">
                    <h3 className="font-bold text-lg mb-3 text-blue-900">
                      Affective Domain
                    </h3>

                    <p>Punctuality: {extras.punctuality}</p>
                    <p>Neatness: {extras.neatness}</p>
                    <p>Honesty: {extras.honesty}</p>
                    <p>Leadership: {extras.leadership}</p>
                    <p>Cooperation: {extras.cooperation}</p>
                    <p>Politeness: {extras.politeness}</p>
                  </div>
                </div>

                {/* Psychomotor */}
                <div className="border rounded-xl p-4 mb-8">
                  <h3 className="font-bold text-lg mb-3 text-blue-900">
                    Psychomotor
                  </h3>

                  <div className="grid md:grid-cols-3 gap-3">
                    <p>Handwriting: {extras.handwriting}</p>
                    <p>Sports: {extras.sports}</p>
                    <p>Creativity: {extras.creativity}</p>
                    <p>
                      Practical Skills:{" "}
                      {extras.practical_skills}
                    </p>
                    <p>Drawing: {extras.drawing}</p>
                  </div>
                </div>
              </>
            )}

            {/* Remarks */}
            <div className="space-y-3">
              <p>
                <b>Total Score:</b> {totalScore}
              </p>

              <p>
                <b>Teacher Remark:</b>{" "}
                {results[0]?.teacher_remark ||
                  "Pending"}
              </p>

              <p>
                <b>Principal Remark:</b>{" "}
                {extras?.principal_remark ||
                  "Pending"}
              </p>
            </div>

            {/* Signatures */}
            <div className="grid grid-cols-3 gap-8 mt-12 text-center">
              <div>
                <div className="border-t pt-2">
                  Class Teacher
                </div>
              </div>

              <div>
                <div className="border-t pt-2">
                  Principal
                </div>
              </div>

              <div>
                <div className="border-t pt-2">
                  School Stamp
                </div>
              </div>
            </div>

            <button
              onClick={() => window.print()}
              className="mt-8 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-bold"
            >
              Print Report Card
            </button>
          </div>
        )}
      </div>
    </div>
  );
}