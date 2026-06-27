import { Routes, Route, Link, useLocation } from "react-router-dom";

import Admission from "./components/Admission";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import TeacherDashboard from "./components/TeacherDashboard";
import StudentResults from "./components/StudentResults";
import SchoolSelector from "./components/SchoolSelector";
import SeniorHome from "./components/SeniorHome";
import JuniorHome from "./components/JuniorHome";
import StudentRegistration from "./components/StudentRegistration";
import StudentDatabase from "./components/StudentDatabase";
import SubjectManagement from "./components/SubjectManagement";
import ResultEntry from "./components/ResultEntry";
import ReportCardGenerator from "./components/ReportCardGenerator";
import TeacherRegistration from "./components/TeacherRegistration";
import TeacherLogin from "./components/TeacherLogin";
import Attendance from "./components/Attendance";
import Broadsheet from "./components/Broadsheet";
import StudentLogin from "./components/StudentLogin";
import StudentDashboard from "./components/StudentDashboard";
import ReportExtrasForm from "./components/ReportExtrasForm";
import ProtectedRoute from "./components/ProtectedRoute";
import TeacherProtectedRoute from "./components/TeacherProtectedRoute";
import ResultEditor from "./components/ResultEditor";
export default function App() {
  const location = useLocation();

  return (
    <div>
      {/* Hide navbar on homepage */}
      {location.pathname !== "/" && (
        <nav className="bg-blue-900 text-white shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap gap-6 items-center justify-between">
            <h1 className="text-2xl font-bold">
              Remo Secondary School
            </h1>

            <div className="flex flex-wrap gap-5">
              <Link to="/" className="hover:text-yellow-300 transition">
                Home
              </Link>

              <Link to="/admission" className="hover:text-yellow-300 transition">
                Admission
              </Link>

              <Link to="/dashboard" className="hover:text-yellow-300 transition">
                Admin
              </Link>

              <Link to="/teacher" className="hover:text-yellow-300 transition">
                Teacher
              </Link>

              <Link to="/student" className="hover:text-yellow-300 transition">
                Student Portal
              </Link>

              <Link to="/results" className="hover:text-yellow-300 transition">
                Results
              </Link>

              <Link to="/report-card" className="hover:text-yellow-300 transition">
                Report Card
              </Link>
            </div>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<SchoolSelector />} />
        <Route path="/senior" element={<SeniorHome />} />
        <Route path="/junior" element={<JuniorHome />} />
        <Route path="/admission" element={<Admission />} />
        <Route path="/login" element={<Login />} />
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/student" element={<StudentLogin />} />
        <Route path="/student-dashboard" element={<StudentDashboard />} />
        <Route path="/results" element={<StudentResults />} />
        <Route path="/report-card" element={<ReportCardGenerator />} />
        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route
  path="/teacher-dashboard"
  element={
    <TeacherProtectedRoute>
      <TeacherDashboard />
    </TeacherProtectedRoute>
  }
/>

<Route
  path="/attendance"
  element={
    <TeacherProtectedRoute>
      <Attendance />
    </TeacherProtectedRoute>
  }
/>

<Route
  path="/broadsheet"
  element={
    <TeacherProtectedRoute>
      <Broadsheet />
    </TeacherProtectedRoute>
  }
/>
        <Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/student-registration"
  element={
    <ProtectedRoute>
      <StudentRegistration />
    </ProtectedRoute>
  }
/>

<Route
  path="/student-database"
  element={
    <ProtectedRoute>
      <StudentDatabase />
    </ProtectedRoute>
  }
/>

<Route
  path="/subjects"
  element={
    <ProtectedRoute>
      <SubjectManagement />
    </ProtectedRoute>
  }
/>

<Route
  path="/result-entry"
  element={
    <ProtectedRoute>
      <ResultEntry />
    </ProtectedRoute>
  }
/>
<Route
  path="/report-generator"
  element={
    <ProtectedRoute>
      <ReportCardGenerator />
    </ProtectedRoute>
  }
/>
<Route
  path="/report-extras"
  element={
    <ProtectedRoute>
      <ReportExtrasForm />
    </ProtectedRoute>
  }
/>
<Route
  path="/teacher-registration"
  element={
    <ProtectedRoute>
      <TeacherRegistration />
    </ProtectedRoute>
  }
/><Route
  path="/result-editor"
  element={
    <ProtectedRoute>
      <ResultEditor />
    </ProtectedRoute>
  }
/>
      </Routes>
    </div>
  );
}