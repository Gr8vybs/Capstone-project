
import { UserProvider } from './contexts/UserContext';
import { WatchlistProvider } from './contexts/WatchlistContext';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import Movies from './pages/Movies';
import Watchlist from './pages/WatchList';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import Register from './components/Register';
import Login from './components/Login';
import ErrorPage from './pages/ErrorPage';
import './styles/global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Landing />,
    errorElement: <ErrorPage />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/movies',
    element: <Movies />
  },
  {
    path: '/watchlist',
    element: <Watchlist />
  },
  {
    path: '/favorites',
    element: <Favorites />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  }
]);

function App() {
  return (
    <UserProvider>
      <WatchlistProvider>
        <RouterProvider router={router} />
      </WatchlistProvider>
    </UserProvider>
  );
}

export default App;