import React, { useState } from 'react';
import './App.css';

// Dummy data for movies
const movies = [
  {
    id: 1,
    title: 'Guardians of the Galaxy',
    year: 2018,
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    duration: '2h 8m',
    rating: 8.0,
    description: 'In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.',
    poster: 'https://image.tmdb.org/t/p/w500/r7vmZjiyZw9rpJMQJdXpjgiCOk9.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 2,
    title: 'The Accountant²',
    year: 2025,
    genres: ['Crime', 'Thriller'],
    duration: '2h 13m',
    rating: 7.1,
    description: 'When an old acquaintance is murdered, Wolff is compelled to solve the case. Realizing more extreme measures are necessary, Wolff recruits his estranged and highly lethal brother, Brax, to help.',
    poster: 'https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  // Add more movies as needed
];

function App() {
  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="App">
      {/* Header/Navbar */}
      <header className="navbar">
        <div className="logo">Cine<span>Sphere</span></div>
        <nav>
          <a href="#home">Home</a>
          <a href="#movies">Movies</a>
          <a href="#theaters">Theaters</a>
          <a href="#releases">Releases</a>
        </nav>
        <div className="nav-actions">
          <button className="search-btn">🔍</button>
          <button className="login-btn">Login</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${selectedMovie.bg})` }}>
        <div className="hero-content">
          <img src="https://upload.wikimedia.org/wikipedia/commons/0/0c/Marvel_Studios_2016_logo.svg" alt="Marvel Studios" className="studio-logo" />
          <h1>{selectedMovie.title}</h1>
          <div className="movie-meta">
            <span>{selectedMovie.genres.join(' | ')}</span>
            <span>• {selectedMovie.year}</span>
            <span>• {selectedMovie.duration}</span>
          </div>
          <p className="movie-desc">{selectedMovie.description}</p>
          <button className="explore-btn">Explore Movies</button>
        </div>
      </section>

      {/* Now Showing Section */}
      <section className="now-showing">
        <h2>Now Showing</h2>
        <div className="movie-grid">
          {movies.map((movie) => (
            <div className="movie-card" key={movie.id} onClick={() => { setSelectedMovie(movie); setShowModal(true); }}>
              <img src={movie.poster} alt={movie.title} className="movie-poster" />
              <div className="movie-info">
                <h3>{movie.title}</h3>
                <div className="movie-meta-small">
                  <span>{movie.year}</span>
                  <span>• {movie.genres.join(', ')}</span>
                  <span>• {movie.duration}</span>
                </div>
                <button className="buy-btn">Buy Tickets</button>
                <span className="rating">⭐ {movie.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Movie Modal */}
      {showModal && (
        <div className="modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <img src={selectedMovie.poster} alt={selectedMovie.title} className="modal-poster" />
            <div className="modal-info">
              <h2>{selectedMovie.title}</h2>
              <span className="modal-rating">⭐ {selectedMovie.rating} User Rating</span>
              <p>{selectedMovie.description}</p>
              <div className="modal-meta">
                <span>{selectedMovie.duration}</span>
                <span>• {selectedMovie.genres.join(', ')}</span>
                <span>• {selectedMovie.year}</span>
              </div>
              <div className="modal-actions">
                <button className="trailer-btn">Watch Trailer</button>
                <button className="buy-btn">Buy Tickets</button>
                <button className="fav-btn">♡</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 CineSphere. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
