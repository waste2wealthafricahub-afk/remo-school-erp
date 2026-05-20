export default function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Top Navbar */}
      <div
        style={{
          background: "linear-gradient(to right, #064e3b, #065f46)",
          color: "white",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>School Admin Dashboard</h2>

        <button
          style={{
            padding: "10px 20px",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "white",
            color: "#065f46",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Dashboard Cards */}
      <div
        style={{
          padding: "50px",
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {[
          {
            title: "Manage News",
            text: "Create and update school news and announcements.",
          },

          {
            title: "Gallery Upload",
            text: "Upload school images and activity photos.",
          },

          {
            title: "Student Activities",
            text: "Monitor environmental and extracurricular activities.",
          },

          {
            title: "School Statistics",
            text: "Manage school records and institutional information.",
          },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "white",
              width: "300px",
              padding: "35px",
              borderRadius: "20px",
              boxShadow: "0 0 25px rgba(16,185,129,0.15)",
            }}
          >
            <h3
              style={{
                color: "#065f46",
                marginBottom: "20px",
                fontSize: "28px",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                lineHeight: "1.8",
                color: "#444",
              }}
            >
              {item.text}
            </p>

            <button
              style={{
                marginTop: "25px",
                padding: "12px 24px",
                border: "none",
                borderRadius: "10px",
                backgroundColor: "#065f46",
                color: "white",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Open
            </button>
          </div>
        ))}
      </div>

      {/* Quick Announcement Area */}
      <div
        style={{
          margin: "40px auto",
          backgroundColor: "white",
          maxWidth: "1000px",
          padding: "40px",
          borderRadius: "20px",
          boxShadow: "0 0 25px rgba(0,0,0,0.08)",
        }}
      >
        <h2
          style={{
            color: "#065f46",
            marginBottom: "20px",
          }}
        >
          Post Quick Announcement
        </h2>

        <textarea
          placeholder="Write announcement here..."
          style={{
            width: "100%",
            height: "150px",
            padding: "20px",
            borderRadius: "15px",
            border: "1px solid #ccc",
            fontSize: "18px",
          }}
        />

        <button
          style={{
            marginTop: "20px",
            padding: "15px 30px",
            border: "none",
            borderRadius: "10px",
            backgroundColor: "#065f46",
            color: "white",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Publish Announcement
        </button>
      </div>
    </div>
  );
}