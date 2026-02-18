import React, { useState } from 'react';
import Login from './components/Login';
import Chat from './components/Chat';

function App() {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState('');

  return (
    <div>
      {!token ? (
        <Login setToken={(t) => { setToken(t); setUsername(prompt("Enter your username:")); }} />
      ) : (
        <Chat token={token} username={username} />
      )}
    </div>
  );
}

export default App;
