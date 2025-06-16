   import React from "react";
   import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";

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
             width: "100vw",
             fontFamily: "'Poppins', sans-serif",
             backgroundColor: "#3d4d61",
             color: "#1a1a1a",
             transition: "background 0.3s ease, color 0.3s ease",
           }}
         >
           {/* Responsive CSS */}
           <style>{`
             /* Your existing CSS styles */
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
   