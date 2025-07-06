# Movie Recommendation App - Frontend

Welcome to the frontend of the Movie Recommendation App, a web application built with React and Vite that allows users to discover, search, and manage their favorite movies. This app integrates with a backend API to handle user authentication, movie searches via the TMDB API, and user-specific features like watchlists and reviews.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Development](#development)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Overview
The Movie Recommendation App frontend is a single-page application (SPA) designed to provide an intuitive interface for movie enthusiasts. Users can register, log in, search for movies, add them to their watchlist or favorites, and leave reviews. The app leverages React for component-based architecture, Vite for fast development, and integrates with a backend API for data management.

## Features
- User authentication (register and login).
- Movie search functionality using the TMDB API.
- Display of movie details (title, release year, rating).
- Personal watchlist and favorites management.
- Ability to submit and view movie reviews.
- Responsive design for desktop and mobile devices.

## Prerequisites
- Node.js (v18.x or later)
- npm (v9.x or later)
- A code editor (e.g., VS Code)
- Internet connection for API calls
- Backend server running (see backend README)

## Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/capstone-project.git
   cd capstone-project/frontendInstall Dependencies:npm installConfigure Environment Variables:Create a .env file in the frontend/ directory.Add the following variables:VITE_API_URL=http://localhost:5000
VITE_TMDB_API_KEY=your_tmdb_api_keyReplace your_tmdb_api_key with a valid TMDB API key (obtainable from TMDB).UsageStart the Development Server:npm run devOpen your browser and navigate to http://localhost:5173.Navigate the App:Landing Page (/): View the welcome message and links to register or login.Register (/register): Create a new account with an email and password.Login (/login): Log in with existing credentials.Home (/home): Search for movies and view a list of results.Profile (/profile): View your account details and favorites.Watchlist (/watchlist): Manage your watchlist of movies.Interact with Features:Use the search bar on the home page to find movies by title.Add movies to your watchlist or favorites from the home page.Submit reviews for movies directly from the home page or watchlist.

capstone-project/
└── frontend/
    ├── public/
    │   ├── index.html           # Main HTML template
    │   └── favicon.ico          # Application icon
    ├── src/
    │   ├── assets/              # Static files (e.g., images)
    │   ├── components/          # Reusable UI components (e.g., Login, Register)
    │   ├── pages/               # Page-level components (e.g., Home, Profile)
    │   ├── services/            # API service calls (e.g., auth, movie)
    │   ├── context/             # State management contexts (e.g., AuthContext)
    │   ├── App.jsx              # Main app component with routing
    │   ├── main.jsx             # Entry point
    │   └── App.css              # Global styles
    ├── .env                     # Environment variables
    ├── .gitignore               # Git ignore file
    ├── package.json             # Project metadata and dependencies
    └── vite.config.js           # Vite Configuration
    
    ConfigurationEnvironment Variables: Defined in .env (see Installation).
    API Integration: The app connects to a backend at VITE_API_URL for authentication and movie data.
    DevelopmentRun Development Server:npm run dev
    Build for Production:npm run build
    Output is in the dist/ directory, ready for deployment.
    Preview Build:npm run preview
    TestingCurrently, no automated tests are implemented. 
    Manual testing is recommended:Verify registration and login flows.
    Test movie search and watchlist functionality.To add tests, consider using vitest or jest with React Testing Library.
    DeploymentStatic Hosting: Deploy the dist/ folder to services like Netlify, Vercel, or GitHub Pages.
    Backend Integration: Ensure the backend is deployed (e.g., Heroku) and update VITE_API_URL to the live backend URL.
    ContributingFork the repository.
    Create a feature branch: git checkout -b feature-name.
    Commit changes: git commit -m "Add feature-name".
    Push to the branch: git push origin feature-name.
    Open a pull request.
    LicenseThis project is licensed under the MIT License. See the LICENSE file for details.
    ContactAuthor: Simon Afolayan
    Email: vibegreat28@gmail.com
    GitHub: https://github.com/your-gr8vybs