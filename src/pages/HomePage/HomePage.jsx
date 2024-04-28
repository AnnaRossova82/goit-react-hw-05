import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieList from '../../components/MovieList/MovieList';

const apiKey = '677edfed3e4b0a50247438fda07b9881';

const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);

  useEffect(() => {
    async function getTrendingMovies() {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
        setTrendingMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching trending movies:', error.message);
      }
    }

    getTrendingMovies();
  }, []); 

  return (
    <div>
      <h2>Trending today</h2>
      <MovieList movies={trendingMovies} />
    </div>
  );
};

export default HomePage;