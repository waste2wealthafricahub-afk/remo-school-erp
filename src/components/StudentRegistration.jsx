import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function StudentRegistration() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const studentId = searchParams.get("id");

  const [formData, setFormData] = useState({
    admission_no: "",
    surname: "",
    other_names: "",
    gender: "",
    dob: "",
    class: "",
    arm: "",
    school_section: "",
    parent_name: "",
    parent_phone: "",
    parent_email: "",
    address: "",
    passport_url: "",
  });

  const [passportFile, setPassportFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (studentId) {
      fetchStudent();
    }
  }, [studentId]);

  const fetchStudent = async () => {
    const { data, error } = await supabase
      .from("students")
      .select("*")
      .eq("id", studentId)
      .single();

    if (!error && data) {
      setFormData({
        admission_no: data.admission_no || "",
        surname: data.surname || "",
        other_names: data.other_names || "",
        gender: data.gender || "",
        dob: data.dob || "",
        class: data.class || "",
        arm: data.arm || "",
        school_section: data.school_section || "",
        parent_name: data.parent_name || "",
        parent_phone: data.parent_phone || "",
        parent_email: data.parent_email || "",
        address: data.address || "",
        passport_url: data.passport_url || "",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      admission_no: "",
      surname: "",
      other_names: "",
      gender: "",
      dob: "",
      class: "",
      arm: "",
      school_section: "",
      parent_name: "",
      parent_phone: "",
      parent_email: "",
      address: "",
      passport_url: "",
    });
    setPassportFile(null);
  };

  const uploadPassport = async () => {
    if (!passportFile) {
      return formData.passport_url;
    }

    const fileExt = passportFile.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;

    const { data: uploadData, error: uploadError } =
      await supabase.storage
        .from("student-documents")
        .upload(fileName, passportFile, {
          upsert: true,
        });

    console.log("UPLOAD DATA:", uploadData);
    console.log("UPLOAD ERROR:", uploadError);

    if (uploadError) {
      throw uploadError;
    }

    const { data: publicData } = supabase.storage
      .from("student-documents")
      .getPublicUrl(fileName);

    return publicData.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const passportUrl = await uploadPassport();

      const payload = {
        ...formData,
        passport_url: passportUrl,
      };

      let response;

      if (studentId) {
        response = await supabase
          .from("students")
          .update(payload)
          .eq("id", studentId);
      } else {
        response = await supabase
          .from("students")
          .insert([payload]);
      }

      if (response.error) {
        console.error(response.error);
        setMessage(response.error.message);
      } else {
        if (studentId) {
          setMessage("Student updated successfully!");
          setTimeout(() => {
            navigate("/student-database");
          }, 1000);
        } else {
          setMessage("Student registered successfully!");
          resetForm();
        }
      }
    } catch (err) {
      console.error("FULL ERROR:", err);
      alert(JSON.stringify(err, null, 2));
      setMessage(err.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">
          {studentId ? "Edit Student" : "Student Registration"}
        </h1>

        {message && (
          <div className="mb-6 p-4 rounded-xl bg-green-100 text-green-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
          <InputField
            label="Admission No"
            name="admission_no"
            value={formData.admission_no}
            onChange={handleChange}
          />

          <InputField
            label="Surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
          />

          <InputField
            label="Other Names"
            name="other_names"
            value={formData.other_names}
            onChange={handleChange}
          />

          <div>
            <label className="block font-semibold mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="">Select Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <InputField
            label="Date of Birth"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
          />

          <InputField
            label="Class"
            name="class"
            value={formData.class}
            onChange={handleChange}
          />

          <InputField
            label="Arm"
            name="arm"
            value={formData.arm}
            onChange={handleChange}
          />

          <div>
            <label className="block font-semibold mb-2">School Section</label>
            <select
              name="school_section"
              value={formData.school_section}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option value="">Select Section</option>
              <option>Junior</option>
              <option>Senior</option>
            </select>
          </div>

          <InputField
            label="Parent Name"
            name="parent_name"
            value={formData.parent_name}
            onChange={handleChange}
          />

          <InputField
            label="Parent Phone"
            name="parent_phone"
            value={formData.parent_phone}
            onChange={handleChange}
          />

          <InputField
            label="Parent Email"
            name="parent_email"
            value={formData.parent_email}
            onChange={handleChange}
          />

          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">
              Student Passport
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPassportFile(e.target.files[0])}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-2">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
              rows="4"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white py-4 rounded-xl font-bold"
            >
              {loading
                ? "Saving..."
                : studentId
                ? "Update Student"
                : "Save Student"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
}) {
  return (
    <div>
      <label className="block font-semibold mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border rounded-xl px-4 py-3"
      />
    </div>
  );
}