// /app/pantry/components/PantryHeader.tsx
'use client';

import { Grid, List, Plus, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface PantryHeaderProps {
  onAddClick: () => void;
  onViewChange: (view: 'grid' | 'list') => void;
  currentView: 'grid' | 'list';
}

export default function PantryHeader({ onAddClick, onViewChange, currentView }: PantryHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent">
          Vorratsverwaltung
        </h1>
        <p className="text-white/60 mt-1">
          Verwalte deine Lebensmittel intelligent und nachhaltig
        </p>
      </div>

      <div className="flex items-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddClick}
          className="premium-button flex items-center"
        >
          <Plus className="mr-2 h-5 w-5" />
          Artikel hinzufügen
        </motion.button>

        <div className="flex items-center bg-white/10 rounded-lg p-1">
          <button
            onClick={() => onViewChange('grid')}
            className={`p-2 rounded-lg transition-colors ${
              currentView === 'grid' 
                ? 'bg-[#00BFA5] text-white' 
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <Grid className="h-5 w-5" />
          </button>
          <button
            onClick={() => onViewChange('list')}
            className={`p-2 rounded-lg transition-colors ${
              currentView === 'list' 
                ? 'bg-[#00BFA5] text-white' 
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <List className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}