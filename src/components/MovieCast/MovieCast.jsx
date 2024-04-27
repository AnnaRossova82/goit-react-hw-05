import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const apiKey = '677edfed3e4b0a50247438fda07b9881'; 

const MovieCast = () => {
  const { id } = useParams();
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCredits() {
      setLoading(true);
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
          }
        };
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`, options);
        setCredits(response.data.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCredits();
  }, [id]);

  if (loading) {
    return <p>Loading cast...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Movie Cast</h2>
      <ul>
        {credits && credits.map(actor => (
          <li key={actor.id}>
            {actor.name} as {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;



