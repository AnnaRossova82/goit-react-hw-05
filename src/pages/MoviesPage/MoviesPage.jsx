import { useState, useEffect } from 'react';
import {  useSearchParams } from 'react-router-dom';
import axios from 'axios'; 
import SearchForm from '../../components/SearchForm/SearchForm'
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [params, setParams] = useSearchParams();

  const apiKey = '677edfed3e4b0a50247438fda07b9881';

  useEffect(() => {
    if (params.has('query')) {
      setQuery(params.get('query'));
    }
  }, [params]);

  useEffect(() => {
    async function searchMovies() {
      setIsLoading(true);

      try {
        const response = await axios.get(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1&api_key=${apiKey}`);
        
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

    if (query.trim() !== '') {
      searchMovies();
    }
  }, [query, apiKey]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setParams({ query });
  };

  return (
    <div>
      <SearchForm onSubmit={handleSearchSubmit} /> 
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {searchResults.length > 0 && <MovieList movies={searchResults} />} {/* Використовуйте MovieList */}
    </div>
  );
};

export default MoviesPage;