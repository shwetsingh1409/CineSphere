const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Dummy movies data
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

// Movies API endpoint
app.get('/api/movies', (req, res) => {
  res.json(movies);
});

// Basic route
app.get('/', (req, res) => {
  res.send('CineSphere API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 