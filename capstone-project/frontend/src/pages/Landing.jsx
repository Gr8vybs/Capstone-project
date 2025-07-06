import React from 'react';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="landing">
      <h1>Welcome to Movie Recommendation App</h1>
      <p>Discover, search, and save your favorite movies!</p>
      <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
    </div>
  );
}

export default Landing;