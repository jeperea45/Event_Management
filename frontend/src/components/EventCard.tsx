import React from 'react';
import { Event } from '../Types';
import {format, parseISO} from 'date-fns';

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: EventCardProps) {
  const formattedDate = format(parseISO(event.date), 'dd/MM/yyyy');
  return (
    <div className="border rounded-lg shadow p-4 bg-white">
      <h2 className="text-xl font-bold">{event.name}</h2>
      <p>{event.description}</p>
      <p className="text-gray-500">{formattedDate}</p>
      <p className="text-gray-700">{event.location}</p>
    </div>
  );
}
