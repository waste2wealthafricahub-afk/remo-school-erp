import { Link } from "react-router-dom";
import schoolImage from "../images/school.jpg";
import principalImage from "../images/principal.jpg";
import gallery1 from "../images/gallery1.jpg";
import gallery2 from "../images/gallery2.jpg";
import gallery3 from "../images/gallery3.jpg";
import gallery4 from "../images/gallery4.jpg";

export default function SeniorHome() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO */}
      <section
        className="relative text-white py-24 px-6 text-center bg-cover bg-center"
        style={{
          backgroundImage: `url(${schoolImage})`,
          minHeight: "500px",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>

        <div className="relative z-10 pt-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            REMO Secondary School (Senior)
          </h1>

          <p className="text-2xl italic mb-4">
            For God and Fatherland
          </p>

          <p className="text-lg max-w-4xl mx-auto">
            Welcome to the Senior School portal of REMO Secondary School,
            a place of academic excellence, discipline, leadership and innovation.
          </p>
        </div>
      </section>

      {/* PRINCIPAL */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <div className="bg-white rounded-3xl shadow-xl p-10">
          <div className="grid md:grid-cols-2 gap-10 items-center">

            <div>
              <img
                src={principalImage}
                alt="Principal"
                className="rounded-2xl shadow-xl w-full max-w-md mx-auto"
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-blue-900 mb-6">
                Principal's Desk
              </h2>

              <p className="text-2xl font-semibold mb-4">
                Mrs. Oluwatoyinlogo Ashaye
              </p>

              <p className="text-gray-700 leading-8">
                Welcome to Remo Secondary School (Senior), a citadel of excellence
                where academic distinction, character formation, and competitive
                prowess are seamlessly woven into our educational philosophy.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* QUICK ACCESS */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        <h2 className="text-4xl font-bold text-center text-blue-900 mb-10">
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
<section className="max-w-6xl mx-auto py-16 px-6">
  <h2 className="text-4xl font-bold text-center text-blue-900 mb-10">
    School Gallery
  </h2>

  <div className="grid md:grid-cols-2 gap-6">
    <img src={gallery1} alt="" className="rounded-2xl shadow-xl" />
    <img src={gallery2} alt="" className="rounded-2xl shadow-xl" />
    <img src={gallery3} alt="" className="rounded-2xl shadow-xl" />
    <img src={gallery4} alt="" className="rounded-2xl shadow-xl" />
  </div>
</section>
<section className="bg-gray-200 py-16 px-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold text-center text-blue-900 mb-10">
      Our Strength in Numbers
    </h2>

    <div className="grid md:grid-cols-4 gap-6 text-center">

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-4xl font-bold text-blue-900">50+</h3>
        <p>Years of Legacy</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-4xl font-bold text-blue-900">2000+</h3>
        <p>Students</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-4xl font-bold text-blue-900">100+</h3>
        <p>Teachers</p>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h3 className="text-4xl font-bold text-blue-900">95%</h3>
        <p>Exam Success Rate</p>
      </div>

    </div>
  </div>
</section>
      {/* CONTACT */}
      <section className="bg-blue-900 text-white py-16 px-6">
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