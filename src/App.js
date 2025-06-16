import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import HomePage from "./pages/HomePage";
import MovieDetailPage from "./pages/MovieDetailPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          width: "100vw", // full viewport width
          fontFamily: "'Poppins', sans-serif",
          backgroundColor: "#3d4d61", // Dark background for entire page including sides
          color: "#1a1a1a",
          transition: "background 0.3s ease, color 0.3s ease",
        }}
      >
        {/* Responsive CSS */}
        <style>{`
          .app-header {
            background-color: #131921; /* Amazon dark navy header */
            padding: 1rem 2rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.45);
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            transition: background-color 0.3s ease;
            border-bottom: 3px solid #FF9900;
            z-index: 100;
          }

          .header-title {
            margin: 0;
            font-size: 1.9rem;
            font-weight: 800;
            letter-spacing: 0.05em;
            color: white;
            filter: drop-shadow(0 0 2px #FF9900);
          }

          .header-title a {
            color: #FF9900; /* Amazon orange */
            text-decoration: none;
            transition: color 0.3s ease;
          }

          .header-title a:hover,
          .header-title a:focus {
            color: #e08e00;
          }

          .header-nav {
            margin-top: 0.5rem;
            font-size: 1.1rem;
            font-weight: 600;
            display: flex;
            gap: 1.5rem;
          }

          .header-nav a {
            color: #FF9900;
            text-decoration: none;
            padding: 0.25rem 0.5rem;
            border-radius: 6px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 0 6px #FF9900;
          }

          .header-nav a:hover,
          .header-nav a:focus {
            background-color: #FF9900;
            color: #1a1a1a;
            text-decoration: none;
            box-shadow: 0 0 12px #ffb84d;
            transform: scale(1.05);
          }

          @media (max-width: 600px) {
            .app-header {
              flex-direction: column;
              align-items: flex-start;
              padding: 1rem 1.5rem;
            }

            .header-nav {
              margin-top: 1rem;
              width: 100%;
              justify-content: flex-start;
              gap: 1rem;
            }
          }

          main {
            transition: color 0.3s ease;
            background-color: transparent; /* Keep transparent to show outer background */
            color: #e0e0e0; /* Light text for contrast */
            padding: 1.5rem 2.5rem;
            max-width: 1200px;
            margin: 0 auto;
            width: 100%;
            box-sizing: border-box;
          }

          footer {
            background-color: #232F3E;
            text-align: center;
            padding: 1rem 2rem;
            margin-top: auto;
            font-size: 0.9rem;
            color: #ddd;
            box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.3);
            transition: background-color 0.3s ease, color 0.3s ease;
          }

          footer p {
            margin: 0;
            line-height: 1.6;
          }
        `}</style>

        {/* Header */}
        <header className="app-header">
          <h1 className="header-title">
            <Link to="/">Movie Search Application</Link>
          </h1>
          <nav className="header-nav">
            <Link to="/favorites" aria-label="View Favorites">
              ❤️ Favorites
            </Link>
          </nav>
        </header>

        {/* Main Content */}
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movie/:movieId" element={<MovieDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer>
          <p>
            © Movie Search Application <br />
            Pranav Prakash Saxena
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
