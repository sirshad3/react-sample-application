import React, { useState } from 'react';
import '../Login/Login.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginUser } from '../Api/LoginApi';

function Login() {
  //console.log('Click on  LogOut')
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [inValidUser, setInValidUser] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => 
  {
    e.preventDefault();
    // Perform login logic here
    //console.log('Username:', username);
    //console.log('Password:', password);

    const newErrors = {};

    if (!username.trim()) 
    {
      newErrors.username = 'Name is required';
    }

    if (!password.trim()) 
    {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) 
    {

      const loginPayload = 
      {
        userName: username,
        password: password,
      };

      loginUser(loginPayload)
      .then(response => {
        const token = response.data.token;
       // console.log(response.data)
        if (token) 
          {
           // console.log(response.data.expiration);
            localStorage.setItem("token", token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            navigate('/Home');
          }
      })
      .catch(err => {
       if (err.response.data && err.response.status === 404) 
      {
       // console.log('An error occurred.');
       //console.log(err.response.data)
       //console.log(err.response.status)
        setInValidUser(err.response.data)
      } 
      else 
      {
       // console.log('An error occurred.');
        setInValidUser('An error occurred.')
      }
      });
  }
  };

  return (
    <div className='login-container login-body'>
    <div className="login_form">
    <label>{inValidUser.trim().length !== 0 && (<span className="error">{inValidUser}</span>)}</label>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        <label>{errors.username && (<span className="error">{errors.username}</span>)}</label>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <label>{errors.password && (<span className="error">{errors.password}</span>)}</label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
}

export default Login;