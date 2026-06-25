import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";

export default function Attendance() {
  const navigate = useNavigate();

  const [teacher, setTeacher] = useState(null);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  const [attendanceDate, setAttendanceDate] =
    useState(
      new Date().toISOString().split("T")[0]
    );

  const [attendanceData, setAttendanceData] =
    useState({});

  useEffect(() => {
    const storedTeacher =
      localStorage.getItem("teacher");

    if (!storedTeacher) {
      navigate("/teacher-login");
      return;
    }

    const teacherData =
      JSON.parse(storedTeacher);

    setTeacher(teacherData);

    fetchStudents(
      teacherData.class,
      teacherData.arm
    );
  }, []);

  const fetchStudents = async (
    teacherClass,
    teacherArm
  ) => {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("class", teacherClass)
      .eq("arm", teacherArm)
      .order("surname");

    if (!error) {
      setStudents(data || []);

      const initialStatus = {};
      (data || []).forEach((student) => {
        initialStatus[student.admission_no] =
          "Present";
      });

      setAttendanceData(initialStatus);
    } else {
      console.error(error);
    }
  };

  const handleStatusChange = (
    admissionNo,
    status
  ) => {
    setAttendanceData((prev) => ({
      ...prev,
      [admissionNo]: status,
    }));
  };

  const saveAttendance = async () => {
    if (!teacher) return;

    setLoading(true);

    const payload = students.map(
      (student) => ({
        attendance_date: attendanceDate,
        admission_no: student.admission_no,
        student_name: `${student.surname} ${student.other_names}`,
        class: student.class,
        arm: student.arm,
        status:
          attendanceData[
            student.admission_no
          ],
      })
    );

    const { error } = await supabase
      .from("attendance")
      .insert(payload);

    if (error) {
      console.error(error);
      alert("Failed to save attendance");
    } else {
      alert(
        "Attendance saved successfully"
      );
    }

    setLoading(false);
  };

  return (
        <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">
          Attendance
        </h1>

        {teacher && (
          <div className="mb-6 bg-blue-50 rounded-xl p-4">
            <p>
              <b>Teacher:</b> {teacher.full_name}
            </p>
            <p>
              <b>Class:</b> {teacher.class}
            </p>
            <p>
              <b>Arm:</b> {teacher.arm}
            </p>
            <p>
              <b>Subject:</b> {teacher.subject}
            </p>
          </div>
        )}

        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Attendance Date
          </label>

          <input
            type="date"
            value={attendanceDate}
            onChange={(e) =>
              setAttendanceDate(
                e.target.value
              )
            }
            className="border rounded-xl px-4 py-3"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-x-auto">
          <table className="w-full">
            <thead className="bg-blue-900 text-white">
              <tr>
                <th className="text-left px-6 py-4">
                  Admission No
                </th>
                <th className="text-left px-6 py-4">
                  Student Name
                </th>
                <th className="text-left px-6 py-4">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
  {students.length === 0 ? (
    <tr>
      <td
        colSpan="3"
        className="text-center py-8 text-gray-500"
      >
        No students found in Class {teacher?.class}
        {teacher?.arm}
      </td>
    </tr>
  ) : (
    students.map((student) => (
      <tr key={student.id} className="border-b">
        <td className="px-6 py-4">
          {student.admission_no}
        </td>

        <td className="px-6 py-4">
          {student.surname} {student.other_names}
        </td>

        <td className="px-6 py-4">
          <select
            value={
              attendanceData[
                student.admission_no
              ] || "Present"
            }
            onChange={(e) =>
              handleStatusChange(
                student.admission_no,
                e.target.value
              )
            }
            className="border rounded-lg px-3 py-2"
          >
            <option>Present</option>
            <option>Absent</option>
            <option>Late</option>
          </select>
        </td>
      </tr>
    ))
  )}
</tbody> 
         </table>
        </div>

        <button
          onClick={saveAttendance}
          disabled={loading}
          className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold"
        >
          {loading
            ? "Saving..."
            : "Save Attendance"}
        </button>
      </div>
    </div>
  );
}