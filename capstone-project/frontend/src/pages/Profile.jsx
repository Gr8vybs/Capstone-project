import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext.jsx';
import { getProfile } from '../services/movie.jsx';

function Profile() {
  const { userData, setUserData } = useContext(UserContext);
  const [profile, setProfile] = React.useState(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile();
      setProfile(data);
    };
    fetchProfile();
  }, []);

  return (
    <div className="profile">
      <h2>Profile</h2>
      {profile && <p>Email: {profile.email}</p>}
      <p>Favorites: {profile?.favorites.length || 0}</p>
      <p>Watchlist: {profile?.watchlist.length || 0}</p>
    </div>
  );
}

export default Profile;
