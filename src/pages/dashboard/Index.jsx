import { useAuth } from '../../contexts/auth/auth_context';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { logout } = useAuth();
  const nav = useNavigate();

  function handleLogOut(e) {
    logout();
    nav('/auth')
  }
  return (
    <div>
      <h1>Welcome to your Dashboard</h1>
      <button onClick={handleLogOut}>LogOut</button>
    </div>
  );
};

export default Dashboard;