// /app/pantry/components/PantryFilters.tsx
'use client';

import { Search, Filter, SortAsc } from 'lucide-react';
import type { FilterState } from '../page';

interface PantryFiltersProps {
  filters: FilterState;
  onChange: (updates: Partial<FilterState>) => void;
}

export default function PantryFilters({ filters, onChange }: PantryFiltersProps) {
  const locations = ['Alle', 'Kühlschrank', 'Gefrierschrank', 'Vorratsschrank', 'Regal'];
  const statusOptions = ['Alle', 'Gut', 'Bald ablaufend', 'Abgelaufen', 'Niedriger Bestand'];
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'expiry', label: 'Ablaufdatum' },
    { value: 'quantity', label: 'Menge' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {/* Suchfeld */}
        <div className="relative flex-grow">
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Artikel suchen..."
            className="w-full bg-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/40"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
        </div>

        {/* Standort Filter */}
        <div className="relative min-w-[180px]">
          <select
            value={filters.location}
            onChange={(e) => onChange({ location: e.target.value })}
            className="w-full appearance-none bg-white/10 rounded-lg pl-10 pr-4 py-2 text-white cursor-pointer"
          >
            {locations.map((location) => (
              <option 
                key={location} 
                value={location.toLowerCase()}
                className="bg-[#001A14] text-white"
              >
                {location}
              </option>
            ))}
          </select>
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
        </div>

        {/* Status Filter */}
        <div className="relative min-w-[180px]">
          <select
            value={filters.status}
            onChange={(e) => onChange({ status: e.target.value })}
            className="w-full appearance-none bg-white/10 rounded-lg pl-10 pr-4 py-2 text-white cursor-pointer"
          >
            {statusOptions.map((status) => (
              <option 
                key={status} 
                value={status.toLowerCase()}
                className="bg-[#001A14] text-white"
              >
                {status}
              </option>
            ))}
          </select>
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
        </div>

        {/* Sortierung */}
        <div className="relative min-w-[180px]">
          <select
            value={filters.sortBy}
            onChange={(e) => onChange({ sortBy: e.target.value as FilterState['sortBy'] })}
            className="w-full appearance-none bg-white/10 rounded-lg pl-10 pr-4 py-2 text-white cursor-pointer"
          >
            {sortOptions.map((option) => (
              <option 
                key={option.value} 
                value={option.value}
                className="bg-[#001A14] text-white"
              >
                {option.label}
              </option>
            ))}
          </select>
          <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
        </div>
      </div>
    </div>
  );
}