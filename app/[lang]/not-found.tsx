import React from "react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#fafafa",
        color: "#333",
      }}
    >
      <h1 style={{ fontSize: "4rem", margin: 0 }}>404</h1>
      <h2 style={{ margin: "1rem 0" }}>Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <Link
        href="/"
        style={{
          marginTop: "2rem",
          color: "#0070f3",
          textDecoration: "underline",
        }}
      >
        Go back home
      </Link>
    </div>
  );
}
