import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { login as loginService } from '../services/auth';
import '../styles/Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(UserContext); // Changed from setUser to login

  useEffect(() => {
    document.getElementById('email-input')?.focus();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
const handleSubmit = async (e) => {
  e.preventDefault();
  if (!email || !password) {
    setError('Please fill in all fields');
    return;
  }

  setIsLoading(true);
  try {
    const response = await loginService({ email, password });
    console.log('Login API response:', response); // Debug log
    
    if (response.token) {
      console.log('Token received, calling context login'); // Debug log
      await login(response.token);
      
      // Verify context state after login
      setTimeout(() => {
        console.log('After login - localStorage token:', localStorage.getItem('token'));
      }, 1000);
      
      navigate('/home');
    }
  } catch (err) {
    console.error('Login error details:', err); // Detailed error log
    setError(err.response?.data?.message || 'Login failed');
  } finally {
    setIsLoading(false);
  }
};
    

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await loginService({ email, password });
      
      if (response.token) {
        // Use the login function from context which will handle:
        // 1. Storing the token
        // 2. Fetching the user profile
        // 3. Updating the user state
        await login(response.token);
        navigate('/home');
      } else {
        throw new Error('No token received');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email-input">Email</label>
          <input
            id="email-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password-input">Password</label>
          <div className="password-input-container">
            <input
              id="password-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="show-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
        </div>

        <button type="submit" disabled={isLoading} className="login-button">
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Login;