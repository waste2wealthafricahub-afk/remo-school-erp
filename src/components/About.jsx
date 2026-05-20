import principalImage from "../images/principal.jpg";

export default function About() {
  return (
    <section id="about"
      style={{
        padding: "100px 30px",
        background: "#f9fafb",
      }}
    >
      <div
        style={{
          maxWidth: "1300px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "50px",
          alignItems: "center",
        }}
      >
        <div>
          <img
            src={principalImage}
            alt="Principal"
            style={{
              width: "100%",
              borderRadius: "25px",
              boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
            }}
          />
        </div>

        <div>
          <h2
            style={{
              fontSize: "55px",
              color: "#065f46",
              marginBottom: "25px",
            }}
          >
            Principal’s Welcome
          </h2>

          <p
            style={{
              fontSize: "22px",
              lineHeight: "1.9",
              color: "#374151",
              marginBottom: "25px",
            }}
          >
            Welcome to Remo Secondary School, a citadel of learning,
            discipline and excellence. Our institution is committed to
            nurturing future leaders through quality education, strong
            moral values and innovative learning experiences.
          </p>

          <p
            style={{
              fontSize: "22px",
              lineHeight: "1.9",
              color: "#374151",
            }}
          >
            We continue to uphold our legacy of excellence while preparing
            students for a rapidly changing world through academic
            brilliance, environmental consciousness and leadership
            development.
          </p>

          <button
            style={{
              marginTop: "35px",
              padding: "18px 35px",
              background: "#065f46",
              color: "white",
              border: "none",
              borderRadius: "12px",
              fontSize: "20px",
              cursor: "pointer",
              boxShadow: "0 0 20px rgba(6,95,70,0.5)",
            }}
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}