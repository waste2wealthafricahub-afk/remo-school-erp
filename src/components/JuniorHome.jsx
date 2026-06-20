import { Link } from "react-router-dom";
import logoImage from "../images/logo.jpg";

export default function JuniorHome() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO */}
      <section className="bg-green-700 text-white py-24 px-6 text-center">
        <img
          src={logoImage}
          alt="School Logo"
          className="w-40 h-40 mx-auto mb-6 rounded-full shadow-xl bg-white p-2"
        />

        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          REMO Secondary School (Junior)
        </h1>

        <p className="text-2xl italic mb-4">
          For God and Fatherland
        </p>

        <p className="text-xl font-semibold mb-6">
          Honesty is the Best Policy
        </p>

        <p className="text-lg max-w-4xl mx-auto">
          Building strong academic foundations, character,
          discipline and leadership for future success.
        </p>
      </section>

      {/* PRINCIPAL */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="bg-white rounded-3xl shadow-xl p-10">
          <h2 className="text-4xl font-bold text-green-700 mb-6">
            Principal's Desk
          </h2>

          <p className="text-2xl font-semibold mb-4">
            Mr. Soneye Samuel Abeeb
          </p>

          <p className="text-gray-700 leading-8">
            Since her founding on 4th February, 1946, Remo Secondary School
            has stood tall as a home of learning and character, a place
            where knowledge is balanced with discipline, and where moral
            values are given equal importance as academic achievement.
          </p>

          <p className="text-gray-700 leading-8 mt-4">
            Our guiding motto, “For God and Fatherland”, and our slogan,
            “Honesty is the Best Policy,” are not merely words. They are
            the principles that have shaped generations of students both
            inside and outside the classroom.
          </p>
        </div>
      </section>

      {/* QUICK ACCESS */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-4xl font-bold text-center text-green-700 mb-10">
          Quick Access
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          <Link
            to="/admission"
            className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl"
          >
            Admission
          </Link>

          <Link
            to="/student"
            className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl"
          >
            Student Portal
          </Link>

          <Link
            to="/results"
            className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl"
          >
            Results
          </Link>

          <Link
            to="/report-card"
            className="bg-white shadow-lg rounded-2xl p-8 text-center hover:shadow-2xl"
          >
            Report Card
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gray-200 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-10">
            Our Strength
          </h2>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-4xl font-bold text-green-700">1946</h3>
              <p>Founded</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-4xl font-bold text-green-700">1500+</h3>
              <p>Students</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-4xl font-bold text-green-700">80+</h3>
              <p>Teachers</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-4xl font-bold text-green-700">100%</h3>
              <p>Commitment</p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="bg-green-700 text-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Contact Us
          </h2>

          <p>Email: rssjnr@placeholder.com</p>
          <p>Phone: 08058876808</p>
          <p>Address: Sagamu, Ogun State</p>
        </div>
      </section>

    </div>
  );
}