import {
  useEffect,
  useState,
} from "react";

import { supabase } from "../supabase";

export default function TeacherDashboard() {
  const [studentName, setStudentName] =
    useState("");

  const [subject, setSubject] =
    useState("");

  const [score, setScore] =
    useState("");

  const [results, setResults] =
    useState([]);

  const [editingId, setEditingId] =
    useState(null);

  const [editedScore, setEditedScore] =
    useState("");

  const fetchResults = async () => {
    const { data } =
      await supabase
        .from("results")
        .select("*")
        .order("id", {
          ascending: false,
        });

    setResults(data || []);
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleSubmit = async () => {
    if (
      !studentName ||
      !subject ||
      !score
    ) {
      alert("Fill all fields");
      return;
    }

    const { error } =
      await supabase
        .from("results")
        .insert([
          {
            student_name:
              studentName,
            subject,
            score,
          },
        ]);

    if (error) {
      alert("Upload failed");
    } else {
      alert(
        "Result uploaded successfully!"
      );

      setStudentName("");
      setSubject("");
      setScore("");

      fetchResults();
    }
  };

  const deleteResult = async (
    id
  ) => {
    const confirmed =
      window.confirm(
        "Delete this result?"
      );

    if (!confirmed) return;

    await supabase
      .from("results")
      .delete()
      .eq("id", id);

    fetchResults();
  };

  const updateResult = async (
    id
  ) => {
    await supabase
      .from("results")
      .update({
        score: editedScore,
      })
      .eq("id", id);

    setEditingId(null);
    setEditedScore("");

    fetchResults();
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <aside className="w-72 bg-blue-900 text-white p-8 hidden md:block">

        <h1 className="text-3xl font-bold mb-12">
          Teacher Portal
        </h1>

        <nav className="space-y-5">

          <p className="hover:text-yellow-300 cursor-pointer">
            Dashboard
          </p>

          <p className="hover:text-yellow-300 cursor-pointer">
            Results
          </p>

          <p className="hover:text-yellow-300 cursor-pointer">
            Attendance
          </p>

          <p className="hover:text-yellow-300 cursor-pointer">
            Students
          </p>

        </nav>

      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">

        {/* TOP */}
        <div className="mb-10">

          <h2 className="text-4xl font-bold text-blue-900">
            Teacher Dashboard
          </h2>

          <p className="text-gray-600 mt-2">
            Academic management portal
          </p>

        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

          <div className={cardStyle}>
            <h3 className="text-xl font-bold">
              Total Results
            </h3>

            <p className="text-4xl font-bold text-blue-900 mt-4">
              {results.length}
            </p>
          </div>

          <div className={cardStyle}>
            <h3 className="text-xl font-bold">
              Subjects
            </h3>

            <p className="text-4xl font-bold text-green-600 mt-4">
              12
            </p>
          </div>

          <div className={cardStyle}>
            <h3 className="text-xl font-bold">
              Attendance
            </h3>

            <p className="text-4xl font-bold text-yellow-500 mt-4">
              92%
            </p>
          </div>

        </div>

        {/* FORM */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10">

          <h3 className="text-2xl font-bold text-blue-900 mb-6">
            Upload Student Result
          </h3>

          <div className="grid md:grid-cols-3 gap-5">

            <input
              type="text"
              placeholder="Student Name"
              value={studentName}
              onChange={(e) =>
                setStudentName(
                  e.target.value
                )
              }
              className={inputStyle}
            />

            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) =>
                setSubject(
                  e.target.value
                )
              }
              className={inputStyle}
            />

            <input
              type="number"
              placeholder="Score"
              value={score}
              onChange={(e) =>
                setScore(
                  e.target.value
                )
              }
              className={inputStyle}
            />

          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold"
          >
            Upload Result
          </button>

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">

          <table className="w-full">

            <thead className="bg-blue-900 text-white">

              <tr>

                <th className={tableHeader}>
                  Student
                </th>

                <th className={tableHeader}>
                  Subject
                </th>

                <th className={tableHeader}>
                  Score
                </th>

                <th className={tableHeader}>
                  Grade
                </th>

                <th className={tableHeader}>
                  Actions
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
                    {
                      item.student_name
                    }
                  </td>

                  <td className={tableCell}>
                    {item.subject}
                  </td>

                  <td className={tableCell}>

                    {editingId ===
                    item.id ? (
                      <input
                        type="number"
                        value={
                          editedScore
                        }
                        onChange={(e) =>
                          setEditedScore(
                            e.target.value
                          )
                        }
                        className="border border-gray-300 rounded-lg px-3 py-2 w-24"
                      />
                    ) : (
                      item.score
                    )}

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

                  <td className={tableCell}>

                    {editingId ===
                    item.id ? (
                      <button
                        onClick={() =>
                          updateResult(
                            item.id
                          )
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mr-3"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditingId(
                            item.id
                          );

                          setEditedScore(
                            item.score
                          );
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg mr-3"
                      >
                        Edit
                      </button>
                    )}

                    <button
                      onClick={() =>
                        deleteResult(
                          item.id
                        )
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Delete
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </main>

    </div>
  );
}

const cardStyle =
  "bg-white rounded-2xl shadow-xl p-8";

const inputStyle =
  "w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-blue-300";

const tableHeader =
  "text-left px-6 py-4";

const tableCell =
  "px-6 py-4";