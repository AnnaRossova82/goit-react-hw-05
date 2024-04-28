import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    if (params.has('query')) {
      setQuery(params.get('query'));
    }
  }, [params]);

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setParams({ query });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Enter a movie title..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;