// import { Link, NavLink } from "react-router-dom";

import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../movies-api'; 

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    async function getTrendingMovies() {
      const movies = await fetchTrendingMovies();
      setTrendingMovies(movies);
    }

    getTrendingMovies();
  }, []);

  return (
    <div>
      <h2>Trending today</h2>
      <ul>
        {trendingMovies.map(movie => (
          <li key={movie.id}>
            <a href={`https://www.themoviedb.org/movie/${movie.id}`}>{movie.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;