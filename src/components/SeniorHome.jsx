import { Link } from "react-router-dom";

import gateImage from "../images/Senior/gate-snr.jpg";
import principalImage from "../images/Senior/principal-snr.jpg";
import assemblyImage from "../images/Senior/assembly-snr.jpg";
import busImage from "../images/Senior/bus-snr.jpg";
import labImage from "../images/Senior/lab-snr3.jpg";
import sanitationImage from "../images/Senior/sanitation-snr.jpg";
import sportsImage from "../images/Senior/sports-snr.jpg";
import awardImage from "../images/Senior/award-snr.jpg";

export default function SeniorHome() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO */}
      <section
        className="relative text-white py-32 px-6 text-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${gateImage})`,
          minHeight: "550px",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative z-10 max-w-5xl mx-auto pt-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            REMO Secondary School (Senior)
          </h1>

          <p className="text-2xl italic mb-4">
            For God and Fatherland
          </p>

          <p className="text-lg md:text-xl">
            Excellence in academics, leadership, innovation and character development.
          </p>
        </div>
      </section>

      {/* PRINCIPAL */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 grid md:grid-cols-2 gap-10 items-center">
          <img
            src={principalImage}
            alt="Principal"
            className="w-full max-w-sm mx-auto rounded-2xl shadow-lg"
          />

          <div>
            <h2 className="text-4xl font-bold text-yellow-600 mb-6">
              Principal's Desk
            </h2>

            <p className="text-xl mb-4 font-semibold">
              Mrs. Oluwatoyinlogo Ashaye
            </p>

            <p className="text-gray-700 leading-8">
              Welcome to REMO Secondary School (Senior), a prestigious institution
              committed to raising future leaders through academic excellence,
              discipline, innovation and strong moral values. We remain dedicated
              to providing an environment where every student can thrive and
              reach full potential.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-gray-200">
        <h2 className="text-4xl font-bold text-center text-yellow-600 mb-12">
          Our Strength in Numbers
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-yellow-600">80+</h3>
            <p>Years of Legacy</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-yellow-600">2000+</h3>
            <p>Students</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-yellow-600">100+</h3>
            <p>Teachers</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-yellow-600">95%</h3>
            <p>Exam Success Rate</p>
          </div>
        </div>
      </section>

      {/* QUICK ACCESS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-yellow-600 mb-10">
          Quick Access
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          <Link to="/admission" className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl">
            Admission
          </Link>

          <Link to="/student" className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl">
            Student Portal
          </Link>

          <Link to="/results" className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl">
            Results
          </Link>

          <Link to="/report-card" className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl">
            Report Card
          </Link>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-yellow-600 mb-12">
          Our Achievements
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-yellow-600 mb-4">
              Academic Excellence
            </h3>
            <p className="text-gray-600">
              Outstanding WASSCE and NECO performance with strong university placement.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-yellow-600 mb-4">
              Modern Laboratories
            </h3>
            <p className="text-gray-600">
              Fully equipped labs supporting practical science education.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-yellow-600 mb-4">
              Sports Excellence
            </h3>
            <p className="text-gray-600">
              Champions in multiple sporting competitions.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-yellow-600 mb-4">
              Alumni Support
            </h3>
            <p className="text-gray-600">
              Strong RSSOSA support for infrastructure and welfare.
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-yellow-600 mb-12">
          Senior School Gallery
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <img src={assemblyImage} alt="" className="rounded-2xl shadow-lg h-64 w-full object-cover" />
          <img src={busImage} alt="" className="rounded-2xl shadow-lg h-64 w-full object-cover" />
          <img src={labImage} alt="" className="rounded-2xl shadow-lg h-64 w-full object-cover" />
          <img src={sanitationImage} alt="" className="rounded-2xl shadow-lg h-64 w-full object-cover" />
          <img src={sportsImage} alt="" className="rounded-2xl shadow-lg h-64 w-full object-cover" />
          <img src={awardImage} alt="" className="rounded-2xl shadow-lg h-64 w-full object-cover" />
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-yellow-500 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Contact Us
          </h2>

          <p>Email: rss@placeholder.com</p>
          <p>Address: Sagamu, Ogun State</p>
          <p>Phone: Coming Soon</p>
        </div>
      </section>

    </div>
  );
}