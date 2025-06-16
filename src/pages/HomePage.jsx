import React, { useState } from "react";
import MovieGrid from "../components/MovieGrid";
import LoadingPlaceholder from "../components/LoadingPlaceholder";
import { searchMovies } from "../api";

const defaultMovies = [
  {
    imdbID: "tt0111161",
    Title: "The Shawshank Redemption",
    Year: "1994",
    Poster:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSf1DK32xKMQzqSl8wnY1BLVu_gdwsRYzVSNM6A03r6c-fEwrif8raKzkFRuerw1KHdDICvOw",
  },
  {
    imdbID: "tt0068646",
    Title: "The Godfather",
    Year: "1972",
    Poster:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQAY2xsJVIZxm3K0gNtOMr9CSCvLdr5kdo3V3pv2HMuUkTBhFzRe5-b8NDRmO1mt5S5Xp_YyQ",
  },
  {
    imdbID: "tt0071562",
    Title: "The Godfather: Part II",
    Year: "1974",
    Poster:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTkeo2zqFkzOI4o9ALrv9X5-_clAuH6pPY45NZFfp3ULyO3wJYeq9U-ljMNv4UXjLRGOGyktg",
  },
  {
    imdbID: "tt0468569",
    Title: "The Dark Knight",
    Year: "2008",
    Poster:
      "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTfE_qrYMBZ_JB8om-34WGaZARhpX26yWRttqIDvn4_7l--UzX8mxKcPrc59IcvTpEA_G8gPA",
  },
  {
    imdbID: "tt0050083",
    Title: "12 Angry Men",
    Year: "1957",
    Poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAJZnplMwjCtHf_SAhxWLTDEoVWunMNp53CemNoORRZQtxI-3tYSUYk1hLb_jBwgvxFXMQ",
  },
  {
    imdbID: "tt0109830",
    Title: "Forrest Gump",
    Year: "1994",
    Poster:
      "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTNI2SBzYW95C8Wo7zYV3bzVzem58xPnUzsZGLsnLg17mSMgR574acQZpgNK7a5XeF3THjqgQ",
  },
  {
    imdbID: "tt0137523",
    Title: "Fight Club",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BOTgyOGQ1NDItNGU3Ny00MjU3LTg2YWEtNmEyYjBiMjI1Y2M5XkEyXkFqcGc@._V1_.jpg",
  },
  {
    imdbID: "tt0120737",
    Title: "The Lord of the Rings: The Fellowship of the Ring",
    Year: "2001",
    Poster:
      "https://sm.ign.com/ign_ap/image/h/how-to-wat/how-to-watch-the-lord-of-the-rings-in-chronological-order_dst8.jpg",
  },
  {
    imdbID: "tt0102926",
    Title: "The Silence of the Lambs",
    Year: "1991",
    Poster:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQeGH9FYpjNiPioEvrpj0HMUw62-14MTzsI--_XuUoUDj1Bk54iL_vRO075w44IlXGDKbhe",
  },
  {
    imdbID: "tt0080684",
    Title: "Star Wars: Episode V - The Empire Strikes Back",
    Year: "1980",
    Poster:
      "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcSmPLuX6fI7ZerePFQEV6KjR-y3QQNJIIEyoZ6bexjYRs_rbnVbLu1BBVjFOd_rhfQO2RFS",
  },
];

