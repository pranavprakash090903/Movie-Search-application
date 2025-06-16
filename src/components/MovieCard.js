import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function MovieCard({ movie, favorites, onToggleFavorite }) {
  const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/5aaad6a1-a448-48f2-ab3b-42f7b3a73da3.png"
          }
          alt={`${movie.Title} poster`}
        />
        <div className="movie-info">
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
        </div>
      </Link>
      <button
        aria-label={
          isFavorite ? "Remove from favorites" : "Add to favorites"
        }
        className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
        onClick={() => onToggleFavorite(movie)}
        type="button"
      >
        {isFavorite ? "★" : "☆"}
      </button>
      <style>{`
        .movie-card {
          position: relative;
          background: #1f1f1f;
          border-radius: 12px;
          box-shadow: 0 4px 8px rgba(0,0,0,0.5);
          overflow: hidden;
          transition: transform 0.2s ease;
        }
        .movie-card:hover {
          transform: scale(1.05);
        }
        .movie-card img {
          display: block;
          width: 100%;
          height: 270px;
          object-fit: cover;
          border-bottom: 1px solid #333;
          border-radius: 12px 12px 0 0;
        }
        .movie-info {
          padding: 0.75rem 1rem 1rem 1rem;
          text-align: center;
          color: #e0e0e0;
        }
        .movie-info h3 {
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
          color: #e08e00;
        }
        .movie-info p {
          margin: 0;
          color: #bbb;
          font-size: 0.9rem;
        }
        a {
          text-decoration: none;
          color: inherit;
        }
        .favorite-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: transparent;
          border: none;
          font-size: 1.5rem;
          color: #ccc;
          cursor: pointer;
          transition: color 0.3s ease;
          user-select: none;
        }
        .favorite-btn.favorited {
          color: #f5c518;
          text-shadow: 0 0 5px #f5c518;
        }
        .favorite-btn:hover {
          color: #f5c518;
        }
      `}</style>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    imdbID: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Poster: PropTypes.string,
  }).isRequired,
  favorites: PropTypes.array.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default MovieCard;
