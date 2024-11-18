import './index.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to='/auth'>Login </Link>
        
      {/* <Link to='/dashboard'> Dashboard</Link> */}
    </nav>
  );
};

export default Navbar;