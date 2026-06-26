import { useState } from "react";
import { supabase } from "../supabase";

export default function ReportExtrasForm() {
  const [form, setForm] = useState({
    admission_no: "",
    term: "",
    session: "",
    school_opened: "",
    times_present: "",
    punctuality: 3,
    neatness: 3,
    honesty: 3,
    leadership: 3,
    cooperation: 3,
    politeness: 3,
    handwriting: 3,
    sports: 3,
    creativity: 3,
    practical_skills: 3,
    drawing: 3,
    principal_remark: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveExtras = async () => {
    if (
      !form.admission_no ||
      !form.term ||
      !form.session
    ) {
      alert("Admission No, Term and Session are required");
      return;
    }

    setLoading(true);

    const { error } = await supabase
      .from("report_extras")
      .upsert([form], {
        onConflict: "admission_no,term,session",
      });

    setLoading(false);

    if (error) {
      console.error(error);
      alert("Failed to save report extras");
    } else {
      alert("Report extras saved successfully");
    }
  };

  const scoreOptions = [1, 2, 3, 4, 5];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">
          Report Extras Form
        </h1>

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <input
            name="admission_no"
            placeholder="Admission Number"
            value={form.admission_no}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          />

          <select
            name="term"
            value={form.term}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          >
            <option value="">Select Term</option>
            <option value="first">First Term</option>
            <option value="second">Second Term</option>
            <option value="third">Third Term</option>
          </select>

          <input
            name="session"
            placeholder="Session (e.g 2025/2026)"
            value={form.session}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <input
            type="number"
            name="school_opened"
            placeholder="School Opened"
            value={form.school_opened}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          />

          <input
            type="number"
            name="times_present"
            placeholder="Times Present"
            value={form.times_present}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          />
        </div>

        <h2 className="text-2xl font-bold text-blue-900 mb-4">
          Traits Assessment (1–5)
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            "punctuality",
            "neatness",
            "honesty",
            "leadership",
            "cooperation",
            "politeness",
            "handwriting",
            "sports",
            "creativity",
            "practical_skills",
            "drawing",
          ].map((field) => (
            <div key={field}>
              <label className="block mb-2 capitalize font-semibold">
                {field.replace("_", " ")}
              </label>

              <select
                name={field}
                value={form[field]}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              >
                {scoreOptions.map((score) => (
                  <option key={score} value={score}>
                    {score}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <textarea
          name="principal_remark"
          placeholder="Principal Remark"
          value={form.principal_remark}
          onChange={handleChange}
          className="w-full border rounded-lg px-4 py-4 mt-8"
          rows={4}
        />

        <button
          onClick={saveExtras}
          className="mt-8 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-bold"
        >
          {loading ? "Saving..." : "Save Report Extras"}
        </button>
      </div>
    </div>
  );
}