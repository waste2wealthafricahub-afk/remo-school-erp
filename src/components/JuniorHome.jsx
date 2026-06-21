import { Link } from "react-router-dom";

import campusImage from "../images/Junior/campus-jnr.jpg";
import principalImage from "../images/Junior/principal-jnr.jpg";
import assemblyImage from "../images/Junior/assembly-jnr.jpg";
import awardImage from "../images/Junior/award-jnr.jpg";
import award2Image from "../images/Junior/award2-jnr.jpg";
import emcccImage from "../images/Junior/EMCCC-jnr.jpg";
import fenceImage from "../images/Junior/fence-jnr.jpg";
import anthemImage from "../images/Junior/anthem-jnr.jpg";

export default function JuniorHome() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO */}
      <section
        className="relative text-white py-32 px-6 text-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${campusImage})`,
          minHeight: "550px",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>

        <div className="relative z-10 max-w-5xl mx-auto pt-20">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            REMO Secondary School (Junior)
          </h1>

          <p className="text-2xl italic mb-4">
            For God and Fatherland
          </p>

          <p className="text-lg md:text-xl">
            Building strong academic foundations, discipline and leadership.
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
            <h2 className="text-4xl font-bold text-green-700 mb-6">
              Principal's Desk
            </h2>

            <p className="text-xl mb-4 font-semibold">
              Mr. Soneye Samuel Abeeb
            </p>

            <p className="text-gray-700 leading-8">
              Since 4th February 1946, Remo Secondary School has stood as a
              center of learning, discipline and character formation. Our
              guiding motto, “For God and Fatherland,” and our slogan,
              “Honesty is the best policy,” continue to shape students for
              academic excellence and responsible citizenship.
            </p>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-gray-200">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
          Our Strength in Numbers
        </h2>

        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-6 px-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-green-700">80+</h3>
            <p>Years of Legacy</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-green-700">1500+</h3>
            <p>Students</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-green-700">70+</h3>
            <p>Teachers</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-4xl font-bold text-green-700">95%</h3>
            <p>Success Rate</p>
          </div>
        </div>
      </section>

      {/* QUICK ACCESS */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-10">
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
        <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
          Our Achievements
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-green-700 mb-4">
              Award Winning School
            </h3>
            <p className="text-gray-600">
              Recognized among the best public junior schools in Ogun State.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-green-700 mb-4">
              Discipline & Character
            </h3>
            <p className="text-gray-600">
              Strong emphasis on discipline and moral excellence.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-green-700 mb-4">
              Environmental Leadership
            </h3>
            <p className="text-gray-600">
              Active EMCCC environmental programmes and sustainability projects.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-green-700 mb-4">
              Holistic Education
            </h3>
            <p className="text-gray-600">
              Balanced academic, moral and social development.
            </p>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-12">
          Junior School Gallery
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <img src={assemblyImage} alt="" className="rounded-2xl shadow-lg h-64 w-full object-cover" />
          <img src={awardImage} alt="" className="rounded-2xl shadow-lg h-64 w-full object-cover" />
          <img src={award2Image} alt="" className="rounded-2xl shadow-lg h-64 w-full object-cover" />
          <img src={emcccImage} alt="" className="rounded-2xl shadow-lg h-64 w-full object-cover" />
          <img src={fenceImage} alt="" className="rounded-2xl shadow-lg h-64 w-full object-cover" />
          <img src={anthemImage} alt="" className="rounded-2xl shadow-lg h-64 w-full object-cover" />
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-green-700 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Contact Us
          </h2>

          <p>Email: rssjnr@placeholder.com</p>
          <p>Address: Sagamu, Ogun State</p>
          <p>Phone: 08058876808</p>
        </div>
      </section>

    </div>
  );
}