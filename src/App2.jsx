import logo from "./images/logo.jpg";
import principalImage from "./images/principal.jpg";
import schoolImage from "./images/school.jpg";

import gallery1 from "./images/gallery1.jpg";
import gallery2 from "./images/gallery2.jpg";
import gallery3 from "./images/gallery3.jpg";
import gallery4 from "./images/gallery4.jpg";
import gallery5 from "./images/gallery5.jpg";
import gallery6 from "./images/gallery6.jpg";
import gallery7 from "./images/gallery7.jpg";

export default function App() {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        color: "#111",
        scrollBehavior: "smooth",
      }}
    >
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/2340000000000"
        target="_blank"
        rel="noreferrer"
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          backgroundColor: "#25D366",
          color: "white",
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "32px",
          textDecoration: "none",
          boxShadow: "0 0 25px rgba(37,211,102,0.5)",
          zIndex: 2000,
        }}
      >
        💬
      </a>

      {/* Navbar */}
      <div
        style={{
          background: "linear-gradient(to right, #064e3b, #065f46)",
          color: "white",
          padding: "20px 60px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          flexWrap: "wrap",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              objectFit: "cover",
              backgroundColor: "white",
              padding: "5px",
            }}
          />

          <div>
            <h2 style={{ margin: 0 }}>
              Remo Secondary School
            </h2>

            <p
              style={{
                margin: 0,
                fontSize: "14px",
                color: "#d1fae5",
              }}
            >
              For God and Fatherland
            </p>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "25px",
            fontSize: "18px",
            fontWeight: "bold",
            flexWrap: "wrap",
          }}
        >
          <span>Home</span>
          <span>About</span>
          <span>Gallery</span>
          <span>News</span>
          <span>Contact</span>
        </div>
      </div>

      {/* Hero Section */}
      <div
        style={{
          background: "linear-gradient(to right, #064e3b, #065f46)",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "100px 60px",
          gap: "40px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h1
            style={{
              fontSize: "80px",
              lineHeight: "1.1",
              marginBottom: "25px",
            }}
          >
            Remo Secondary School (Senior)
          </h1>

          <p
            style={{
              fontSize: "28px",
              lineHeight: "1.7",
              color: "#d1fae5",
            }}
          >
            A Legacy of Excellence Since 1946. Building future leaders through quality education, discipline and innovation.
          </p>

          <button
            style={{
              marginTop: "40px",
              padding: "18px 40px",
              fontSize: "22px",
              border: "none",
              borderRadius: "14px",
              backgroundColor: "white",
              color: "#065f46",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 0 25px rgba(255,255,255,0.5)",
            }}
          >
            Explore School
          </button>
        </div>

        <div style={{ flex: 1, minWidth: "300px" }}>
          <img
            src={schoolImage}
            alt="School"
            style={{
              width: "100%",
              borderRadius: "20px",
              boxShadow: "0 0 30px rgba(16,185,129,0.3)",
            }}
          />
        </div>
      </div>

      {/* About */}
      <div
        style={{
          padding: "100px 60px",
          backgroundColor: "white",
        }}
      >
        <h2
          style={{
            fontSize: "52px",
            marginBottom: "25px",
            color: "#065f46",
          }}
        >
          About The School
        </h2>

        <p
          style={{
            fontSize: "22px",
            lineHeight: "1.9",
            color: "#333",
          }}
        >
          Remo Secondary School (Senior) is one of the leading public secondary schools in Ogun State, known for academic excellence, discipline, leadership and strong moral values.
        </p>
      </div>

      {/* Statistics */}
      <div
        style={{
          padding: "100px 60px",
          backgroundColor: "#065f46",
          color: "white",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            fontSize: "52px",
            marginBottom: "70px",
          }}
        >
          School At A Glance
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            flexWrap: "wrap",
          }}
        >
          {[
            { number: "1946", label: "Year Founded" },
            { number: "3000+", label: "Students" },
            { number: "100+", label: "Teachers & Staff" },
            { number: "20+", label: "Clubs & Activities" },
          ].map((item, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                width: "250px",
                padding: "40px",
                borderRadius: "20px",
                textAlign: "center",
              }}
            >
              <h3 style={{ fontSize: "48px" }}>
                {item.number}
              </h3>

              <p
                style={{
                  color: "#d1fae5",
                  fontSize: "20px",
                }}
              >
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Principal */}
      <div
        style={{
          padding: "100px 60px",
          display: "flex",
          gap: "50px",
          flexWrap: "wrap",
          backgroundColor: "white",
          alignItems: "center",
        }}
      >
        <div style={{ flex: 1, minWidth: "300px" }}>
          <img
            src={principalImage}
            alt="Principal"
            style={{
              width: "100%",
              borderRadius: "20px",
            }}
          />
        </div>

        <div style={{ flex: 1, minWidth: "300px" }}>
          <h2
            style={{
              fontSize: "52px",
              color: "#065f46",
              marginBottom: "20px",
            }}
          >
            Principal’s Welcome
          </h2>

          <p
            style={{
              fontSize: "22px",
              lineHeight: "1.9",
            }}
          >
            We are committed to nurturing students academically, morally and socially while preparing them to become responsible citizens and future leaders.
          </p>
        </div>
      </div>

      {/* Gallery */}
      <div
        style={{
          padding: "100px 60px",
          backgroundColor: "#ecfdf5",
        }}
      >
        <h2
          style={{
            fontSize: "52px",
            textAlign: "center",
            color: "#065f46",
            marginBottom: "20px",
          }}
        >
          School Gallery
        </h2>

        <div
          style={{
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            gallery1,
            gallery2,
            gallery3,
            gallery4,
            gallery5,
            gallery6,
            gallery7,
          ].map((image, index) => (
            <img
              key={index}
              src={image}
              alt="Gallery"
              style={{
                width: "350px",
                height: "250px",
                objectFit: "cover",
                borderRadius: "20px",
                boxShadow: "0 0 25px rgba(16,185,129,0.25)",
              }}
            />
          ))}
        </div>
      </div>

      {/* News */}
      <div
        style={{
          padding: "100px 60px",
          backgroundColor: "white",
        }}
      >
        <h2
          style={{
            fontSize: "52px",
            textAlign: "center",
            color: "#065f46",
            marginBottom: "60px",
          }}
        >
          Latest News & Events
        </h2>

        <div
          style={{
            display: "flex",
            gap: "30px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {[
            "Outstanding Academic Performance",
            "Environmental & Sanitation Activities",
            "Sports & Leadership Development",
          ].map((title, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#ecfdf5",
                width: "350px",
                padding: "35px",
                borderRadius: "20px",
                boxShadow: "0 0 25px rgba(16,185,129,0.2)",
              }}
            >
              <h3
                style={{
                  color: "#065f46",
                  fontSize: "28px",
                }}
              >
                {title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div
        style={{
          padding: "100px 60px",
          backgroundColor: "#065f46",
          color: "white",
        }}
      >
        <h2
          style={{
            fontSize: "52px",
            textAlign: "center",
            marginBottom: "60px",
          }}
        >
          Contact Us
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "50px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3>📍 Address</h3>
            <p>Sagamu, Ogun State, Nigeria</p>
          </div>

          <div>
            <h3>📞 Phone</h3>
            <p>+234 XXX XXX XXXX</p>
          </div>

          <div>
            <h3>📧 Email</h3>
            <p>info@remoschool.edu.ng</p>
          </div>

          <div>
            <h3>💬 WhatsApp</h3>
            <p>+234 XXX XXX XXXX</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          backgroundColor: "#022c22",
          color: "white",
          padding: "40px",
          textAlign: "center",
        }}
      >
        <h2>Remo Secondary School (Senior)</h2>

        <p style={{ marginTop: "10px" }}>
          © 2026 All Rights Reserved
        </p>
      </div>
    </div>
  );
}