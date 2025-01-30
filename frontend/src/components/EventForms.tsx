import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Type, AlignLeft, Trash2 } from 'lucide-react';
import type { Event } from '../Types/index';

interface EventFormProps {
  event: Event | null;

  onSuccess: () => void;
  onSubmit: (event: Omit<Event, 'id' | 'userId'>) => void;
  onDelete?: (id: string) => void;
  initialEvent?: Event | null;
  onCancel: () => void;
}

export function EventForm({ onSubmit, onDelete, initialEvent, onCancel }: EventFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (initialEvent) {
      setName(initialEvent.name);
      setDescription(initialEvent.description);
      setDate(initialEvent.date);
      setTime(initialEvent.time)
      setLocation(initialEvent.location);
    }
  }, [initialEvent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    
    onSubmit({
      name,
      description,
      date,
      time,
      location,
    });
  };

  const handleDelete = () => {
    if (initialEvent && onDelete) {
      if (window.confirm('¿Estás seguro de que deseas eliminar este evento?')) {
        onDelete(initialEvent.id);
      }
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-2xl w-full">
      <h2 className="text-2xl font-bold mb-6">
        {initialEvent ? 'Editar Evento' : 'Crear Evento'}
      </h2>
      {message && (
        <div
          className={`text-center mb-4 ${
            message.includes('correctamente') ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <div className="relative">
            <Type className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>
        <div className="relative">
            <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <div className="relative">
            <AlignLeft className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fecha
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ubicación
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            {initialEvent ? 'Actualizar Evento' : 'Crear Evento'}
          </button>
          {initialEvent && (
            <button
              type="button"
              onClick={handleDelete}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
            >
              <Trash2 className="h-5 w-5 mr-2" />
              Eliminar
            </button>
          )}
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
