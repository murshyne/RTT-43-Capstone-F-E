import React from 'react';
import { useState } from "react";
import { useAuth } from "../../contexts/auth/auth_context";
// import { useNavigate } from 'react-router-dom';

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

  const handleClick = () => {
    setNewUser(false);
  };

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      console.log('Passwords do not match');
    } else {
      await signUp(formData);
      nav('/dashboard')
    }
  }

  return (
    <div className='forms'>
      <h2>SignUp</h2>
      <form onSubmit={handleSubmit} autoComplete='off'>
        <label htmlFor='name1'>Name: </label>
        <input
          onChange={handleChange}
          type='text'
          id='name1'
          name='name'
          placeholder='First and Last Name'
        />
        <label htmlFor='email1'>Email: </label>
        <input
          onChange={handleChange}
          type='email'
          id='email1'
          name='email'
          placeholder='Email'
        />
        <label htmlFor='password1'>Password: </label>
        <input
          onChange={handleChange}
          type='password'
          id='password1'
          name='password'
          placeholder='Password'
          minLength='6'
        />
        <input
          onChange={handleChange}
          type='password'
          id='password2'
          name='password2'
          placeholder='Confirm Password'
          minLength='6'
        />
        <button type='submit'>Sign In</button>
      </form>
      <p>
        Already have an account? <button onClick={handleClick}>Sign In</button>
      </p>
    </div>
  );
};

export default SignUp;