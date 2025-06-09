import React, { useEffect, useState } from 'react';
import api from '../api';

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    api.get('notes/')
      .then(res => setNotes(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Notes</h2>
      {notes.map(note => (
        <div key={note.id} style={{ marginBottom: '10px' }}>
          <strong>{note.title}</strong>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
