import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, errorMessage: error.message || "Something went wrong." };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          style={{
            maxWidth: 600,
            margin: "40px auto",
            padding: 24,
            border: "1px solid red",
            borderRadius: 12,
            backgroundColor: "#330000",
            color: "#fdd",
            textAlign: "center",
            fontFamily: "'Poppins', sans-serif",
          }}
        >
          <h2>Oops! An error occurred.</h2>
          <p>{this.state.errorMessage}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
