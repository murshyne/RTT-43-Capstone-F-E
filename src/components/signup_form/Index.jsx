import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../contexts/auth/auth_context";

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
        <label htmlFor="password">Password: </label>
        <input
          onChange={handleChange}
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          minLength="6"
        />
        <label htmlFor="password2">Confirm Password: </label>
        <input
          onChange={handleChange}
          type="password"
          id="password2"
          name="password2"
          placeholder="Confirm Password"
          minLength="6"
        />
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
