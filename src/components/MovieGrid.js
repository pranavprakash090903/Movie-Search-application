import React from "react";
import PropTypes from "prop-types";
import MovieCard from "./MovieCard";

function MovieGrid({ movies, favorites, onToggleFavorite }) {
  if (!movies.length) {
    return (
      <div className="no-results-wrapper">
        <span className="no-results">No movies found.</span>
        <style>{`
          .no-results-wrapper {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 80vh;
            width: 100%;
          }
          .no-results {
            font-style: italic;
            color: #aaa;
            font-size: 1.5rem;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          movie={movie}
          key={movie.imdbID}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
      <style>{`
        .movie-grid {
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          padding: 0 10px;
        }
      `}</style>
    </div>
  );
}

MovieGrid.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      imdbID: PropTypes.string.isRequired,
      Title: PropTypes.string.isRequired,
      Year: PropTypes.string.isRequired,
      Poster: PropTypes.string,
    })
  ).isRequired,
  favorites: PropTypes.array.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
};

export default MovieGrid;
