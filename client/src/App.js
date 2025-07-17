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
  {
    id: 6,
    title: 'Inception',
    year: 2010,
    genres: ['Action', 'Sci-Fi', 'Thriller'],
    duration: '2h 28m',
    rating: 8.8,
    description: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.',
    poster: 'https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 7,
    title: 'Black Panther',
    year: 2018,
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    duration: '2h 14m',
    rating: 7.3,
    description: 'T’Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to lead his people.',
    poster: 'https://image.tmdb.org/t/p/w500/uxzzxijgPIY7slzFvMotPv8wjKA.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 8,
    title: 'Interstellar',
    year: 2014,
    genres: ['Adventure', 'Drama', 'Sci-Fi'],
    duration: '2h 49m',
    rating: 8.6,
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.',
    poster: 'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 9,
    title: 'Avengers: Endgame',
    year: 2019,
    genres: ['Action', 'Adventure', 'Drama'],
    duration: '3h 1m',
    rating: 8.4,
    description: 'After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos’ actions.',
    poster: 'https://image.tmdb.org/t/p/w500/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 10,
    title: 'Joker',
    year: 2019,
    genres: ['Crime', 'Drama', 'Thriller'],
    duration: '2h 2m',
    rating: 8.5,
    description: 'In Gotham City, mentally troubled comedian Arthur Fleck is disregarded and mistreated by society.',
    poster: 'https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 11,
    title: 'The Dark Knight',
    year: 2008,
    genres: ['Action', 'Crime', 'Drama'],
    duration: '2h 32m',
    rating: 9.0,
    description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
    poster: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 12,
    title: 'Spider-Man: No Way Home',
    year: 2021,
    genres: ['Action', 'Adventure', 'Fantasy'],
    duration: '2h 28m',
    rating: 8.2,
    description: 'Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero.',
    poster: 'https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 13,
    title: 'The Shawshank Redemption',
    year: 1994,
    genres: ['Drama'],
    duration: '2h 22m',
    rating: 9.3,
    description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
    poster: 'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 14,
    title: 'Fight Club',
    year: 1999,
    genres: ['Drama'],
    duration: '2h 19m',
    rating: 8.8,
    description: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.',
    poster: 'https://image.tmdb.org/t/p/w500/pB8BM7pdSp6B6Ih7QZ4DrQ3PmJK.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 15,
    title: 'Pulp Fiction',
    year: 1994,
    genres: ['Crime', 'Drama'],
    duration: '2h 34m',
    rating: 8.9,
    description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
    poster: 'https://image.tmdb.org/t/p/w500/fIE3lAGcZDV1G6XM5KmuWnNsPp1.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 16,
    title: 'The Matrix',
    year: 1999,
    genres: ['Action', 'Sci-Fi'],
    duration: '2h 16m',
    rating: 8.7,
    description: 'A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.',
    poster: 'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 17,
    title: 'Forrest Gump',
    year: 1994,
    genres: ['Drama', 'Romance'],
    duration: '2h 22m',
    rating: 8.8,
    description: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.',
    poster: 'https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 18,
    title: 'The Godfather',
    year: 1972,
    genres: ['Crime', 'Drama'],
    duration: '2h 55m',
    rating: 9.2,
    description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
    poster: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 19,
    title: 'Titanic',
    year: 1997,
    genres: ['Drama', 'Romance'],
    duration: '3h 14m',
    rating: 7.9,
    description: 'A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.',
    poster: 'https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 20,
    title: 'The Lion King',
    year: 1994,
    genres: ['Animation', 'Adventure', 'Drama'],
    duration: '1h 28m',
    rating: 8.5,
    description: 'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
    poster: 'https://image.tmdb.org/t/p/w500/bKPtXn9n4M4s8vvZrbw40mYsefB.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 21,
    title: 'Jurassic Park',
    year: 1993,
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    duration: '2h 7m',
    rating: 8.5,
    description: 'A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park\'s cloned dinosaurs to run loose.',
    poster: 'https://image.tmdb.org/t/p/w500/oU7Oq2kFAAlGqbU4VoAE36g4hoI.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 22,
    title: 'The Silence of the Lambs',
    year: 1991,
    genres: ['Crime', 'Drama', 'Thriller'],
    duration: '1h 58m',
    rating: 8.6,
    description: 'A young F.B.I. cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.',
    poster: 'https://image.tmdb.org/t/p/w500/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 23,
    title: 'Goodfellas',
    year: 1990,
    genres: ['Biography', 'Crime', 'Drama'],
    duration: '2h 26m',
    rating: 8.7,
    description: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito.',
    poster: 'https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 24,
    title: 'The Green Mile',
    year: 1999,
    genres: ['Crime', 'Drama', 'Fantasy'],
    duration: '3h 9m',
    rating: 8.6,
    description: 'The lives of guards on Death Row are affected by one of their charges: a black man accused of child murder and rape, yet who has a mysterious gift.',
    poster: 'https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg',
    bg: 'https://wallpapercave.com/wp/wp2634222.jpg',
  },
  {
    id: 25,
    title: 'The Departed',
    year: 2006,
    genres: ['Crime', 'Drama', 'Thriller'],
    duration: '2h 31m',
    rating: 8.5,
    description: 'An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.',
    poster: 'https://image.tmdb.org/t/p/w500/nT97ifVT2J1yMQmeq20Qblg61T.jpg',
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

function SignUpPage() {
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <div className="auth-modal">
        <h2>Sign Up</h2>
        <form className="auth-form" onSubmit={e => { e.preventDefault(); alert('Sign up successful!'); navigate('/signin'); }}>
          <input type="text" placeholder="Name" value={signupData.name} onChange={e => setSignupData({ ...signupData, name: e.target.value })} required />
          <input type="email" placeholder="Email" value={signupData.email} onChange={e => setSignupData({ ...signupData, email: e.target.value })} required />
          <input type="password" placeholder="Password" value={signupData.password} onChange={e => setSignupData({ ...signupData, password: e.target.value })} required />
          <button type="submit">Sign Up</button>
        </form>
        <div style={{marginTop:'1rem'}}>Already have an account? <Link to="/signin">Sign In</Link></div>
      </div>
    </div>
  );
}

function SignInPage() {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  return (
    <div className="auth-page">
      <div className="auth-modal">
        <h2>Sign In</h2>
        <form className="auth-form" onSubmit={e => { e.preventDefault(); alert('Sign in successful!'); navigate('/'); }}>
          <input type="email" placeholder="Email" value={loginData.email} onChange={e => setLoginData({ ...loginData, email: e.target.value })} required />
          <input type="password" placeholder="Password" value={loginData.password} onChange={e => setLoginData({ ...loginData, password: e.target.value })} required />
          <button type="submit">Sign In</button>
        </form>
        <div style={{marginTop:'1rem'}}>Don't have an account? <Link to="/signup">Sign Up</Link></div>
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
          <button className="login-btn" onClick={() => navigate('/signin')}>Login</button>
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
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/signin" element={<SignInPage />} />
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
