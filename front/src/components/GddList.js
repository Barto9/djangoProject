import React, { useEffect, useState } from 'react';
import api from '../api';
import { Link, useNavigate } from 'react-router-dom';

const GDDList = () => {
  const [gdds, setGdds] = useState([]);
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGddName, setNewGddName] = useState('');
  const [newGddDescription, setNewGddDescription] = useState('');
  const [isCreatingGdd, setIsCreatingGdd] = useState(false);
  const [gddCreateError, setGddCreateError] = useState(null);

  useEffect(() => {
    api.get('/editor/gdds/')
      .then(res => setGdds(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('access');
    navigate('/');
    window.location.reload();
  };

  const toggleCreateModal = () => {
    setShowCreateModal(!showCreateModal);
    if (showCreateModal) {
      setNewGddName('');
      setNewGddDescription('');
      setGddCreateError(null);
      setIsCreatingGdd(false);
    }
  };

  const handleGddCreateSubmit = async (e) => {
    e.preventDefault();
    setIsCreatingGdd(true);
    setGddCreateError(null);

    try {
      const response = await api.post('/editor/gdds/', {
        name: newGddName,
        description: newGddDescription,
      });
      toggleCreateModal();
      navigate(`/gdd/${response.data.id}/notes/`);
    } catch (err) {
      console.error('Failed to create GDD:', err);
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        let errorMessage = 'Failed to create GDD. Please check the details and try again.';
        if (typeof errorData === 'string') {
          errorMessage = errorData;
        } else if (errorData.detail) {
          errorMessage = errorData.detail;
        } else if (errorData.name && Array.isArray(errorData.name)) {
          errorMessage = `Name: ${errorData.name.join(', ')}`;
        } else if (errorData.description && Array.isArray(errorData.description)) {
          errorMessage = `Description: ${errorData.description.join(', ')}`;
        } else {
          const fieldErrors = Object.entries(errorData).map(([key, value]) => 
            `${key}: ${Array.isArray(value) ? value.join(', ') : value}`
          ).join('; ');
          if (fieldErrors) errorMessage = fieldErrors;
        }
        setGddCreateError(errorMessage);
      } else {
        setGddCreateError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsCreatingGdd(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Twoje GDD</h2>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={toggleCreateModal} style={{ padding: '6px 12px', cursor: 'pointer' }}>
            + New GDD
          </button>
          <button 
            onClick={handleLogout} 
            style={{ 
              padding: '5px', 
              cursor: 'pointer', 
              background: 'none', 
              border: 'none' 
            }}
            title="Logout"
          >
            <img src="/logout.png" alt="Logout" style={{ width: '24px', height: '24px', verticalAlign: 'middle' }} />
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

      {showCreateModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2 style={{ textAlign: 'center', color: '#333', marginBottom: '25px' }}>Stwórz nowe GDD</h2>
            <form onSubmit={handleGddCreateSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label htmlFor="new-gdd-name" style={labelStyle}>
                  Nazwa GDD:
                </label>
                <input
                  type="text"
                  id="new-gdd-name"
                  value={newGddName}
                  onChange={(e) => setNewGddName(e.target.value)}
                  style={inputStyle}
                  autoFocus
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="new-gdd-description" style={labelStyle}>
                  Opis (Opcjonalny):
                </label>
                <textarea
                  id="new-gdd-description"
                  value={newGddDescription}
                  onChange={(e) => setNewGddDescription(e.target.value)}
                  rows="4"
                  style={textareaStyle}
                />
              </div>
              {gddCreateError && <p style={errorTextStyle}>{gddCreateError}</p>}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                <button type="button" onClick={toggleCreateModal} disabled={isCreatingGdd} style={buttonSecondaryStyle}>
                  Anuluj
                </button>
                <button type="submit" disabled={isCreatingGdd} style={buttonPrimaryStyle}>
                  {isCreatingGdd ? 'Creating...' : 'Stwórz GDD'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const modalOverlayStyle = {
  position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  zIndex: 1000,
};
const modalContentStyle = {
  background: '#fff', padding: '30px', borderRadius: '8px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
  minWidth: '350px', maxWidth: '500px', width: '90%',
};
const labelStyle = { display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' };
const inputStyle = { width: '100%', padding: '10px', boxSizing: 'border-box', border: '1px solid #ddd', borderRadius: '4px' };
const textareaStyle = { ...inputStyle, resize: 'vertical', minHeight: '80px' };
const errorTextStyle = { color: 'red', marginBottom: '15px', textAlign: 'center', background: '#ffebee', border: '1px solid #ef9a9a', padding: '8px', borderRadius: '4px' };
const buttonBaseStyle = { padding: '10px 20px', cursor: 'pointer', border: 'none', borderRadius: '4px', fontWeight: 'bold' };
const buttonPrimaryStyle = { ...buttonBaseStyle, background: '#007bff', color: 'white' };
const buttonSecondaryStyle = { ...buttonBaseStyle, background: '#6c757d', color: 'white' };


export default GDDList;
