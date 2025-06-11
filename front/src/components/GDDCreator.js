import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const GDDCreator = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSave = async (e) => {
    e.preventDefault();
    if (name.trim() && description.trim()) {
      try {
        await api.post('/editor/gdds/', { name, description });
        navigate(-1); // Go back to previous page
      } catch (err) {
        alert('Failed to save GDD.');
      }
    }
  };

  return (
    <form onSubmit={handleSave}>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Save</button>
    </form>
  );
};

export default GDDCreator;