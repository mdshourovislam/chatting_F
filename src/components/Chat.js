import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

export default function Chat({ token, username }) {
  const [room, setRoom] = useState('general');
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch messages
    axios.get(`http://localhost:5000/messages/${room}`)
      .then(res => setMessages(res.data));

    socket.emit('joinRoom', { room, username });

    socket.on('receiveMessage', msg => setMessages(prev => [...prev, msg]));
    socket.on('onlineUsers', list => setUsers(list));

    return () => {
      socket.off('receiveMessage');
      socket.off('onlineUsers');
    };
  }, [room, username]);

  const sendMessage = () => {
    if (!input) return;
    socket.emit('sendMessage', { room, user: username, text: input });
    setInput('');
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto' }}>
      <h2>Room: {room}</h2>
      <select value={room} onChange={e => setRoom(e.target.value)}>
        <option value="general">General</option>
        <option value="tech">Tech</option>
        <option value="random">Random</option>
      </select>

      <div style={{ border: '1px solid #ccc', height: '300px', overflowY: 'scroll', padding: '10px' }}>
        {messages.map((msg, idx) => (
          <div key={idx}><b>{msg.user}:</b> {msg.text}</div>
        ))}
      </div>

      <div>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type message" />
        <button onClick={sendMessage}>Send</button>
      </div>

      <div>
        <h4>Online Users</h4>
        <ul>
          {users.map((u, idx) => <li key={idx}>{u.username}</li>)}
        </ul>
      </div>
    </div>
  );
}
