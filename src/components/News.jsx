export default function News() {
  const news = [
    {
      title: "Outstanding WAEC Performance",
      text: "Our students recorded excellent results in the recent WAEC examinations.",
    },
    {
      title: "New Modern Laboratories",
      text: "State-of-the-art science laboratories have been commissioned.",
    },
    {
      title: "Environmental Excellence",
      text: "The school continues to lead in environmental sanitation and discipline.",
    },
  ];

  return (
    <section
      style={{
        padding: "80px 30px",
        background: "#f9fafb",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "50px",
          marginBottom: "50px",
          color: "#065f46",
        }}
      >
        Latest News
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        {news.map((item, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "35px",
              borderRadius: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              transition: "0.3s",
            }}
          >
            <h3
              style={{
                color: "#065f46",
                fontSize: "28px",
                marginBottom: "20px",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                fontSize: "18px",
                lineHeight: "1.7",
                color: "#374151",
              }}
            >
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}