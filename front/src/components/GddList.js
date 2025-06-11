import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

const GDDList = () => {
  const [gdds, setGdds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/editor/gdds/')
      .then(res => setGdds(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    navigate('/');
    window.location.reload(); // optional
  };

  const handleCreateNew = () => {
    navigate('/gdd/create');
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>GDDs</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleCreateNew} style={{ padding: '6px 12px', cursor: 'pointer' }}>
            + New GDD
          </button>
          <button onClick={handleLogout} style={{ padding: '6px 12px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>

      <div style={{
        maxHeight: '300px',
        overflowY: 'auto',
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '10px',
        background: '#fafafa'
      }}>
        {gdds.map(gdd => (
          <div key={gdd.id} style={{ marginBottom: '10px' }}>
            <Link to={`/gdd/${gdd.id}/notes/`} style={{ textDecoration: 'none', color: '#0074d9', fontWeight: 'bold' }}>
              {gdd.name}
            </Link>
            <p>{gdd.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GDDList;
