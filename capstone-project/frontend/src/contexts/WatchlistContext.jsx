
import { createContext, useContext, useState, useEffect } from 'react';
import { removeFromWatchList } from '../services/movie';

const WatchlistContext = createContext();

export function WatchlistProvider({ children }) {
  const [watchlist, setWatchlist] = useState(() => {
    const savedWatchlist = localStorage.getItem('watchlist');
    console.log('Initial watchlist from localStorage:', savedWatchlist ? JSON.parse(savedWatchlist) : []);
    return savedWatchlist ? JSON.parse(savedWatchlist) : [];
  });

  useEffect(() => {
    console.log('Watchlist updated:', watchlist);
    localStorage.setItem('watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const addToWatchlist = (movie) => {
    if (!watchlist.some((m) => m.movieId === movie.movieId)) {
      setWatchlist((prev) => [...prev, movie]);
    }
  };

  const removeFromWatchlist = async (movieId) => {
    console.log('Attempting to remove movieId:', movieId);
    try {
      await removeFromWatchList(movieId);
      setWatchlist((prev) => prev.filter((m) => m.movieId !== movieId));
    } catch (error) {
      console.error('Error removing from watchlist:', error.message, error.response?.status, error.response?.config.url);
    }
  };

  console.log('Providing context with removeFromWatchlist:', !!removeFromWatchlist);

  return (
    <WatchlistContext.Provider value={{ watchlist, setWatchlist, addToWatchlist, removeFromWatchlist }}>
      {children}
    </WatchlistContext.Provider>
  );
}

export const useWatchlist = () => useContext(WatchlistContext);