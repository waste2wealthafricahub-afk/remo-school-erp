import {
  useState,
} from "react";

import { supabase } from "../supabase";

export default function ReportCard() {
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

  const checkReport = async () => {
    if (!admissionNumber) {
      alert("Enter admission number");
      return;
    }

    setLoading(true);

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
    <div className="min-h-screen bg-gray-100 py-10 px-6">

      <div className="max-w-6xl mx-auto">

        {/* SEARCH */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10">

          <h1 className="text-4xl font-bold text-blue-900 mb-6">
            Report Card Generator
          </h1>

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
            onClick={checkReport}
            className="mt-5 bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold"
          >
            {loading
              ? "Generating..."
              : "Generate Report"}
          </button>

        </div>

        {/* REPORT CARD */}
        {student && (

          <div
            id="reportCard"
            className="bg-white rounded-2xl shadow-2xl p-10"
          >

            {/* HEADER */}
            <div className="text-center border-b pb-8 mb-8">

              <h1 className="text-5xl font-bold text-blue-900">
                Remo Secondary School
              </h1>

              <p className="mt-3 text-lg">
                Official Student Report Card
              </p>

            </div>

            {/* STUDENT INFO */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">

              <div>

                <p>
                  <strong>
                    Student Name:
                  </strong>{" "}
                  {
                    student.student_name
                  }
                </p>

                <p className="mt-3">
                  <strong>
                    Admission No:
                  </strong>{" "}
                  {
                    student.admission_number
                  }
                </p>

                <p className="mt-3">
                  <strong>
                    Class:
                  </strong>{" "}
                  {
                    student.student_class
                  }
                </p>

              </div>

              <div>

                {student.passport_url && (
                  <img
                    src={
                      student.passport_url
                    }
                    alt="Passport"
                    className="w-40 h-40 rounded-xl object-cover"
                  />
                )}

              </div>

            </div>

            {/* RESULTS TABLE */}
            <table className="w-full border">

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
                    className="border-b"
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

            {/* SUMMARY */}
            <div className="grid md:grid-cols-2 gap-8 mt-10">

              <div className="bg-gray-100 p-6 rounded-xl">

                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  Performance Summary
                </h3>

                <p>
                  <strong>
                    Total Score:
                  </strong>{" "}
                  {total}
                </p>

                <p className="mt-3">
                  <strong>
                    Average:
                  </strong>{" "}
                  {average}
                </p>

              </div>

              <div className="bg-gray-100 p-6 rounded-xl">

                <h3 className="text-2xl font-bold text-blue-900 mb-4">
                  Remarks
                </h3>

                <p>
                  Excellent academic performance.
                </p>

              </div>

            </div>

            {/* PRINT */}
            <button
              onClick={() =>
                window.print()
              }
              className="mt-10 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold"
            >
              Print Report Card
            </button>

          </div>

        )}

      </div>

    </div>
  );
}

const inputStyle =
  "w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-blue-300";

const tableHeader =
  "text-left px-6 py-4";

const tableCell =
  "px-6 py-4";