import gallery1 from "../images/gallery1.jpg";
import gallery2 from "../images/gallery2.jpg";
import gallery3 from "../images/gallery3.jpg";

export default function Gallery() {
  const images = [gallery1, gallery2, gallery3];

  return (
 <section id="gallery"
      style={{
        padding: "90px 30px",
        background: "#ffffff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "50px",
          marginBottom: "60px",
          color: "#065f46",
        }}
      >
        School Gallery
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "30px",
          maxWidth: "1300px",
          margin: "auto",
        }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            style={{
              overflow: "hidden",
              borderRadius: "20px",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
            }}
          >
            <img
              src={image}
              alt=""
              style={{
                width: "100%",
                height: "320px",
                objectFit: "cover",
                transition: "transform 0.5s ease",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.08)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
          </div>
        ))}
      </div>
    </section>
  );
}