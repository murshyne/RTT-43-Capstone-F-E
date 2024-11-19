import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../contexts/auth/auth_context";
import './index.module.css'; 

const LoginForm = ({ setNewUser }) => {
  const nav = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Handle new user registration flow
  const handleClick = () => {
    nav('/auth/signup'); // Navigate to the sign-up page
  };

  // Handle form input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple client-side validation
    if (!formData.email || !formData.password) {
      setErrors(["Email and Password are required."]);
      return;
    }

    try {
      await login(formData);
      nav('/dashboard');  // Redirect to dashboard on successful login
    } catch (err) {
      setErrors(err.response?.data?.errors || []);
      setTimeout(() => {
        setErrors([]);
      }, 3000);
    }
  };

  return (
    <div className="login-page">
      <div className="forms">
        <h2>Welcome back to ReppUp</h2>
        <h3>Login</h3>

        <form onSubmit={handleSubmit} autoComplete="off">
          <label htmlFor="email">Email: </label>
          <input
            onChange={handleChange}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
          />

          <label htmlFor="password">Password: </label>
          <div className="password-container">
            <input
              onChange={handleChange}
              type={passwordVisible ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Password"
              minLength="8"
              className="password-input"
              value={formData.password}
              onClick={() => {
                setPasswordVisible(true);
                setTimeout(() => setPasswordVisible(false), 1000); // Hide after 2 seconds
              }}
            />
          </div>

          <button type="submit">Log In</button>

          <p>
            Need a Reppup account? <br />
            <a href="#" onClick={handleClick}>Create an account</a>
          </p>
        </form>

        {/* Display error messages */}
        {errors.length > 0 && (
          <div className="error-message">
            {errors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
