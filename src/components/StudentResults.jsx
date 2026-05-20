import {
  useState,
} from "react";

import { supabase } from "../supabase";

export default function StudentResults() {
  const [
    admissionNumber,
    setAdmissionNumber,
  ] = useState("");

  const [student, setStudent] =
    useState(null);

  const [results, setResults] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const checkResults = async () => {
    if (!admissionNumber) {
      alert("Enter admission number");
      return;
    }

    setLoading(true);

    // FETCH STUDENT
    const {
      data: studentData,
    } = await supabase
      .from("admission_inquiries")
      .select("*")
      .eq(
        "admission_number",
        admissionNumber
      )
      .single();

    if (!studentData) {
      alert("Student not found");

      setLoading(false);

      return;
    }

    setStudent(studentData);

    // FETCH RESULTS
    const {
      data: resultData,
    } = await supabase
      .from("results")
      .select("*")
      .eq(
        "student_name",
        studentData.student_name
      );

    setResults(resultData || []);

    setLoading(false);
  };

  const total =
    results.reduce(
      (sum, item) =>
        sum + Number(item.score),
      0
    );

  const average =
    results.length > 0
      ? (
          total / results.length
        ).toFixed(2)
      : 0;

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <aside className="w-72 bg-blue-900 text-white p-8 hidden md:block">

        <h1 className="text-3xl font-bold mb-12">
          Results Portal
        </h1>

        <nav className="space-y-5">

          <p className="hover:text-yellow-300 cursor-pointer">
            Dashboard
          </p>

          <p className="hover:text-yellow-300 cursor-pointer">
            Results
          </p>

          <p className="hover:text-yellow-300 cursor-pointer">
            Report Card
          </p>

        </nav>

      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">

        {/* HEADER */}
        <div className="mb-10">

          <h2 className="text-4xl font-bold text-blue-900">
            Student Result Checker
          </h2>

          <p className="text-gray-600 mt-2">
            View academic performance online
          </p>

        </div>

        {/* SEARCH CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl">

          <h3 className="text-2xl font-bold text-blue-900 mb-6">
            Check Results
          </h3>

          <input
            type="text"
            placeholder="Enter Admission Number"
            value={admissionNumber}
            onChange={(e) =>
              setAdmissionNumber(
                e.target.value
              )
            }
            className={inputStyle}
          />

          <button
            onClick={checkResults}
            className="mt-5 bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold"
          >
            {loading
              ? "Checking..."
              : "Check Results"}
          </button>

        </div>

        {/* STUDENT INFO */}
        {student && (

          <div className="mt-10">

            {/* PROFILE CARD */}
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-10">

              <div className="flex flex-col md:flex-row gap-8 items-center">

                {student.passport_url ? (
                  <img
                    src={
                      student.passport_url
                    }
                    alt="Passport"
                    className="w-44 h-44 rounded-2xl object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-44 h-44 bg-gray-200 rounded-2xl flex items-center justify-center">
                    No Passport
                  </div>
                )}

                <div>

                  <h2 className="text-3xl font-bold text-blue-900 mb-4">
                    {
                      student.student_name
                    }
                  </h2>

                  <div className="space-y-3 text-lg">

                    <p>
                      <strong>
                        Admission No:
                      </strong>{" "}
                      {
                        student.admission_number
                      }
                    </p>

                    <p>
                      <strong>
                        Class:
                      </strong>{" "}
                      {
                        student.student_class
                      }
                    </p>

                    <p>
                      <strong>
                        Status:
                      </strong>{" "}

                      <span className="text-green-600 font-bold">
                        {
                          student.status
                        }
                      </span>

                    </p>

                  </div>

                </div>

              </div>

            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

              <div className={cardStyle}>
                <h3 className="text-xl font-bold">
                  Subjects
                </h3>

                <p className="text-4xl font-bold text-blue-900 mt-4">
                  {results.length}
                </p>
              </div>

              <div className={cardStyle}>
                <h3 className="text-xl font-bold">
                  Total Score
                </h3>

                <p className="text-4xl font-bold text-green-600 mt-4">
                  {total}
                </p>
              </div>

              <div className={cardStyle}>
                <h3 className="text-xl font-bold">
                  Average
                </h3>

                <p className="text-4xl font-bold text-yellow-500 mt-4">
                  {average}
                </p>
              </div>

            </div>

            {/* RESULTS TABLE */}
            <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">

              <table className="w-full">

                <thead className="bg-blue-900 text-white">

                  <tr>

                    <th className={tableHeader}>
                      Subject
                    </th>

                    <th className={tableHeader}>
                      Score
                    </th>

                    <th className={tableHeader}>
                      Grade
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {results.map((item) => (

                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className={tableCell}>
                        {item.subject}
                      </td>

                      <td className={tableCell}>
                        {item.score}
                      </td>

                      <td className={tableCell}>

                        {item.score >= 70
                          ? "A"
                          : item.score >=
                            60
                          ? "B"
                          : item.score >=
                            50
                          ? "C"
                          : item.score >=
                            45
                          ? "D"
                          : item.score >=
                            40
                          ? "E"
                          : "F"}

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

            {/* PRINT */}
            <button
              onClick={() =>
                window.print()
              }
              className="mt-10 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold"
            >
              Print Report
            </button>

          </div>

        )}

      </main>

    </div>
  );
}

const inputStyle =
  "w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-blue-300";

const cardStyle =
  "bg-white rounded-2xl shadow-xl p-8";

const tableHeader =
  "text-left px-6 py-4";

const tableCell =
  "px-6 py-4";