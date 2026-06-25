import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState(null);

  useEffect(() => {
    const storedTeacher =
      localStorage.getItem("teacher");

    if (!storedTeacher) {
      navigate("/teacher-login");
      return;
    }

    setTeacher(JSON.parse(storedTeacher));
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("teacher");
    navigate("/teacher-login");
  };

  if (!teacher) {
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
          Teacher Portal
        </h1>

        <nav className="space-y-5">
          <p className="hover:text-yellow-300 cursor-pointer">
            Dashboard
          </p>

          <p
            onClick={() =>
              navigate("/result-entry")
            }
            className="hover:text-yellow-300 cursor-pointer"
          >
            Result Entry
          </p>

          <p
            onClick={() =>
              navigate("/broadsheet")
            }
            className="hover:text-yellow-300 cursor-pointer"
          >
            Broadsheet
          </p>

        <p
            onClick={() => navigate("/attendance")}
            className="hover:text-yellow-300 cursor-pointer"
            >
              Attendance
          </p>
        </nav>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-8">
        <div className="mb-10">
          <h2 className="text-4xl font-bold text-blue-900">
            Teacher Dashboard
          </h2>

          <p className="text-gray-600 mt-2">
            Academic Management Portal
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10">
          <h3 className="text-2xl font-bold text-blue-900 mb-6">
            Welcome, {teacher.full_name}
          </h3>

          <div className="grid md:grid-cols-2 gap-4 text-lg">
            <p>
              <b>Subject:</b> {teacher.subject}
            </p>

            <p>
              <b>Class:</b> {teacher.class}
            </p>

            <p>
              <b>Arm:</b> {teacher.arm}
            </p>

            <p>
              <b>Email:</b> {teacher.email}
            </p>
          </div>
        </div>

        {/* ACTION CARDS */}
        <div className="grid md:grid-cols-3 gap-6">
          <button
            onClick={() =>
              navigate("/result-entry")
            }
            className="bg-blue-900 hover:bg-blue-800 text-white p-8 rounded-2xl font-bold text-xl"
          >
            Enter Results
          </button>

          <button
            onClick={() =>
              navigate("/broadsheet")
            }
            className="bg-green-600 hover:bg-green-700 text-white p-8 rounded-2xl font-bold text-xl"
          >
            View Broadsheet
          </button>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white p-8 rounded-2xl font-bold text-xl"
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}