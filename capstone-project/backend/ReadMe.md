---

### Backend README

```markdown
# Movie Recommendation App - Backend

Welcome to the backend of the Movie Recommendation App, a RESTful API built with Express.js and MongoDB. This server handles user authentication, movie data retrieval from the TMDB API, and user-specific operations like watchlists and reviews. It serves as the backbone for the frontend application.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview
The Movie Recommendation App backend is an Express.js application that manages user accounts, integrates with the TMDB API for movie data, and stores user preferences in a MongoDB database. It uses JWT for authentication and provides a secure API for the frontend to interact with.

## Features
- User registration and login with JWT authentication.
- Movie search and details retrieval via the TMDB API.
- Management of user favorites, watchlist, and reviews.
- RESTful API design with CORS support for frontend integration.

## Prerequisites
- Node.js (v18.x or later)
- npm (v9.x or later)
- MongoDB Atlas account (or local MongoDB instance)
- A code editor (e.g., VS Code)
- Internet connection for API calls and database access

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/capstone-project.git
   cd capstone-project/backend
   
   Install Dependencies:npm install
   
   Configure Environment Variables:Create a .env file in the backend/ directory.Add the following variables:MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/<dbname>?retryWrites=true&w=majority
JWT_SECRET=your_strong_secret_key
TMDB_API_KEY=your_tmdb_api_key
PORT=5000
Replace <username>, <password>, and <dbname> with your MongoDB Atlas credentials.

Generate a strong JWT_SECRET (e.g., using openssl rand -base64 32).Obtain a TMDB_API_KEY from TMDB.
Set Up MongoDB Atlas:Create a cluster in MongoDB Atlas.Whitelist your IP address in the "Network Access" section (use 0.0.0.0/0 for testing, secure later).
UsageStart the Server:npm run devThe server will run on http://localhost:5000.
Interact with the API:Use tools like Postman or curl to test endpoints (see API Endpoints below).
The frontend will automatically connect to this server if configured correctly.

Project Structurecapstone-project/
└── backend/
    ├── config/                 # Database configuration
    │   └── db.js              # MongoDB connection setup
    ├── models/                 # Mongoose schemas
    │   ├── User.js            # User model
    │   ├── Favorite.js        # Favorite model
    │   ├── Watchlist.js       # Watchlist model
    │   └── Review.js          # Review model
    ├── routes/                 # API routes
    │   ├── auth.js            # Authentication routes
    │   └── movie.js           # Movie-related routes
    ├── middleware/             # Custom middleware
    │   └── auth.js            # JWT authentication middleware
    ├── server.js              # Main server file
    ├── .env                   # Environment variables
    ├── .gitignore             # Git ignore file
    ├── package.json           # Project metadata and dependencies
    └── nodemon.json           # Nodemon 
    
    Configuration
    Environment Variables: Defined in .env (see Installation).
    
    Database: Connects to MongoDB Atlas using MONGODB_URI.
    
    API Keys: Uses TMDB_API_KEY for movie data.
    
    API EndpointsAuthentication:POST /auth/register - Register a new user (body: { email, password }).POST /auth/login - Log in a user (body: { email, password }, returns JWT).Movies:GET /movies/search - Search movies (query: ?query=action&page=1).GET /movies/details/:id - Get movie details by ID.User:GET /user/profile - Get user profile (requires JWT).POST /user/favorites - Add movie to favorites (body: { movieId }, requires JWT).POST /user/watchlist - Add movie to watchlist (body: { movieId }, requires JWT).POST /user/reviews - Add a review (body: { movieId, rating, comment }, requires JWT).
    
    DevelopmentRun Development Server:npm run devUses nodemon for auto-restart on file changes.Build for Production:npm startTestingNo automated tests are currently implemented. Manual testing is recommended:Test API endpoints with Postman or curl.Verify user authentication and data persistence.To add tests, consider using jest with supertest.DeploymentHosting: Deploy to platforms like Heroku, Render, or AWS.Database: Use MongoDB Atlas for the live database.Environment: Set NODE_ENV=production and update .env with live URLs.ContributingFork the repository.Create a feature branch: git checkout -b feature-name.Commit changes: git commit -m "Add feature-name".Push to the branch: git push origin feature-name.Open a pull request.LicenseThis project is licensed under the MIT License. See the LICENSE file for details.ContactAuthor: [Your Name]Email: your.email@example.comGitHub: https://github.com/your-username