import { useState, useEffect } from 'react';
import { useParams, Link, Outlet } from "react-router-dom";
import axios from 'axios';

const apiKey = '677edfed3e4b0a50247438fda07b9881'; 

const MovieDetailsPage = () => { 
  const { movieId } = useParams(); 

  const [movieDetails, setMovieDetails] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchMovieDetails() {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`);
        setMovieDetails(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovieDetails();
  }, [movieId]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!movieDetails) {
    return null;
  }

  return (
    <div>
      <Link to="/">Go back</Link>
      <h2>{movieDetails.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt={movieDetails.title} />
      <div>
        <h3>Additional Information:</h3>
        <ul>
          <li><Link to={`/movies/${movieId}/cast`}>Cast Preview</Link></li>
          <li><Link to={`/movies/${movieId}/reviews`}>Reviews</Link></li>
        </ul>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;