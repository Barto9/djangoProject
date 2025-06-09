import React, { useEffect, useState } from 'react';
import NoteList from './components/NoteList';

function App() {
  const [time, setTime] = useState(new Date());

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: '36px', color: '#333' }}>🎮 GDD Editor Dashboard</h1>
      <p style={{ fontSize: '18px', color: '#555' }}>
        Welcome to your Game Design Document workspace. The time is now:
      </p>
      <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#222' }}>
        {time.toLocaleTimeString()}
      </p>

      <hr style={{ margin: '30px 0' }} />

      <NoteList />
    </div>
  );
}

export default App;
