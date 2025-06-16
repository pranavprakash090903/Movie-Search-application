import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <main
      style={{
        padding: "2rem",
        textAlign: "center",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for does not exist.</p>
      <Link to="/" style={{ color: "#82c91e", textDecoration: "underline" }}>
        Go back to Home
      </Link>
    </main>
  );
}

export default NotFoundPage;
