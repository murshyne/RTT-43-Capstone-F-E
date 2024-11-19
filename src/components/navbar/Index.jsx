import './index.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <Link to='/'>ReppUp</Link>  {/* Link to Home Page */}
      <Link to='/auth'>Login</Link>
      <Link to='/auth/signup'>Sign Up</Link> {/* Link to SignUp Form */}
    </nav>
  );
};

export default Navbar;
