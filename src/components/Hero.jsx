import schoolImage from "../images/school.jpg";

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${schoolImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "clamp(40px, 8vw, 90px)",
          fontWeight: "bold",
          marginBottom: "20px",
          textShadow: "0 0 20px rgba(255,255,255,0.4)",
          maxWidth: "1100px",
          lineHeight: "1.1",
        }}
      >
        Remo Secondary School (Senior)
      </h1>

      <p
        style={{
          fontSize: "clamp(18px, 3vw, 30px)",
          maxWidth: "900px",
          lineHeight: "1.8",
          color: "#d1fae5",
        }}
      >
        A Legacy of Excellence, Discipline and Academic Brilliance Since 1946.
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <button
          style={{
            padding: "18px 40px",
            fontSize: "20px",
            background: "#22c55e",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            boxShadow: "0 0 25px #22c55e",
            transition: "0.3s",
            fontWeight: "bold",
          }}
          onMouseOver={(e) =>
            (e.currentTarget.style.transform = "scale(1.05)")
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          Explore School
        </button>

        <button
          style={{
            padding: "18px 40px",
            fontSize: "20px",
            background: "transparent",
            color: "white",
            border: "2px solid white",
            borderRadius: "12px",
            cursor: "pointer",
            transition: "0.3s",
            fontWeight: "bold",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = "white";
            e.currentTarget.style.color = "#065f46";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = "white";
          }}
        >
          Contact School
        </button>
      </div>
    </section>
  );
}