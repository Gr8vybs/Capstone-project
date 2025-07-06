import React, { useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext.jsx';
import SearchBar from '../components/SearchBar.jsx';
import MovieCard from '../components/MovieCard.jsx';
import { searchMovies } from '../services/movie.jsx';
import Navbar from '../components/Navbar.jsx';

function Home() {
  const { userData, setUserData } = useContext(UserContext);
  const [movies, setMovies] = React.useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const data = await searchMovies('action'); // Default search
      setMovies(data.results || []);
    };
    fetchMovies();
  }, []);

  return (
    <div className="home">
      <Navbar /> {/* Add Navbar */}
      <SearchBar setMovies={setMovies} />
      <div className="movie-list">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;

