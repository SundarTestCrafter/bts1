import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/home');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style = {{backgroundColor: "#0D6EFD"}} className="d-flex justify-content-center align-items-center vh-100">
      <div style = {{backgroundColor: "#f2fdfdff"}} className="border p-4 rounded w-25">
        <h3 className="text-center">Bug Radar Login</h3>
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label>Username</label>
            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-primary w-50">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;