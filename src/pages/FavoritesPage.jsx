import React, { useState, useEffect } from "react";
import MovieGrid from "../components/MovieGrid";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem("favorites");
    setFavorites(stored ? JSON.parse(stored) : []);
  }, []);

  return (
    <main style={{ padding: "1rem" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        My Favorite Movies
      </h2>
      {favorites.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            fontStyle: "italic",
          }}
        >
          You have no favorite movies yet.
        </p>
      ) : (
        <MovieGrid
          movies={favorites}
          favorites={favorites}
          onToggleFavorite={() => {}}
        />
      )}
    </main>
  );
}

export default FavoritesPage;
