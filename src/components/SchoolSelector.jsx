import { Link } from "react-router-dom";

export default function SchoolSelector() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 text-white flex items-center justify-center px-6">

      <div className="max-w-5xl w-full text-center">

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          RSS DIGITAL PORTAL
        </h1>

        <p className="text-xl md:text-2xl mb-14">
          Welcome to the official digital platform for
          Remo Secondary School.
        </p>

        <div className="grid md:grid-cols-2 gap-10">

          {/* SENIOR */}
          <div className="bg-white text-blue-900 rounded-3xl shadow-2xl p-10">

            <h2 className="text-4xl font-bold mb-6">
              Senior School
            </h2>

            <p className="mb-8 text-lg">
              Academic excellence, leadership and innovation.
            </p>

            <Link
              to="/senior"
              className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold inline-block"
            >
              Enter Senior School
            </Link>

          </div>

          {/* JUNIOR */}
          <div className="bg-white text-blue-900 rounded-3xl shadow-2xl p-10">

            <h2 className="text-4xl font-bold mb-6">
              Junior School
            </h2>

            <p className="mb-8 text-lg">
              Building strong foundations for future success.
            </p>

            <Link
              to="/junior"
              className="bg-green-700 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-bold inline-block"
            >
              Enter Junior School
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}