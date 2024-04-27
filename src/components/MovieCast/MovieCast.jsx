import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const apiKey = "677edfed3e4b0a50247438fda07b9881";

const MovieCast = () => {
  const { movieId } = useParams();
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCredits() {
      setLoading(true);
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
        };
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          options
        );
        setCredits(response.data.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCredits();
  }, [movieId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
   
      <ul>
        {credits &&
          credits.map((actor) => (
            <li key={actor.id}>
              <div>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                  alt={actor.name}
                />
                <p>{actor.name}</p>
                <p>{actor.character}</p>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MovieCast;

