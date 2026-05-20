import { useState } from "react";
import { supabase } from "../supabase";

export default function Admission() {
  const [formData, setFormData] =
    useState({
      studentName: "",
      parentEmail: "",
      phone: "",
      studentClass: "",
      message: "",
    });

  const [loading, setLoading] =
    useState(false);

  const [passport, setPassport] =
    useState(null);

  const [
    paymentProof,
    setPaymentProof,
  ] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (
      !formData.studentName ||
      !formData.parentEmail ||
      !formData.phone ||
      !formData.studentClass
    ) {
      alert(
        "Please fill all required fields."
      );
      return;
    }

    setLoading(true);

    const admissionNumber =
      `RSS-${Date.now()}`;

    let passportUrl = "";

    if (passport) {
      const fileName =
        `${Date.now()}-${passport.name}`;

      const {
        error: uploadError,
      } = await supabase.storage
        .from("student-documents")
        .upload(fileName, passport);

      if (!uploadError) {
        passportUrl =
          `https://dqwfeayduvjqquttzknp.supabase.co/storage/v1/object/public/student-documents/${fileName}`;
      }
    }

    const { error } =
      await supabase
        .from(
          "admission_inquiries"
        )
        .insert([
          {
            student_name:
              formData.studentName,
            parent_email:
              formData.parentEmail,
            phone: formData.phone,
            student_class:
              formData.studentClass,
            message:
              formData.message,
            passport_url:
              passportUrl,
            admission_number:
              admissionNumber,
          },
        ]);

    setLoading(false);

    if (error) {
      console.log(error);
      alert(error.message);
    } else {
      alert(
        `Application submitted successfully!\nAdmission Number: ${admissionNumber}`
      );

      setFormData({
        studentName: "",
        parentEmail: "",
        phone: "",
        studentClass: "",
        message: "",
      });

      setPassport(null);
      setPaymentProof(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-16 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="bg-blue-900 text-white text-center py-10 px-6">
          <h1 className="text-5xl font-bold mb-4">
            Admission Portal
          </h1>

          <p className="text-lg">
            Begin your journey toward
            excellence.
          </p>
        </div>

        <div className="p-10">

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              name="studentName"
              placeholder="Student Name"
              value={
                formData.studentName
              }
              onChange={handleChange}
              className={inputStyle}
            />

            <input
              type="email"
              name="parentEmail"
              placeholder="Parent Email"
              value={
                formData.parentEmail
              }
              onChange={handleChange}
              className={inputStyle}
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className={inputStyle}
            />

            <select
              name="studentClass"
              value={
                formData.studentClass
              }
              onChange={handleChange}
              className={inputStyle}
            >
              <option value="">
                Select Class
              </option>

              <option>JSS1</option>
              <option>JSS2</option>
              <option>JSS3</option>
              <option>SS1</option>
              <option>SS2</option>
              <option>SS3</option>
            </select>

          </div>

          <div className="mt-8">

            <label className="block font-semibold mb-2">
              Upload Passport
            </label>

            <input
              type="file"
              onChange={(e) =>
                setPassport(
                  e.target.files[0]
                )
              }
              className={fileStyle}
            />

          </div>

          <div className="mt-6">

            <label className="block font-semibold mb-2">
              Upload Payment Receipt
            </label>

            <input
              type="file"
              onChange={(e) =>
                setPaymentProof(
                  e.target.files[0]
                )
              }
              className={fileStyle}
            />

          </div>

          <textarea
            name="message"
            placeholder="Additional Message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            className={`${inputStyle} mt-8`}
          ></textarea>

          <div className="mt-10">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition duration-300"
            >
              {loading
                ? "Submitting..."
                : "Submit Application"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

const inputStyle =
  "w-full border border-gray-300 rounded-xl px-5 py-4 focus:outline-none focus:ring-4 focus:ring-blue-300";

const fileStyle =
  "w-full border border-gray-300 rounded-xl px-4 py-3 bg-gray-50";