function HomePage() {
  const [movies, setMovies] = useState(defaultMovies);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [totalResults, setTotalResults] = useState(defaultMovies.length);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem("favorites");
    return stored ? JSON.parse(stored) : [];
  });

  React.useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const fetchMovies = React.useCallback(
    async (query, pageNumber = 1, year = "") => {
      if (!query) {
        setMovies(defaultMovies);
        setTotalResults(defaultMovies.length);
        setError(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      const { movies, totalResults, error } = await searchMovies(
        query,
        pageNumber,
        year
      );
      if (error) {
        setMovies([]);
        setTotalResults(0);
        setError(error);
      } else {
        setError(null);
        setTotalResults(totalResults);
        if (pageNumber === 1) {
          setMovies(movies);
        } else {
          setMovies((prev) => [...prev, ...movies]);
        }
      }
      setLoading(false);
    },
    []
  );

  React.useEffect(() => {
    setPage(1);
    fetchMovies(searchTerm, 1, yearFilter);
  }, [searchTerm, yearFilter, fetchMovies]);

  React.useEffect(() => {
    if (page === 1) return;
    fetchMovies(searchTerm, page, yearFilter);
  }, [page, searchTerm, yearFilter, fetchMovies]);

  const handleSearchInputChange = (term) => {
    setSearchInput(term);
  };

  const handleSearchButtonClick = () => {
    setSearchTerm(searchInput.trim());
  };

  const handleYearChange = (e) => {
    const val = e.target.value;
    if (/^\d{0,4}$/.test(val)) {
      setYearFilter(val);
    }
  };

  const toggleFavorite = (movie) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.imdbID === movie.imdbID);
      if (exists) {
        return prev.filter((fav) => fav.imdbID !== movie.imdbID);
      } else {
        return [...prev, movie];
      }
    });
  };

  const loadMore = () => {
    if (movies.length < totalResults) {
      setPage((p) => p + 1);
    }
  };

  return (
    <>
      <style>{`
        .search-container {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-bottom: 1rem;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          padding: 0 1rem;
          gap: 4px;
        }
        .search-input {
          flex-grow: 1;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          border: 1px solid #d5d5d5;
          background-color: #ffffff;
          color: #111111;
          min-width: 0;
        }
        .search-button {
          background: #FF9900;
          border: none;
          padding: 0.55rem 2rem;
          border-radius: 6px;
          color: #ffffff;
          font-weight: 700;
          cursor: pointer;
          flex-shrink: 0;
          font-size: 1.1rem;
          transition: background-color 0.3s ease, transform 0.2s ease;
        }
        .search-button:hover,
        .search-button:focus {
          background-color: #e08e00;
          transform: scale(1.05);
          outline: none;
        }
      `}</style>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Search movies..."
          value={searchInput}
          onChange={(e) => handleSearchInputChange(e.target.value)}
          aria-label="Search movies"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearchButtonClick();
            }
          }}
        />
        <button
          className="search-button"
          onClick={handleSearchButtonClick}
          aria-label="Search movies"
          type="button"
          disabled={!searchInput.trim()}
          title={!searchInput.trim() ? "Enter search term first" : "Search movies"}
        >
          Search
        </button>
      </div>

      {/* Centered Filter by Year */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <label htmlFor="year-filter" style={{ marginRight: 8, color: "#ffffff", fontWeight: "bold" }}>
            Filter by Year:
          </label>
          <input
            id="year-filter"
            type="text"
            placeholder="Enter year (YYYY)"
            value={yearFilter}
            onChange={handleYearChange}
            maxLength={4}
            style={{
              borderRadius: "6px",
              border: "1px solid #d5d5d5",
              backgroundColor: "#ffffff",
              color: "#111111",
              padding: "0.5rem 0.75rem",
              width: "137px",
            }}
            aria-label="Filter movies by year"
          />
        </div>
      </div>

      {loading && page === 1 && <LoadingPlaceholder />}
      {error && (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      )}
      {!loading && !error && (
        <MovieGrid
          movies={movies}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
        />
      )}
      {movies.length > 0 && movies.length < totalResults && (
        <div style={{ textAlign: "center", margin: "1rem" }}>
          <button
            onClick={loadMore}
            style={{
              background: "#FF9900",
              border: "none",
              padding: "0.75rem 1.5rem",
              borderRadius: "24px",
              color: "#ffffff",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.3s ease, transform 0.2s ease",
            }}
            onMouseOver={e => {
              e.currentTarget.style.backgroundColor = "#e08e00";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={e => {
              e.currentTarget.style.backgroundColor = "#FF9900";
              e.currentTarget.style.transform = "scale(1)";
            }}
            aria-label="Load more movies"
          >
            Load More
          </button>
        </div>
      )}
    </>
  );
}

export default HomePage;
