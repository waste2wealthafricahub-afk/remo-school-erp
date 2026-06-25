import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const storedStudent =
      localStorage.getItem("student");

    if (!storedStudent) {
      navigate("/student");
      return;
    }

    setStudent(JSON.parse(storedStudent));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("student");
    navigate("/student");
  };

  if (!student) {
    return (
      <div className="p-8 text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <aside className="w-72 bg-blue-900 text-white p-8 hidden md:block">
        <h1 className="text-3xl font-bold mb-12">
          Student Portal
        </h1>

        <nav className="space-y-5">
          <p>Dashboard</p>

          <p
            onClick={() =>
              navigate("/results")
            }
            className="cursor-pointer hover:text-yellow-300"
          >
            Results
          </p>

          <p
            onClick={() =>
              navigate("/report-card")
            }
            className="cursor-pointer hover:text-yellow-300"
          >
            Report Card
          </p>

          <p className="cursor-pointer hover:text-yellow-300">
            Attendance
          </p>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">
        <h2 className="text-4xl font-bold text-blue-900 mb-2">
          Student Dashboard
        </h2>

        <p className="text-gray-600 mb-10">
          Welcome to your academic portal
        </p>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10">
          <div className="flex flex-col md:flex-row gap-8 items-center">

            <div>
              {student.passport_url ? (
                <img
                  src={student.passport_url}
                  alt="Passport"
                  className="w-40 h-40 rounded-2xl object-cover border"
                />
              ) : (
                <div className="w-40 h-40 bg-gray-200 rounded-2xl flex items-center justify-center">
                  No Passport
                </div>
              )}
            </div>

            <div className="flex-1 space-y-3 text-lg">
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

              <p>
                <b>Section:</b>{" "}
                {student.school_section}
              </p>
            </div>
          </div>
        </div>

        {/* ACTION CARDS */}
        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={() =>
              navigate("/results")
            }
            className="bg-blue-900 text-white p-8 rounded-2xl font-bold text-xl"
          >
            View Results
          </button>

          <button
            onClick={() =>
              navigate("/report-card")
            }
            className="bg-green-600 text-white p-8 rounded-2xl font-bold text-xl"
          >
            Report Card
          </button>

          <button
            onClick={logout}
            className="bg-red-500 text-white p-8 rounded-2xl font-bold text-xl"
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}