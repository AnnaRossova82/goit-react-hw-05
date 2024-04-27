import { useState, useEffect } from 'react';
import { useParams, Link, Outlet } from "react-router-dom";
import axios from 'axios';
import css from'./MovieDetailsPage.module.css'

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
      <div className={css.container}>
      <img src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`} alt={movieDetails.title} />
      <div>
        <h3>Overview:</h3>
        <p>{movieDetails.overview}</p>
        <h3>User Score:</h3>
        <p>{movieDetails.vote_average}</p>
        <h3>Genres:</h3>
        <ul>
          {movieDetails.genres.map(genre => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>

      </div>
     
      </div>

        <h3>Additional Information:</h3>
        <ul>

          <li><Link to={`cast`}>Cast Preview</Link></li>
          <li><Link to={`reviews`}>Reviews</Link></li>

        </ul>
        <Outlet />
     
    </div>
  );
};

export default MovieDetailsPage;