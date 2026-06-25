import { useState } from "react";
import { supabase } from "../supabase";

export default function StudentResults() {
  const [admissionNo, setAdmissionNo] = useState("");
  const [student, setStudent] = useState(null);
  const [results, setResults] = useState([]);
  const [position, setPosition] = useState(null);
  const [classAverage, setClassAverage] = useState(0);
  const [loading, setLoading] = useState(false);

  const getOrdinal = (n) => {
    if (n % 100 >= 11 && n % 100 <= 13) return `${n}th`;

    switch (n % 10) {
      case 1:
        return `${n}st`;
      case 2:
        return `${n}nd`;
      case 3:
        return `${n}rd`;
      default:
        return `${n}th`;
    }
  };

  const checkResults = async () => {
    if (!admissionNo) {
      alert("Enter admission number");
      return;
    }

    setLoading(true);
    setStudent(null);
    setResults([]);
    setPosition(null);
    setClassAverage(0);

    // Fetch student
    const { data: studentData, error: studentError } =
      await supabase
        .from("students")
        .select("*")
        .eq("admission_no", admissionNo)
        .single();

    if (studentError || !studentData) {
      alert("Student not found");
      setLoading(false);
      return;
    }

    setStudent(studentData);

    // Fetch student results
    const { data: resultData, error: resultError } =
      await supabase
        .from("results")
        .select("*")
        .eq("admission_no", admissionNo);

    if (resultError || !resultData || resultData.length === 0) {
      alert("No results found");
      setLoading(false);
      return;
    }

    setResults(resultData);

    const term = resultData[0]?.term;
    const session = resultData[0]?.session;

    // Fetch classmates results
    const { data: classResults } = await supabase
      .from("results")
      .select("*")
      .eq("class", studentData.class)
      .eq("arm", studentData.arm)
      .eq("term", term)
      .eq("session", session);

    if (classResults) {
      const grouped = {};

      classResults.forEach((row) => {
        if (!row.admission_no) return;

        if (!grouped[row.admission_no]) {
          grouped[row.admission_no] = [];
        }

        grouped[row.admission_no].push(
          Number(row.total || 0)
        );
      });

      const ranked = Object.entries(grouped).map(
        ([admission_no, scores]) => ({
          admission_no,
          average:
            scores.reduce((a, b) => a + b, 0) /
            scores.length,
        })
      );

      ranked.sort((a, b) => b.average - a.average);

      const pos =
        ranked.findIndex(
          (item) =>
            item.admission_no === admissionNo
        ) + 1;

      setPosition(pos);

      // Class Average
      const averages = ranked.map(
        (item) => item.average
      );

      const classAvg =
        averages.reduce((a, b) => a + b, 0) /
        averages.length;

      setClassAverage(classAvg.toFixed(1));
    }

    setLoading(false);
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
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-72 bg-blue-900 text-white p-8 hidden md:block">
        <h1 className="text-3xl font-bold mb-12">
          Results Portal
        </h1>
      </aside>

      <main className="flex-1 p-8">
        <h2 className="text-4xl font-bold text-blue-900">
          Student Result Checker
        </h2>

        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mt-8">
          <input
            type="text"
            placeholder="Admission Number"
            value={admissionNo}
            onChange={(e) =>
              setAdmissionNo(e.target.value)
            }
            className="w-full border rounded-xl px-5 py-4"
          />

          <button
            onClick={checkResults}
            className="mt-5 bg-blue-900 text-white px-8 py-4 rounded-xl font-bold"
          >
            {loading ? "Checking..." : "Check Results"}
          </button>
        </div>

        {student && (
          <div className="mt-10">
            {/* Profile */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-10">
              <div className="space-y-3 text-lg">
                <p>
                  <b>Name:</b> {student.surname}{" "}
                  {student.other_names}
                </p>

                <p>
                  <b>Admission No:</b>{" "}
                  {student.admission_no}
                </p>

                <p>
                  <b>Class:</b> {student.class}
                </p>

                <p>
                  <b>Arm:</b> {student.arm}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-5 gap-6 mb-10">
              <StatCard title="Subjects" value={results.length} color="text-blue-900" />
              <StatCard title="Total Score" value={totalScore} color="text-green-600" />
              <StatCard title="Average" value={average} color="text-yellow-500" />
              <StatCard
                title="Position"
                value={position ? getOrdinal(position) : "-"}
                color="text-red-500"
              />
              <StatCard
                title="Class Average"
                value={classAverage}
                color="text-purple-600"
              />
            </div>

            {/* Table */}
            <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
              <table className="w-full">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    <th className={tableHeader}>Subject</th>
                    <th className={tableHeader}>CA1</th>
                    <th className={tableHeader}>CA2</th>
                    <th className={tableHeader}>Exam</th>
                    <th className={tableHeader}>Total</th>
                    <th className={tableHeader}>Grade</th>
                  </tr>
                </thead>

                <tbody>
                  {results.map((item) => (
                    <tr key={item.id} className="border-b">
                      <td className={tableCell}>{item.subject}</td>
                      <td className={tableCell}>{item.ca1}</td>
                      <td className={tableCell}>{item.ca2}</td>
                      <td className={tableCell}>{item.exam}</td>
                      <td className={tableCell}>{item.total}</td>
                      <td className={tableCell}>{item.grade}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Remarks */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mt-8 space-y-4">
              <p>
                <b>Teacher Remark:</b>{" "}
                {results[0]?.teacher_remark || "Not Available"}
              </p>

              <p>
                <b>Principal Remark:</b>{" "}
                {results[0]?.principal_remark || "Pending Approval"}
              </p>
            </div>

            <button
              onClick={() => window.print()}
              className="mt-10 bg-green-600 text-white px-8 py-4 rounded-xl font-bold"
            >
              Print Result
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className={`text-4xl font-bold mt-4 ${color}`}>
        {value}
      </p>
    </div>
  );
}

const tableHeader = "text-left px-6 py-4";
const tableCell = "px-6 py-4";