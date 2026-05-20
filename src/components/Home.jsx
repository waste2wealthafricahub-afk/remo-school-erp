import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* HERO SECTION */}
      <section className="bg-blue-900 text-white py-28 px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          Remo Secondary School
        </h1>

        <p className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
          Excellence in Education, Character,
          Leadership and Innovation.
        </p>

        <div className="mt-10">
          <Link
            to="/admission"
            className="bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-bold py-4 px-8 rounded-lg transition"
          >
            Apply for Admission
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-14">
          Why Choose Us?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Academic Excellence
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Outstanding performance in WAEC,
              NECO and international academic
              standards.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Digital Learning
            </h3>

            <p className="text-gray-600 leading-relaxed">
              ICT-driven classrooms and AI-powered
              education systems.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Leadership Training
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Developing responsible future leaders
              through discipline and innovation.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
            <h3 className="text-2xl font-bold text-blue-900 mb-4">
              Safe Environment
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Secure and supportive atmosphere for
              effective learning and development.
            </p>
          </div>

        </div>
      </section>

      {/* STATISTICS */}
      <section className="bg-blue-900 text-white py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          <div>
            <h2 className="text-5xl font-bold">
              2,500+
            </h2>

            <p className="mt-3 text-lg">
              Students
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">
              120+
            </h2>

            <p className="mt-3 text-lg">
              Teachers
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">
              98%
            </h2>

            <p className="mt-3 text-lg">
              Success Rate
            </p>
          </div>

          <div>
            <h2 className="text-5xl font-bold">
              80+
            </h2>

            <p className="mt-3 text-lg">
              Years Legacy
            </p>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-white py-10 text-center">
        <p className="text-lg">
          © 2026 Remo Secondary School.
          All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}