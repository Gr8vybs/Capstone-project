import { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import MovieCard from '../components/MovieCard';

export default function Favorites() {
  const { userData } = useContext(UserContext);

  return (
    <div className="favorites-page">
      <h1>Your Favorites</h1>
      {userData?.favorites?.length > 0 ? (
        <div className="movies-grid">
          {userData.favorites.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No favorite movies yet</p>
      )}
    </div>
  );
}