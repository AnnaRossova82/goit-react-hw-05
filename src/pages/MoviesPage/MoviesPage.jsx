import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const apiKey = '677edfed3e4b0a50247438fda07b9881';

  useEffect(() => {
    async function searchMovies() {
      setIsLoading(true);

      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${searchQuery}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`);
        
        if (!response.data.results || response.data.results.length === 0) {
          throw new Error('No results found.');
        }

        setSearchResults(response.data.results);
        setError(null);
      } catch (error) {
        setError(error.message);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }

    if (searchQuery.trim() !== '') {
      searchMovies();
    }
  }, [searchQuery]);

  const handleSearchSubmit = (event, query) => {
    event.preventDefault();
    setSearchQuery(query);
  };

  return (
    <div>
      <form onSubmit={(e) => handleSearchSubmit(e, e.target.search.value)}>
        <input type="text" name="search" placeholder="Search movies..." />
        <button type="submit">Search</button>
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {searchResults.length > 0 && (
        <ul>
          {searchResults.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesPage;