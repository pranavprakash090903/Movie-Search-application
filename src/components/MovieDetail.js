import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMovieById } from "../api";
import LoadingPlaceholder from "./LoadingPlaceholder";

function MovieDetail() {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [favorites, setFavorites] = useState(() => {
    try {
      const fav = localStorage.getItem("favorites");
      return fav ? JSON.parse(fav) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      setError(null);
      const movieData = await getMovieById(movieId);
      if (movieData) {
        setMovie(movieData);
      } else {
        setError("Movie not found.");
      }
      setLoading(false);
    }
    fetchMovie();
  }, [movieId]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = () => {
    if (!movie) return;
    const exists = favorites.find((fav) => fav.imdbID === movie.imdbID);
    if (exists) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/"); // fallback route
    }
  };

  if (loading) return <LoadingPlaceholder />;

  if (error)
    return (
      <section
        className="error-message"
        style={{ padding: "2rem", textAlign: "center", color: "#f44336", fontWeight: "600" }}
      >
        <p>{error}</p>
        <button
          onClick={goBack}
          className="back-btn"
          aria-label="Go back"
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            background: "transparent",
            border: "2px solid #e08e00",
            borderRadius: "6px",
            color: "#FF9900",
            cursor: "pointer",
            fontSize: "1rem",
            transition: "background-color 0.3s, color 0.3s",
          }}
        >
          &larr; Back
        </button>
      </section>
    );

  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  return (
    <section
      className="movie-detail"
      style={{
        maxWidth: 900,
        margin: "2rem auto",
        padding: "1rem 1.5rem",
        borderRadius: 12,
        backgroundColor: "#232f3e", // Updated background color to Amazon dark footer/nav color
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
        color: "#e0e0e0", // Light text for good contrast
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <button
        onClick={goBack}
        className="back-btn"
        aria-label="Go back"
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          border: "none",
          background: "transparent",
          color: "#FF9900",
          cursor: "pointer",
          fontSize: "1.1rem",
          borderRadius: 6,
          transition: "color 0.3s ease",
        }}
      >
        &larr; Back
      </button>
      <button
        onClick={toggleFavorite}
        className={`favorite-detail-btn ${isFavorite ? "favorited" : ""}`}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        type="button"
        style={{
          background: isFavorite ? "#e08e00" : "transparent",
          border: "2px solid #e08e00",
          color: isFavorite ? "#121212" : "#FF9900",
          padding: "0.5rem 1rem",
          borderRadius: 6,
          fontSize: "1rem",
          cursor: "pointer",
          marginBottom: "1rem",
          userSelect: "none",
          transition: "background-color 0.3s, color 0.3s",
        }}
      >
        {isFavorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
      </button>
      <div
        className="movie-detail-content"
        style={{
          display: "flex",
          gap: "1.5rem",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8745b824-7d05-46e3-9e2e-4638d64dbf50.png"}
          alt={`${movie.Title} poster`}
          style={{
            flexShrink: 0,
            width: 300,
            borderRadius: 12,
            objectFit: "cover",
            boxShadow: "0 4px 8px rgba(0,0,0,0.7)",
            margin: "0 auto",
            display: "block",
          }}
        />
        <div className="movie-info" style={{ flexGrow: 1, minWidth: 220 }}>
          <h2 style={{ marginTop: 0, color: "#FF9900", fontWeight: 700 }}>
            {movie.Title} ({movie.Year})
          </h2>
          <p style={{ margin: "8px 0", lineHeight: 1.5 }}>
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p style={{ margin: "8px 0", lineHeight: 1.5 }}>
            <strong>Director:</strong> {movie.Director}
          </p>
          <p style={{ margin: "8px 0", lineHeight: 1.5 }}>
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p style={{ margin: "8px 0", lineHeight: 1.5 }}>
            <strong>Plot:</strong> {movie.Plot}
          </p>
          <p style={{ margin: "8px 0", lineHeight: 1.5 }}>
            <strong>IMDB Rating:</strong> {movie.imdbRating}
          </p>
          <p style={{ margin: "8px 0", lineHeight: 1.5 }}>
            <strong>Runtime:</strong> {movie.Runtime}
          </p>
        </div>
      </div>
    </section>
  );
}

export default MovieDetail;
