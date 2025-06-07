// frontend/src/components/booking/PetForm.jsx
import { useState, useContext } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import api from '../../services/api';


export default function PetForm({onSuccess}) {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    special_requirements: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/pets/', {
        ...formData,
        owner: user.id
      });
      onSuccess(response.data);
    } catch (err) {
      setError('Failed to save pet: ' + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="pet-form-container">
      <h3>Add New Pet</h3>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Pet Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Breed</label>
          <input
            type="text"
            name="breed"
            value={formData.breed}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Special Requirements</label>
          <textarea
            name="special_requirements"
            value={formData.special_requirements}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="submit-button">
          Save Pet
        </button>
      </form>
    </div>
  );
}