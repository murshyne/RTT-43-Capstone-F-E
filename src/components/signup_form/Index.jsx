import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/auth/auth_context";
import './index.module.css'; 

const SignUp = ({ setNewUser }) => {
  const { signUp } = useAuth();
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [password2Visible, setPassword2Visible] = useState(false);

  const handleClick = () => {
    setNewUser(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      setErrors(["Passwords do not match"]);
    } else {
      try {
        await signUp(formData);
        nav('/dashboard');
      } catch (err) {
        setErrors(err.response?.data?.errors || []);
      }
    }
  };

  return (
    <div className="forms">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="fname">First Name: </label>
        <input
          onChange={handleChange}
          type="text"
          id="fname"
          name="fname"
          placeholder="First Name"
        />
        <label htmlFor="lname">Last Name: </label>
        <input
          onChange={handleChange}
          type="text"
          id="lname"
          name="lname"
          placeholder="Last Name"
        />
        <label htmlFor="email">Email: </label>
        <input
          onChange={handleChange}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
        />

        {/* Password Field with Visibility Toggle */}
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

        {/* Confirm Password Field with Visibility Toggle */}
        <label htmlFor="password2">Confirm Password: </label>
        <div className="password-container">
          <input
            onChange={handleChange}
            type={password2Visible ? "text" : "password"}
            id="password2"
            name="password2"
            placeholder="Confirm Password"
            minLength="8"
            className="password-input"
            value={formData.password2}
            onClick={() => {
              setPassword2Visible(true);
              setTimeout(() => setPassword2Visible(false), 1000); // Hide after 2 seconds
            }}
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <button onClick={handleClick}>Log In</button>
      </p>
      {errors.length > 0 && <div className="error-message">{errors}</div>}
    </div>
  );
};

export default SignUp;
