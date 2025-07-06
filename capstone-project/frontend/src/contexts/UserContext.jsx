import { createContext, useState, useEffect } from 'react';
import { getProfile } from '../services/movie';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  const login = async (token) => {
    try {
      localStorage.setItem('token', token);
      const profile = await getProfile();
      const updatedUser = {
        ...profile,
        _id: profile._id || profile.id || 'default_id', // Fallback
        favorites: profile.favorites || [],
        watchlist: profile.watchlist || []
      };
      setUser(updatedUser);
      if (updatedUser._id) {
        setIsAuthenticated(true);
        console.log('Login successful, user:', updatedUser);
      } else {
        console.error('No _id in profile, authentication failed');
        logout();
      }
    } catch (error) {
      console.error('Login failed:', error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const initializeUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        await login(token);
      }
      setLoading(false);
    };
    initializeUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, login, logout, loading, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
}