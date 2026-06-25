import { useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

export default function StudentLogin() {
  const navigate = useNavigate();

  const [admissionNo, setAdmissionNo] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    if (!admissionNo || !password) {
      alert("Fill all fields");
      return;
    }

    setLoading(true);

    const { data, error } =
      await supabase
        .from("students")
        .select("*")
        .eq("admission_no", admissionNo)
        .eq("password", password)
        .single();

    setLoading(false);

    if (error || !data) {
      alert("Invalid login details");
      return;
    }

    localStorage.setItem(
      "student",
      JSON.stringify(data)
    );

    navigate("/student-dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-blue-900 mb-3">
          Student Login
        </h1>

        <p className="text-gray-600 mb-8">
          Login to access your portal
        </p>

        <div className="space-y-5">
          <input
            type="text"
            placeholder="Admission Number"
            value={admissionNo}
            onChange={(e) =>
              setAdmissionNo(e.target.value)
            }
            className="w-full border rounded-xl px-5 py-4"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full border rounded-xl px-5 py-4"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white py-4 rounded-xl font-bold"
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}