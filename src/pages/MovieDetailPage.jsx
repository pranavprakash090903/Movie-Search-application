import React from "react";
import MovieDetail from "../components/MovieDetail";
import ErrorBoundary from "../components/ErrorBoundary";

function MovieDetailPage() {
  return (
    <ErrorBoundary>
      <MovieDetail />
    </ErrorBoundary>
  );
}

export default MovieDetailPage;
