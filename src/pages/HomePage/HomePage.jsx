import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 


const HomePage = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const apiKey = '677edfed3e4b0a50247438fda07b9881'; 

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
  }, [apiKey]); 

  return (
    <div>
      <h2>Trending today</h2>
      <ul>
        {trendingMovies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}?apiKey=${apiKey}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;