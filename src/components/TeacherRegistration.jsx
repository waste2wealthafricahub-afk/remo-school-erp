import { useState } from "react";
import { supabase } from "../supabase";

export default function TeacherRegistration() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    subject: "",
    class: "",
    arm: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setFormData({
      full_name: "",
      email: "",
      phone: "",
      subject: "",
      class: "",
      arm: "",
      password: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase
      .from("teachers")
      .insert([formData]);

    if (error) {
      setMessage(error.message);
      console.error(error);
    } else {
      setMessage("Teacher registered successfully!");
      resetForm();
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-10">
        <h1 className="text-4xl font-bold text-blue-900 mb-8">
          Teacher Registration
        </h1>

        {message && (
          <div className="mb-6 p-4 rounded-xl bg-green-100 text-green-700">
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-2 gap-6"
        >
          <InputField
            label="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
          />

          <InputField
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          <InputField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />

          <InputField
            label="Subject"
            name="subject"
            value={formData.subject}
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

          <InputField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-900 text-white py-4 rounded-xl font-bold"
            >
              {loading ? "Saving..." : "Save Teacher"}
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
      <label className="block font-semibold mb-2">
        {label}
      </label>

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