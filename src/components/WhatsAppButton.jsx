export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/2340000000000"
      target="_blank"
      rel="noreferrer"
      style={{
        position: "fixed",
        bottom: "25px",
        right: "25px",
        background: "#22c55e",
        color: "white",
        width: "70px",
        height: "70px",
        borderRadius: "50%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "32px",
        textDecoration: "none",
        boxShadow: "0 0 25px #22c55e",
        zIndex: 1000,
        animation: "pulse 2s infinite",
      }}
    >
      💬
    </a>
  );
}