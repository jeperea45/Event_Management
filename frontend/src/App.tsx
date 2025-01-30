import React, { useState, useEffect } from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { AuthForms } from './components/AuthForms';
import { getEvents, login, register, createEvent, updateEvent, deleteEvent } from './utils/api';
import { EventForm } from './components/EventForms';
import { Event, FilterState, AuthState } from './Types/index';
import { format } from 'date-fns';

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    date: '',
    location: '',
  });
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const navigate = useNavigate();


  const fetchData = async () => {
    try {
      const eventsData = await getEvents();
      setEvents(eventsData);


      const uniqueLocations = [
        ...new Set(eventsData.map((event) => event.location)),
      ];
      setLocations(uniqueLocations);
    } catch (error) {
      console.error('Error al cargar los eventos:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogin = (email: string, password: string): Promise<void> => {
    return login(email, password).then((user) => {
      setAuth({ user, isAuthenticated: true });
      fetchData();
      navigate('/home');
    });
  };

  const handleRegister = (email: string, password: string): Promise<void> => {
    return register(email, password).then(() => {
      navigate('/');
    });
  };

  const handleLogout = () => {
    setAuth({ user: null, isAuthenticated: false });
    setEvents([]);
    setLocations([]);
    navigate('/');
  };


  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      (event.name?.toLowerCase() || '').includes(filters.search.toLowerCase()) ||
      (event.description?.toLowerCase() || '').includes(filters.search.toLowerCase());
    const matchesDate =
      filters.date === '' || format(new Date(event.date), 'yyyy-MM-dd') === filters.date;
    const matchesLocation = !filters.location || event.location === filters.location;

    return matchesSearch && matchesDate && matchesLocation;
  });

  const handleSubmitEvent = async (eventData: Partial<Event>) => {
    try {

      const formattedEventData = {
        ...eventData,
        date: eventData.date ? `${eventData.date}T${eventData.time}:00Z` : '',
      };
  
      if (isEditing && selectedEvent) {
        await updateEvent(selectedEvent.id, formattedEventData);
      } else {
        await createEvent(formattedEventData);
      }
      fetchData();
      setShowEventForm(false);
      setSelectedEvent(null);
      setIsEditing(false);
    } catch (error) {
      console.error('Error al guardar el evento:', error);
    }
  };

  const handleEditEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsEditing(true);
    setShowEventForm(true);
  };

  const handleDeleteEvent = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
      try {
        await deleteEvent(id);
        alert('Evento eliminado con éxito.');
        fetchData();
        setShowEventForm(false);
      } catch (error) {
        console.error('Error al eliminar el evento:', error);
      }
    }
  };

  const handleCreateEvent = () => {
    setSelectedEvent(null);
    setShowEventForm(true);
  };


  const handleFormClose = () => {
    setShowEventForm(false);
    fetchData();
  };

  if (!auth.isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <AuthForms onLogin={handleLogin} onRegister={handleRegister} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Routes>
        <Route
          path="/home"
          element={
            showEventForm ? (
              <EventForm
                event={selectedEvent}
                initialEvent={selectedEvent}
                onSuccess={handleFormClose}
                onSubmit={handleSubmitEvent}
                onDelete={handleDeleteEvent}
                onCancel={() => setShowEventForm(false)}
              />
            ) : (
              <Home
                events={filteredEvents}
                filters={filters}
                locations={locations}
                onFilterChange={handleFilterChange}
                onCreateEvent={handleCreateEvent}
                handleEditEvent={handleEditEvent}
                onLogout={handleLogout}
              />
            )
          }
        />
        <Route path="/" element={<AuthForms onLogin={handleLogin} onRegister={handleRegister} />} />
      </Routes>
    </div>
  );
}

export default App;
