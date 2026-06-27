import { useState } from "react";
import { supabase } from "../supabase";

export default function ResultEditor() {
  const [admissionNo, setAdmissionNo] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    if (!admissionNo) {
      alert("Enter admission number");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("results")
      .select("*")
      .eq("admission_no", admissionNo);

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Failed to fetch results");
      return;
    }

    setResults(data || []);
  };

  const calculateGrade = (total) => {
    if (total >= 70) return "A";
    if (total >= 60) return "B";
    if (total >= 50) return "C";
    if (total >= 45) return "D";
    if (total >= 40) return "E";
    return "F";
  };
    const handleChange = (index, field, value) => {
    const updated = [...results];
    updated[index][field] = Number(value);

    const total =
      Number(updated[index].ca1 || 0) +
      Number(updated[index].ca2 || 0) +
      Number(updated[index].exam || 0);

    updated[index].total = total;
    updated[index].grade = calculateGrade(total);

    setResults(updated);
  };

  const saveChanges = async () => {
    setLoading(true);

    for (const row of results) {
      const { error } = await supabase
        .from("results")
        .update({
          ca1: row.ca1,
          ca2: row.ca2,
          exam: row.exam,
          total: row.total,
          grade: row.grade,
        })
        .eq("id", row.id);

      if (error) {
        console.error(error);
        alert("Error updating results");
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    alert("Results updated successfully");
  };
    return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">
          Result Editor
        </h1>

        <div className="flex gap-4 mb-8">
          <input
            value={admissionNo}
            onChange={(e) =>
              setAdmissionNo(e.target.value)
            }
            placeholder="Admission Number"
            className="border rounded-lg px-4 py-3 flex-1"
          />

          <button
            onClick={fetchResults}
            className="bg-blue-900 text-white px-6 py-3 rounded-lg"
          >
            Search
          </button>
        </div>

        {results.length > 0 && (
          <>
            <table className="w-full border">
              <thead className="bg-blue-900 text-white">
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
                {results.map((row, index) => (
                  <tr key={row.id} className="border-b">
                    <td className="p-3">{row.subject}</td>

                    <td className="p-3">
                      <input
                        type="number"
                        value={row.ca1}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "ca1",
                            e.target.value
                          )
                        }
                        className="w-20 border rounded px-2 py-1"
                      />
                    </td>

                    <td className="p-3">
                      <input
                        type="number"
                        value={row.ca2}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "ca2",
                            e.target.value
                          )
                        }
                        className="w-20 border rounded px-2 py-1"
                      />
                    </td>

                    <td className="p-3">
                      <input
                        type="number"
                        value={row.exam}
                        onChange={(e) =>
                          handleChange(
                            index,
                            "exam",
                            e.target.value
                          )
                        }
                        className="w-20 border rounded px-2 py-1"
                      />
                    </td>

                    <td className="p-3 font-bold">
                      {row.total}
                    </td>

                    <td className="p-3 font-bold">
                      {row.grade}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              onClick={saveChanges}
              className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg font-bold"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}