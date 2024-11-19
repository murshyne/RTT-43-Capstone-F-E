import './index.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to='/auth'>Login</Link>
      <Link to='/auth'>Sign Up</Link> {/* Added for navigation to sign-up */}
    </nav>
  );
};

export default Navbar;
