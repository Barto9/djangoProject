import React, { useEffect, useState } from 'react';
import api from '../api';

const GDDList = () => {
  const [gdds, setGdds] = useState([]);

  useEffect(() => {
    api.get('/editor/gdds/')
      .then(res => setGdds(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>GDDs</h2>
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
            <strong>{gdd.name}</strong>
            <p>{gdd.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GDDList;
