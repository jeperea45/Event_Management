import React from 'react';
import { EventCard } from '../components/EventCard';
import { Filters } from '../components/Filters';
import { SearchBar } from '../components/SearchBar';
import { Event, FilterState } from '../Types/index';

interface HomeProps {
  events: Event[];
  filters: FilterState;
  locations: string[];
  onCreateEvent: () => void;
  handleEditEvent: (event: Event) => void;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onLogout: () => void;
}

export function Home({
  events,
  filters,
  locations,
  onFilterChange,
  onCreateEvent,
  handleEditEvent,
  onLogout,
}: HomeProps) {
  return (
    
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Eventos</h1>
          <div className="flex gap-4">
            <button onClick={onCreateEvent} className="bg-green-500 text-white px-4 py-2 rounded-lg">
              Crear Evento
            </button>
            <button onClick={onLogout} className="text-red-600">
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">
        <SearchBar
          value={filters.search}
          onChange={(value) => onFilterChange('search', value)}
        />
        <Filters
          filters={filters}
          locations={locations}
          onFilterChange={onFilterChange}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
            <div key={event.id} className="relative">
            <EventCard event={event} />
            <button
              onClick={() => handleEditEvent(event)}
              className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded"
            >
              Editar
            </button>
          </div>
          ))}
        </div>
      </main>
    </div>
  );
}
