import './login.css';
import React, { useState, useEffect } from 'react';
import LightningBackground from '../LightningBackground/LightningBackground';
import { useNavigate } from 'react-router';
import LoginApi from '../../API/Login';
import RegisterApi from '../../API/Register';

const Login = ({ user, setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [inputValues, setInputValues] = useState({
    username: null,
    email: null,
    password: null
  })
  const navigate = useNavigate();

    useEffect(() => {
        if(user)
            navigate('/home')
    }, [user])

  async function handleSubmit(e) {
    e.preventDefault();
    var user = [];
    if(inputValues.email.trim() === '' ||
       inputValues.password.trim() === '')
        return;

    if(isLogin) {
        user = await LoginApi(inputValues);
        if(user && user.error)
            return;
    }
    else {
        if (inputValues.username.trim() === '') return;
            user = await RegisterApi(inputValues);
            if(user && user.error)
                return;
    }
    
    setUser(user);
    navigate("/home");
  }

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>
      <LightningBackground />
      <div className="login-wrapper">
      <div className="login-card">
        <h1 className="login-title">FocusFlow</h1>

        <div className="login-toggle">
          <button
            className={isLogin ? 'active' : ''}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? 'active' : ''}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
          {!isLogin && 
          <input 
          onChange={(e) => {setInputValues(x => ({...x, username: e.target.value}))}} 
          type="text" placeholder="Username" />}
          <input
          onChange={(e) => {setInputValues(x => ({...x, email: e.target.value}))}} 
          type="email" placeholder="Email" />
          <input
          onChange={(e) => {setInputValues(x => ({...x, password: e.target.value}))}} 
          type="password" placeholder="Password" />
          <button type="submit">{isLogin ? 'Log in' : 'Register'}</button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;
