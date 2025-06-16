import React from "react";

function LoadingPlaceholder() {
  return (
    <div
      className="loading-placeholder"
      role="alert"
      aria-busy="true"
      style={{
        fontSize: "1.2rem",
        fontStyle: "italic",
        color: "#aaa",
        textAlign: "center",
        marginTop: "2rem",
      }}
    >
      Loading...
    </div>
  );
}

export default LoadingPlaceholder;
