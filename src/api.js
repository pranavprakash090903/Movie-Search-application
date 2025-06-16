import axios from "axios";

const API_KEY = process.env.REACT_APP_OMDB_API_KEY || "b476e66f";
const BASE_URL = "https://www.omdbapi.com/";

export const searchMovies = async (searchTerm, page = 1, year = "") => {
  try {
    const params = {
      apikey: API_KEY,
      s: searchTerm,
      page,
    };
    if (year) {
      params.y = year;
    }
    const response = await axios.get(BASE_URL, { params });

    if (response.data.Response === "True") {
      return {
        movies: response.data.Search,
        totalResults: parseInt(response.data.totalResults, 10),
      };
    } else {
      return { movies: [], totalResults: 0, error: response.data.Error };
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { movies: [], totalResults: 0, error: "Failed to fetch movies." };
  }
};

export const getMovieById = async (movieId) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        apikey: API_KEY,
        i: movieId,
      },
    });

    if (response.data.Response === "True") {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

