import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const login = async () => {
    try {
      const res = await axios.post('https://backend-nine-blue-22.vercel.app/login', { username, password });
      setToken(res.data.token);
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div style={{ maxWidth: '300px', margin: '50px auto' }}>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  );
}
