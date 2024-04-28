import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import css from './MovieReviews.module.css'

const apiKey = '677edfed3e4b0a50247438fda07b9881'; 

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchReviews() {
      setIsLoading(true);
      try {
        const options = {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${apiKey}`
          }
        };
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1&api_key=${apiKey}`, options);
        setReviews(response.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchReviews();
  }, [movieId]);

  if (isLoading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {reviews.length === 0 ? (
        <p>No reviews available.</p>
      ) : (
        <ul className={css.container}>
          {reviews.map(review => (
            <li key={review.id}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;