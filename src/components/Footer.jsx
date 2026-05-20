export default function Footer() {
  return (
    <footer
      style={{
        background: "#022c22",
        color: "white",
        padding: "50px 30px",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "40px",
        }}
      >
        {/* School */}
        <div>
          <h2
            style={{
              marginBottom: "20px",
            }}
          >
            Remo Secondary School
          </h2>

          <p
            style={{
              lineHeight: "1.8",
              color: "#d1fae5",
            }}
          >
            A legacy institution committed to academic excellence, discipline and leadership development.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3
            style={{
              marginBottom: "20px",
            }}
          >
            Quick Links
          </h3>

          <p>Home</p>
          <p>About</p>
          <p>Gallery</p>
          <p>Contact</p>
        </div>

        {/* Contact */}
        <div>
          <h3
            style={{
              marginBottom: "20px",
            }}
          >
            Contact
          </h3>

          <p>Sagamu, Ogun State</p>
          <p>info@remoschool.edu.ng</p>
          <p>+234 XXX XXX XXXX</p>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          marginTop: "50px",
          borderTop: "1px solid rgba(255,255,255,0.1)",
          paddingTop: "20px",
          color: "#d1fae5",
        }}
      >
        © 2026 Remo Secondary School (Senior). All Rights Reserved.
      </div>
    </footer>
  );
}