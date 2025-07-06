import { useState, useEffect } from 'react';
import { discoverMovies } from '../services/movie';
import MovieCard from '../components/MovieCard';
import '../styles/MoviesPage.css';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadMovies = async (pageNum = 1) => {
    setLoading(true);
    try {
      const data = await discoverMovies(pageNum);
      setMovies(prev => pageNum === 1 ? data.results : [...prev, ...data.results]);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError('Failed to load movies. Please try again later.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies(page);
  }, [page]);

  const handleLoadMore = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  return (
    <div className="movies-page">
      <h1>Browse All Movies</h1>
      {error && <div className="error-message">{error}</div>}
      
      <div className="movies-grid">
        {movies.map(movie => (
          <MovieCard key={`${movie.id}-${page}`} movie={movie} />
        ))}
      </div>

      {page < totalPages && (
        <button
          onClick={handleLoadMore}
          disabled={loading}
          className="load-more-btn"
        >
          {loading ? 'Loading...' : 'Load More Movies'}
        </button>
      )}
    </div>
  );
}