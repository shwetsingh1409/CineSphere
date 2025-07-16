import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';
import './App.css';

const fallbackMovies = [
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
  {
    id: 3,
    title: 'A Minecraft Movie',
    year: 2025,
    genres: ['Family', 'Comedy'],
    duration: '1h 41m',
    rating: 6.5,
    description: 'A fun family adventure in the world of Minecraft.',
    poster: 'https://m.media-amazon.com/images/I/81Q1b6vKQwL._AC_SY679_.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 4,
    title: 'How to Train Your Dragon',
    year: 2025,
    genres: ['Action', 'Family'],
    duration: '2h 5m',
    rating: 7.6,
    description: 'A new adventure with dragons and heroes.',
    poster: 'https://m.media-amazon.com/images/I/81Zt42ioCgL._AC_SY679_.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 5,
    title: 'Mission: Impossible – The Final',
    year: 2025,
    genres: ['Action', 'Adventure'],
    duration: '2h 50m',
    rating: 7.2,
    description: 'Ethan Hunt returns for one last impossible mission.',
    poster: 'https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
];

function MovieGrid({ movies, onMovieClick, onBuyClick }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div className="movie-card" key={movie.id} onClick={() => onMovieClick(movie)}>
          <img src={movie.poster} alt={movie.title} className="movie-poster" />
          <div className="movie-info">
            <h3>{movie.title}</h3>
            <div className="movie-meta-small">
              <span>{movie.year}</span>
              <span>• {movie.genres.join(', ')}</span>
              <span>• {movie.duration}</span>
            </div>
            <button className="buy-btn" onClick={e => { e.stopPropagation(); onBuyClick(movie); }}>Buy Tickets</button>
            <span className="rating">⭐ {movie.rating}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function SeatSelection({ movies }) {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const movie = movies.find(m => String(m.id) === movieId);
  const timings = ["02:30 PM", "05:30 PM"];
  const [selectedTime, setSelectedTime] = useState(timings[0]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const seatRows = [
    ['A','B','C','D','E','F','G','H','J'],
    Array.from({length: 9}, (_, i) => i+1)
  ];
  // Dummy unavailable seats
  const unavailable = ['A3','B5','C7','D2','E8','F4','G9','H1','J5'];

  const handleSeatClick = (seat) => {
    if (unavailable.includes(seat)) return;
    setSelectedSeats(seats => seats.includes(seat) ? seats.filter(s => s !== seat) : [...seats, seat]);
  };

  const handleConfirm = () => {
    alert(`Booking confirmed for ${movie.title} at ${selectedTime}, seats: ${selectedSeats.join(', ')}`);
    navigate('/');
  };

  if (!movie) return <div style={{color:'#fff',padding:'2rem'}}>Movie not found.</div>;

  return (
    <div className="seat-selection-page">
      <h2 style={{marginBottom:'1.5rem'}}>{movie.title} - Select your seat</h2>
      <div className="seat-selection-container">
        <div className="timings-box">
          <h3>Available Timings</h3>
          {timings.map(time => (
            <div key={time} className={`timing-option${selectedTime===time?' selected':''}`} onClick={()=>setSelectedTime(time)}>
              <span role="img" aria-label="clock">🕒</span> {time}
            </div>
          ))}
        </div>
        <div className="seat-map-box">
          <div className="screen-label">SCREEN SIDE</div>
          <div className="seat-map">
            {seatRows[0].map(row => (
              <div className="seat-row" key={row}>
                {seatRows[1].map(num => {
                  const seat = row+num;
                  const isUnavailable = unavailable.includes(seat);
                  const isSelected = selectedSeats.includes(seat);
                  return (
                    <div
                      key={seat}
                      className={`seat${isUnavailable ? ' unavailable' : ''}${isSelected ? ' selected' : ''}`}
                      onClick={() => handleSeatClick(seat)}
                    >{seat}</div>
                  );
                })}
              </div>
            ))}
          </div>
          <button className="confirm-btn" disabled={selectedSeats.length===0} onClick={handleConfirm}>Confirm Booking</button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setMovies(data);
          setSelectedMovie(data[0]);
        } else {
          setMovies(fallbackMovies);
          setSelectedMovie(fallbackMovies[0]);
        }
      })
      .catch(() => {
        setMovies(fallbackMovies);
        setSelectedMovie(fallbackMovies[0]);
      });
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };
  const handleBuyClick = (movie) => {
    navigate(`/book/${movie.id}`);
  };
  const handleWatchTrailer = (movie) => {
    window.open('https://www.youtube.com/results?search_query=' + encodeURIComponent(movie.title + ' trailer'), '_blank');
  };

  // Filter movies by search term
  const filteredMovies = searchTerm
    ? movies.filter(m => m.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : movies;

  return (
    <div className="App">
      {/* Header/Navbar */}
      <header className="navbar">
        <div className="logo">Cine<span>Sphere</span></div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/movies">Movies</Link>
          <a href="#theaters">Theaters</a>
          <a href="#releases">Releases</a>
        </nav>
        <div className="nav-actions">
          <button className="search-btn" onClick={() => setSearchOpen(v => !v)}>🔍</button>
          <button className="login-btn">Login</button>
        </div>
        {searchOpen && (
          <input
            className="search-input"
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            autoFocus
            style={{marginLeft: '1rem', borderRadius: '1rem', padding: '0.5rem 1rem', fontSize: '1rem', border: 'none'}}
          />
        )}
      </header>

      <Routes>
        <Route path="/" element={
          <>
            {/* Hero Section */}
            {selectedMovie && (
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
                  <button className="explore-btn" onClick={() => window.scrollTo({top: 600, behavior: 'smooth'})}>Explore Movies</button>
                </div>
              </section>
            )}
            {/* Now Showing Section (show only first 6 movies, filtered) */}
            <section className="now-showing">
              <h2>Now Showing</h2>
              <MovieGrid movies={filteredMovies.slice(0, 6)} onMovieClick={handleMovieClick} onBuyClick={handleBuyClick} />
            </section>
          </>
        } />
        <Route path="/movies" element={
          <section className="now-showing">
            <h2>All Movies</h2>
            <MovieGrid movies={filteredMovies} onMovieClick={handleMovieClick} onBuyClick={handleBuyClick} />
          </section>
        } />
        <Route path="/book/:movieId" element={<SeatSelection movies={movies} />} />
      </Routes>

      {/* Movie Modal */}
      {showModal && selectedMovie && (
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
                <button className="trailer-btn" onClick={()=>handleWatchTrailer(selectedMovie)}>Watch Trailer</button>
                <button className="buy-btn" onClick={()=>{setShowModal(false); handleBuyClick(selectedMovie);}}>Buy Tickets</button>
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

export default function AppWithRouter() {
  return (
    <Router>
      <App />
    </Router>
  );
}
