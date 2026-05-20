export default function Contact() {
  return (
    <section
      id="contact"
      style={{
        padding: "100px 30px",
        background: "linear-gradient(to right, #064e3b, #065f46)",
        color: "white",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "clamp(40px, 6vw, 60px)",
            marginBottom: "25px",
          }}
        >
          Contact The School
        </h2>

        <p
          style={{
            fontSize: "22px",
            color: "#d1fae5",
            marginBottom: "60px",
            lineHeight: "1.8",
          }}
        >
          Reach out for admissions, inquiries, collaborations and school information.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "30px",
          }}
        >
          {/* Address */}
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              padding: "35px",
              borderRadius: "20px",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h3
              style={{
                fontSize: "28px",
                marginBottom: "20px",
              }}
            >
              📍 Address
            </h3>

            <p
              style={{
                lineHeight: "1.8",
                color: "#d1fae5",
              }}
            >
              Sagamu, Ogun State, Nigeria
            </p>
          </div>

          {/* Phone */}
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              padding: "35px",
              borderRadius: "20px",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h3
              style={{
                fontSize: "28px",
                marginBottom: "20px",
              }}
            >
              📞 Phone
            </h3>

            <p
              style={{
                lineHeight: "1.8",
                color: "#d1fae5",
              }}
            >
              +234 XXX XXX XXXX
            </p>
          </div>

          {/* Email */}
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              padding: "35px",
              borderRadius: "20px",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
            }}
          >
            <h3
              style={{
                fontSize: "28px",
                marginBottom: "20px",
              }}
            >
              📧 Email
            </h3>

            <p
              style={{
                lineHeight: "1.8",
                color: "#d1fae5",
              }}
            >
              info@remoschool.edu.ng
            </p>
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: "70px",
          }}
        >
          <button
            style={{
              padding: "20px 45px",
              fontSize: "22px",
              border: "none",
              borderRadius: "14px",
              background: "#22c55e",
              color: "white",
              cursor: "pointer",
              fontWeight: "bold",
              boxShadow: "0 0 25px #22c55e",
            }}
          >
            Apply For Admission
          </button>
        </div>
      </div>
      <div
  style={{
    marginTop: "70px",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
  }}
>
  <iframe
    title="School Location"
    src="https://www.google.com/maps?q=Sagamu,Ogun+State&output=embed"
    width="100%"
    height="400"
    style={{
      border: 0,
    }}
    allowFullScreen=""
    loading="lazy"
  ></iframe>
</div>
    </section>
  );
}