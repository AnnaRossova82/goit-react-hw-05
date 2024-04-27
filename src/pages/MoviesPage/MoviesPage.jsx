import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import SearchForm from '../../components/SearchForm/SearchForm';

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [params, setParams] = useSearchParams();

  const apiKey = '677edfed3e4b0a50247438fda07b9881';

  const handleSubmit = async (event, query) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`);
      if (!response.ok) {
        throw new Error('Failed to fetch search results');
      }
      const data = await response.json();
      setSearchResults(data.results);
      setSearchQuery(query);
      setParams({ query });
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <SearchForm onSubmit={handleSubmit} />
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