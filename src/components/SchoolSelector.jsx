import { Link } from "react-router-dom";
import schoolImage from "../images/Senior/gate-snr.jpg";
import logoImage from "../images/Junior/logo-jnr.jpg";
export default function SchoolSelector() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 text-white px-6 py-16">

      <div className="max-w-7xl mx-auto text-center">

        {/* HEADER */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Welcome to RSS Digital Portal
        </h1>

        <p className="text-xl md:text-2xl mb-14 max-w-4xl mx-auto">
          A Unified Digital Platform for Remo Secondary School Senior and Junior Schools
        </p>

        {/* SCHOOL CARDS */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* SENIOR CARD */}
          <div className="bg-white text-blue-900 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition duration-300">

            <img
              src={schoolImage}
              alt="Senior School"
              className="w-full h-72 object-cover"
            />

            <div className="p-8">
              <h2 className="text-4xl font-bold mb-4">
                Senior School
              </h2>

              <p className="mb-6 text-lg">
                Academic excellence, leadership and innovation.
              </p>

              <Link
                to="/senior"
                className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold inline-block"
              >
                Enter Senior School
              </Link>
            </div>
          </div>

          {/* JUNIOR CARD */}
          <div className="bg-white text-green-700 rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 transition duration-300">

            <div className="bg-green-100 flex justify-center py-10">
              <img
                src={logoImage}
                alt="Junior School"
                className="w-40 h-40 object-contain"
              />
            </div>

            <div className="p-8">
              <h2 className="text-4xl font-bold mb-4">
                Junior School
              </h2>

              <p className="mb-6 text-lg">
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

        {/* FOOTER */}
        <div className="mt-16 text-lg text-blue-100">
          For God and Fatherland
        </div>

      </div>
    </div>
  );
}