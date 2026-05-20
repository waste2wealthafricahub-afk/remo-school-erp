import {
  useState,
} from "react";

import { supabase } from "../supabase";

export default function StudentPortal() {
  const [
    admissionNumber,
    setAdmissionNumber,
  ] = useState("");

  const [student, setStudent] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const fetchStudent = async () => {
    if (!admissionNumber) {
      alert("Enter admission number");
      return;
    }

    setLoading(true);

    const {
      data,
      error,
    } = await supabase
      .from("admission_inquiries")
      .select("*")
      .eq(
        "admission_number",
        admissionNumber
      )
      .single();

    setLoading(false);

    if (error) {
      alert("Student not found");
    } else {
      setStudent(data);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <aside className="w-72 bg-blue-900 text-white p-8 hidden md:block">

        <h1 className="text-3xl font-bold mb-12">
          Student Portal
        </h1>

        <nav className="space-y-5">

          <p className="hover:text-yellow-300 cursor-pointer">
            Dashboard
          </p>

          <p className="hover:text-yellow-300 cursor-pointer">
            Results
          </p>

          <p className="hover:text-yellow-300 cursor-pointer">
            Admission Slip
          </p>

          <p className="hover:text-yellow-300 cursor-pointer">
            Payments
          </p>

        </nav>

      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">

        {/* TOP */}
        <div className="mb-10">

          <h2 className="text-4xl font-bold text-blue-900">
            Student Dashboard
          </h2>

          <p className="text-gray-600 mt-2">
            Access your admission profile
          </p>

        </div>

        {/* SEARCH CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl">

          <h3 className="text-2xl font-bold text-blue-900 mb-6">
            Check Admission Status
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
            onClick={fetchStudent}
            className="mt-5 bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold"
          >
            {loading
              ? "Checking..."
              : "Check Status"}
          </button>

        </div>

        {/* STUDENT CARD */}
        {student && (

          <div className="bg-white rounded-2xl shadow-xl p-10 mt-10">

            <div className="flex flex-col md:flex-row gap-10 items-center">

              {/* PASSPORT */}
              <div>

                {student.passport_url ? (
                  <img
                    src={
                      student.passport_url
                    }
                    alt="Passport"
                    className="w-52 h-52 object-cover rounded-2xl shadow-lg"
                  />
                ) : (
                  <div className="w-52 h-52 bg-gray-200 rounded-2xl flex items-center justify-center">
                    No Passport
                  </div>
                )}

              </div>

              {/* DETAILS */}
              <div className="flex-1">

                <h2 className="text-3xl font-bold text-blue-900 mb-6">
                  {
                    student.student_name
                  }
                </h2>

                <div className="space-y-4 text-lg">

                  <p>
                    <strong>
                      Admission Number:
                    </strong>{" "}
                    {
                      student.admission_number
                    }
                  </p>

                  <p>
                    <strong>
                      Parent Email:
                    </strong>{" "}
                    {
                      student.parent_email
                    }
                  </p>

                  <p>
                    <strong>
                      Phone:
                    </strong>{" "}
                    {student.phone}
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

                    <span
                      className={
                        student.status ===
                        "Approved"
                          ? "text-green-600 font-bold"
                          : student.status ===
                            "Rejected"
                          ? "text-red-600 font-bold"
                          : "text-yellow-500 font-bold"
                      }
                    >
                      {student.status ||
                        "Pending"}
                    </span>

                  </p>

                </div>

                <button
                  onClick={() =>
                    window.print()
                  }
                  className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold"
                >
                  Print Admission Slip
                </button>

              </div>

            </div>

          </div>

        )}

      </main>

    </div>
  );
}

const inputStyle =
  "w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-blue-300";