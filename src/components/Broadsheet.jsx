import { useState } from "react";
import { supabase } from "../supabase";

export default function Broadsheet() {
  const [selectedClass, setSelectedClass] = useState("");
  const [arm, setArm] = useState("");
  const [term, setTerm] = useState("");
  const [session, setSession] = useState("");
  const [records, setRecords] = useState([]);

  const generateBroadsheet = async () => {
    if (!selectedClass || !arm || !term || !session) {
      alert("Please select all fields");
      return;
    }

    const { data: students, error: studentError } =
      await supabase
        .from("students")
        .select("*")
        .eq("class", selectedClass)
        .eq("arm", arm);

    if (studentError) {
      console.error(studentError);
      return;
    }

    const broadsheetData = [];

    for (const student of students || []) {
      const { data: results, error } = await supabase
        .from("results")
        .select("*")
        .eq("admission_no", student.admission_no)
        .eq("class", selectedClass)
        .eq("arm", arm)
        .eq("term", term)
        .eq("session", session);

      if (error) {
        console.error(error);
        continue;
      }

      const total = (results || []).reduce(
        (sum, row) => sum + (row.total || 0),
        0
      );

      const subjectCount = results?.length || 0;

      const average =
        subjectCount > 0
          ? total / subjectCount
          : 0;

      let grade = "F";

      if (average >= 70) grade = "A";
      else if (average >= 60) grade = "B";
      else if (average >= 50) grade = "C";
      else if (average >= 45) grade = "D";
      else if (average >= 40) grade = "E";

      broadsheetData.push({
        admission_no: student.admission_no,
        name: `${student.surname} ${student.other_names}`,
        total,
        average: average.toFixed(1),
        grade,
      });
    }

    broadsheetData.sort(
      (a, b) => b.average - a.average
    );

    const ranked = broadsheetData.map(
      (item, index) => ({
        ...item,
        position: index + 1,
      })
    );

    setRecords(ranked);
  };
    return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">
          Broadsheet
        </h1>

        <div className="grid md:grid-cols-5 gap-4 mb-6">
          <input
            type="text"
            placeholder="Class"
            value={selectedClass}
            onChange={(e) =>
              setSelectedClass(e.target.value)
            }
            className="border rounded-xl px-4 py-3"
          />

          <input
            type="text"
            placeholder="Arm"
            value={arm}
            onChange={(e) => setArm(e.target.value)}
            className="border rounded-xl px-4 py-3"
          />

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
            onClick={generateBroadsheet}
            className="bg-blue-900 text-white rounded-xl px-4 py-3 font-bold"
          >
            Generate
          </button>
        </div>

        {records.length > 0 && (
          <>
            <table className="w-full border">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="p-3">Position</th>
                  <th className="p-3">Admission No</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Average</th>
                  <th className="p-3">Grade</th>
                </tr>
              </thead>

              <tbody>
                {records.map((item) => (
                  <tr key={item.admission_no} className="border-b">
                    <td className="p-3 text-center">
                      {item.position}
                    </td>
                    <td className="p-3">
                      {item.admission_no}
                    </td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3 text-center">
                      {item.total}
                    </td>
                    <td className="p-3 text-center">
                      {item.average}
                    </td>
                    <td className="p-3 text-center font-bold">
                      {item.grade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={() => window.print()}
              className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl font-bold"
            >
              Print Broadsheet
            </button>
          </>
        )}
      </div>
    </div>
  );
}