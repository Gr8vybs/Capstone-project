import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import './ErrorPage.css'; // Optional styling

export default function ErrorPage() {
  const error = useRouteError();
  
  return (
    <div className="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error occurred.</p>
      <p className="error-details">
        {isRouteErrorResponse(error)
          ? `${error.status} ${error.statusText}`
          : error.message || 'Unknown error'}
      </p>
    </div>
  );
}