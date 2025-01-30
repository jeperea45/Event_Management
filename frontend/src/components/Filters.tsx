import React from 'react';
import { FilterState } from '../Types';

interface FiltersProps {
  filters: FilterState;
  locations: string[];
  onFilterChange: (key: keyof FilterState, value: string) => void;
}

export function Filters({ filters, locations, onFilterChange }: FiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <input
        type="date"
        value={filters.date}
        onChange={(e) => onFilterChange('date', e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={filters.location}
        onChange={(e) => onFilterChange('location', e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">All Locations</option>
        {locations.map((location) => (
          <option key={location} value={location}>
            {location}
          </option>
        ))}
      </select>
    </div>
  );
}
