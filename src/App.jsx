import { Routes, Route, Link } from "react-router-dom";

import Home from "./components/Home";
import Admission from "./components/Admission";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import StudentPortal from "./components/StudentPortal";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentResults from "./components/StudentResults";
import ReportCard from "./components/ReportCard";
import SchoolSelector from "./components/SchoolSelector";
export default function App() {
  return (
    <div>
     <nav className="bg-blue-900 text-white shadow-lg">
  <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-6 items-center justify-between">
    
    <h1 className="text-2xl font-bold">
      Remo Secondary School
    </h1>

    <div className="flex flex-wrap gap-5">
      <Link
        to="/"
        className="hover:text-yellow-300 transition"
      >
        Home
      </Link>

      <Link
        to="/admission"
        className="hover:text-yellow-300 transition"
      >
        Admission
      </Link>

      <Link
        to="/dashboard"
        className="hover:text-yellow-300 transition"
      >
        Admin
      </Link>

      <Link
        to="/teacher"
        className="hover:text-yellow-300 transition"
      >
        Teacher
      </Link>

      <Link
        to="/student"
        className="hover:text-yellow-300 transition"
      >
        Student Portal
      </Link>

      <Link
        to="/results"
        className="hover:text-yellow-300 transition"
      >
        Results
      </Link>
      <Link
  to="/report-card"
  className="hover:text-yellow-300 transition"
>
  Report Card
</Link>
      </div>
  </div>
</nav>

     <Route
  path="/"
  element={<SchoolSelector />}
/>
<Route
  path="/senior"
  element={<Home />}
/>

<Route
  path="/junior"
  element={<Home />}
/>
        <Route
          path="/admission"
          element={<Admission />}
        />
        <Route path="/login" element={<Login />} />   
        <Route
          path="/dashboard"
          element={<AdminDashboard />}
        />
        <Route
          path="/teacher"
          element={<TeacherDashboard />}
        />
        <Route
  path="/report-card"
  element={<ReportCard />}
/>
        <Route
          path="/student"
          element={<StudentPortal />}
        />
        <Route
           path="/results"
           element={<StudentResults />}
        />
        <Route
            path="/report-card"
            element={<ReportCard />}
        />
      </Routes>
    </div>
  );
}

const linkStyle = {
  color: "white",
  textDecoration: "none",
  fontWeight: "bold",
};