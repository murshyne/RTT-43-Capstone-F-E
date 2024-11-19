import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/auth/auth_context";
import './index.module.css'; // Make sure you import the CSS file



const LoginForm = ({ setNewUser }) => {
  const nav = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleClick = () => {
    setNewUser(true);
  };

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(formData);
      nav('/dashboard');  
    } catch (err) {
      setErrors(err.response?.data?.errors || []);
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    }
  }

  return (
    <div className="login-page">
      <div className="left-side">
        <img src="path-to-your-image.jpg" alt="Gym" className="hero-image" />
        <div className="left-text">
          <h2>Welcome back</h2>
          <p>Please log in to view your profile or connect with your trainer.</p>
        </div>
      </div>
      <div className="right-side">
        <div className="forms">
          <h2>Login</h2>
          <p>
            Need a Gym Champ account? <a href="#" onClick={handleClick}>Create an account</a>
          </p>
          <form onSubmit={handleSubmit} autoComplete='off'>
            <label htmlFor='email'>Email: </label>
            <input
              onChange={handleChange}
              type='email'
              id='email'
              name='email'
              placeholder='Email'
            />
            <label htmlFor='password'>Password: </label>
            <div className="password-container">
              <input
                onChange={handleChange}
                type={passwordVisible ? 'text' : 'password'}
                id='password'
                name='password'
                placeholder='Password'
                minLength='8'
              />
              <i 
                className={`fa ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`}
                onClick={togglePasswordVisibility}
              />
            </div>
            <button type='submit'>Log In</button>
          </form>
          {errors.length > 0 && <div className="error-message">{errors}</div>}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;