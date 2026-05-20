import { useEffect, useState } from "react";

export default function Stats() {
  const stats = [
    {
      number: 78,
      suffix: "+",
      title: "Years of Excellence",
    },
    {
      number: 5000,
      suffix: "+",
      title: "Successful Alumni",
    },
    {
      number: 100,
      suffix: "%",
      title: "Commitment to Discipline",
    },
    {
      number: 50,
      suffix: "+",
      title: "Dedicated Teachers",
    },
  ];

  const [counts, setCounts] = useState(
    stats.map(() => 0)
  );

  useEffect(() => {
    const intervals = stats.map((item, index) => {
      return setInterval(() => {
        setCounts((prev) => {
          const updated = [...prev];

          if (updated[index] < item.number) {
            updated[index] += Math.ceil(item.number / 50);
          }

          if (updated[index] > item.number) {
            updated[index] = item.number;
          }

          return updated;
        });
      }, 40);
    });

    return () => intervals.forEach(clearInterval);
  }, []);

  return (
    <section
      style={{
        background: "#065f46",
        padding: "80px 30px",
        color: "white",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "55px",
          marginBottom: "60px",
        }}
      >
        School At A Glance
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        {stats.map((item, index) => (
          <div
            key={index}
            style={{
              background: "rgba(255,255,255,0.08)",
              padding: "45px",
              borderRadius: "20px",
              textAlign: "center",
              backdropFilter: "blur(10px)",
              boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
              transition: "0.3s",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "translateY(-10px)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.transform = "translateY(0px)")
            }
          >
            <h1
              style={{
                fontSize: "60px",
                marginBottom: "15px",
                color: "#22c55e",
              }}
            >
              {counts[index]}
              {item.suffix}
            </h1>

            <p
              style={{
                fontSize: "22px",
              }}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}