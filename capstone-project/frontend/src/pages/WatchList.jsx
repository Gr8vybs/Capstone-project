
import { useWatchlist } from '../contexts/WatchlistContext';
import WatchlistItem from '../components/WatchlistItem.jsx';
import { getProfile } from '../services/movie.jsx';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContext.jsx';

function Watchlist() {
  const { watchlist, setWatchlist, addToWatchlist } = useWatchlist();
  const { userData } = useContext(UserContext);

  useEffect(() => {
    let mounted = true;
    const fetchWatchlist = async () => {
      try {
        console.log('Fetching watchlist, userData:', userData); // Debug
        const data = await getProfile();
        console.log('Full profile data:', data); // Debug full response
        const newWatchlist = data.watchlist || [];
        if (mounted) {
          console.log('Fetched watchlist data:', newWatchlist);
          // Forcefully sync state with backend data
          setWatchlist(newWatchlist.length > 0 ? [...newWatchlist] : []); // Reset or set fetched data
          // Optional: Add only new items if you want to preserve local additions
          // newWatchlist.forEach((item) => {
          //   if (!watchlist.some((w) => w.movieId === item.movieId)) {
          //     addToWatchlist(item);
          //   }
          // });
        }
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };
    if (userData) fetchWatchlist();
    return () => {
      mounted = false;
    };
  }, [userData, setWatchlist]); // Ensure re-run on userData change

  console.log('Current watchlist state:', watchlist); // Debug render state

  return (
    <div className="watchlist">
      <h2>Watchlist</h2>
      {watchlist.length === 0 ? (
        <p>No movies in your watchlist.</p>
      ) : (
        watchlist.map((item) => (
          <WatchlistItem key={item.movieId} movieId={item.movieId} />
        ))
      )}
    </div>
  );
}

export default Watchlist;