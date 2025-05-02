import './login.css';
import React, { useState } from 'react';
import LightningBackground from '../LightningBackground/LightningBackground';
import { useNavigate } from 'react-router';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

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

        <form className="login-form">
          {!isLogin && <input type="text" placeholder="Username" />}
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit" onClick={() => navigate("/home")}>{isLogin ? 'Log in' : 'Register'}</button>
        </form>
      </div>
    </div>
    </div>
  );
}

export default Login;
