export default function Achievements() {
  const achievements = [
    "Award Winning School",
    "Modern Laboratories",
    "Excellent WAEC Results",
    "Strong Moral Standards",
    "Environmental Excellence",
    "Sports Champions",
  ];

  return (
<section id="achievements"
      style={{
        padding: "80px 40px",
        background: "white",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "45px",
          marginBottom: "50px",
          color: "#065f46",
        }}
      >
        Our Achievements
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "25px",
        }}
      >
        {achievements.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#065f46",
              color: "white",
              padding: "30px",
              borderRadius: "15px",
              textAlign: "center",
              fontSize: "22px",
              fontWeight: "bold",
              boxShadow: "0 10px 20px rgba(0,0,0,0.15)",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}