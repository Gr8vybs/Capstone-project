
import { useWatchlist } from '../contexts/WatchlistContext';

const WatchlistItem = ({ movieId }) => {
  const { removeFromWatchlist } = useWatchlist();
  console.log('WatchlistItem rendered with movieId:', movieId);

  const handleRemove = () => {
    console.log('Click detected for movieId (raw):', movieId);
    const parsedId = parseInt(movieId, 10);
    if (isNaN(parsedId)) {
      console.error('Invalid movieId detected:', movieId);
      return;
    }
    if (removeFromWatchlist) {
      console.log('removeFromWatchlist is available, calling it with parsed ID:', parsedId);
      removeFromWatchlist(parsedId).catch((error) => console.error('Removal failed:', error));
    } else {
      console.error('removeFromWatchlist is undefined');
    }
  };

  return (
    <div className="watchlist-item" style={{ pointerEvents: 'auto' }}>
      <span>{movieId}</span>
      <button onClick={handleRemove} style={{ cursor: 'pointer' }}>
        Remove
      </button>
    </div>
  );
};

export default WatchlistItem;