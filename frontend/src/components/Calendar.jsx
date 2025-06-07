import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction'; // Add for date clicks
import api from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import PetForm from "../components/booking/PetForm";  //Alternative relative path
import BookingForm from './booking/BookingForm';

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [showPetForm, setShowPetForm] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const slotsResponse = await api.get('/slots/');
        const formattedEvents = slotsResponse.data.map(slot => ({
          id: slot.id,
          title: 'Available Slot',
          start: slot.start_time,
          end: slot.end_time,
          allDay: false,
          color: slot.is_available ? '#4CAF50' : '#F44336',
          extendedProps: { is_available: slot.is_available }
        }));
        setEvents(formattedEvents);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    
    if (user) fetchData();
  }, [user]);

  const handleDateClick = (arg) => {
    if (arg.event.extendedProps.is_available) {
      setSelectedSlot(arg.event);
      setShowBookingForm(true);
    }
  };

  const handleNewPet = () => {
    setShowPetForm(false);
    // You might want to refresh pets list here
  };

  return (
    <div className="calendar-container">
      <h1>Pet Daycare Booking System</h1>
      
      {user ? (
        <>
          <div className="calendar-controls">
            <button 
              onClick={() => setShowPetForm(true)}
              className="btn btn-primary"
            >
              Add New Pet
            </button>
          </div>

          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            events={events}
            eventClick={handleDateClick}
            height="80vh"
          />

          {/* Pet Form Modal */}
          {showPetForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <PetForm onSuccess={handleNewPet} />
                <button 
                  onClick={() => setShowPetForm(false)}
                  className="btn btn-cancel"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Booking Form Modal */}
          {showBookingForm && selectedSlot && (
            <div className="modal-overlay">
              <div className="modal-content">
                <BookingForm 
                  slot={selectedSlot} 
                  onSuccess={() => setShowBookingForm(false)}
                />
                <button 
                  onClick={() => setShowBookingForm(false)}
                  className="btn btn-cancel"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="login-prompt">Please login to view available slots</p>
      )}
    </div>
  );
}