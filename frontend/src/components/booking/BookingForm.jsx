import { useState } from 'react';
import api from '../../services/api';
import { useAuth } from '../../contexts/AuthContext';

export default function BookingForm({ slot, onSuccess }) {
  const { user } = useAuth();
  const [petId, setPetId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/bookings/', {
        slot: slot.id,
        pet: petId,
        user: user.id
      });
      onSuccess();
    } catch (err) {
      setError('Booking failed: ' + (err.response?.data?.detail || err.message));
    }
  };

  return (
    <div className="booking-form">
      <h3>Book Time Slot</h3>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        {/* Pet selection would go here */}
        <button type="submit">Confirm Booking</button>
      </form>
    </div>
  );
}