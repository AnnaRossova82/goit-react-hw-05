import axios from 'axios';

const apiKey = '677edfed3e4b0a50247438fda07b9881';

export async function fetchTrendingMovies() {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error.message);
    return [];
  }
}



/* import axios from 'axios';

const apiKey = '677edfed3e4b0a50247438fda07b9881';

async function fetchTrendingMovies() {
  try {
    const response = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${apiKey}`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error.message);
    return [];
  }
}

// Виклик функції для отримання списку найпопулярніших фільмів
fetchTrendingMovies()
  .then((movies) => {
    console.log('Trending movies:', movies);
  })
  .catch((error) => {
    console.error('Error fetching trending movies:', error.message);
  }); */