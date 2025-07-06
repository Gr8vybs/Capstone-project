import { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { FiMenu, FiX } from 'react-icons/fi';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout, loading } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  // Debug logs
  useEffect(() => {
    console.log('Authentication status:', isAuthenticated);
    console.log('User object:', user);
  }, [isAuthenticated, user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  if (loading) return <div className="navbar">Loading...</div>;

  const commonLinks = [
    { path: '/', label: 'Home', end: true },
    { path: '/movies', label: 'Movies' }
  ];

  const protectedLinks = [
    { path: '/watchlist', label: 'Watchlist' },
    { path: '/favorites', label: 'Favorites' },
    { path: '/profile', label: 'Profile' }
  ];

  return (
    <nav className="navbar">
      <div className="navbar-brand">MovieApp</div>

      {/* Desktop Menu */}
      <ul className="desktop-menu">
        {commonLinks.map(link => (
          <li key={link.path}>
            <NavLink to={link.path} end={link.end}>
              {link.label}
            </NavLink>
          </li>
        ))}
        
        {isAuthenticated ? (
          <>
            {protectedLinks.map(link => (
              <li key={link.path}>
                <NavLink to={link.path}>{link.label}</NavLink>
              </li>
            ))}
            <li>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
        )}
      </ul>

      {/* Mobile Menu Toggle */}
      <button 
        className="hamburger" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isOpen ? 'active' : ''}`}>
        {commonLinks.map(link => (
          <NavLink 
            key={link.path}
            to={link.path}
            end={link.end}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
        
        {isAuthenticated ? (
          <>
            {protectedLinks.map(link => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <button 
              onClick={handleLogout} 
              className="logout-btn"
            >
              Logout
            </button>
          </>
        ) : (
          <NavLink 
            to="/login" 
            onClick={() => setIsOpen(false)}
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;