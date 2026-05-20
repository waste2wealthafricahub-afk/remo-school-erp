import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "18px",
  };

  return (
    <nav
      style={{
        background: "#065f46",
        color: "white",
        padding: "20px 30px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            margin: 0,
          }}
        >
          Remo Secondary School
        </h2>

        {/* Desktop Menu */}
        <div
          className="desktop-menu"
          style={{
            display: window.innerWidth > 768 ? "flex" : "none",
            gap: "25px",
          }}
        >
          <a href="#home" style={navStyle}>Home</a>
          <a href="#about" style={navStyle}>About</a>
          <a href="#gallery" style={navStyle}>Gallery</a>
          <a href="#achievements" style={navStyle}>
            Achievements
          </a>
          <a href="#contact" style={navStyle}>Contact</a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: window.innerWidth <= 768 ? "block" : "none",
            background: "none",
            border: "none",
            color: "white",
            fontSize: "32px",
            cursor: "pointer",
          }}
        >
          ☰
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "25px",
          }}
        >
          <a href="#home" style={navStyle}>Home</a>
          <a href="#about" style={navStyle}>About</a>
          <a href="#gallery" style={navStyle}>Gallery</a>
          <a href="#achievements" style={navStyle}>
            Achievements
          </a>
          <a href="#contact" style={navStyle}>Contact</a>
        </div>
      )}
    </nav>
  );
}