import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DietaryPreference {
  id: string;
  label: string;
  icon: string;
  description: string;
}

interface DietaryPreferencesProps {
  dietaryPreferences: DietaryPreference[];
  selectedPreferences: string[];
  setSelectedPreferences: (preferences: string[]) => void;
}

export const DietaryPreferences: React.FC<DietaryPreferencesProps> = ({
  dietaryPreferences,
  selectedPreferences,
  setSelectedPreferences,
}) => {
  const [hoveredPreference, setHoveredPreference] = useState<string | null>(null);

  const togglePreference = (preferenceId: string) => {
    if (selectedPreferences.includes(preferenceId)) {
      setSelectedPreferences(selectedPreferences.filter(p => p !== preferenceId));
    } else if (selectedPreferences.length < 3) {
      setSelectedPreferences([...selectedPreferences, preferenceId]);
    }
  };

  const clearPreferences = () => {
    setSelectedPreferences([]);
  };

  return (
    <div className="card p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-text-light">Ernährungspräferenzen</h2>
        <div className="text-sm text-text-light/70">
          {selectedPreferences.length}/3 ausgewählt
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-4">
        <motion.button
          onClick={clearPreferences}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
            selectedPreferences.length === 0
              ? 'bg-accent text-primary'
              : 'bg-secondary/40 text-text-light hover:bg-secondary/60'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>🚫</span>
          <span>Keine Präferenz</span>
        </motion.button>
        {dietaryPreferences.map((pref) => (
          <motion.button
            key={pref.id}
            onClick={() => togglePreference(pref.id)}
            disabled={selectedPreferences.length >= 3 && !selectedPreferences.includes(pref.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
              selectedPreferences.includes(pref.id)
                ? 'bg-accent text-primary'
                : 'bg-secondary/40 text-text-light hover:bg-secondary/60'
            } ${
              selectedPreferences.length >= 3 && !selectedPreferences.includes(pref.id)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onMouseEnter={() => setHoveredPreference(pref.id)}
            onMouseLeave={() => setHoveredPreference(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{pref.icon}</span>
            <span>{pref.label}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {hoveredPreference && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-text-light/80 mt-2"
          >
            {dietaryPreferences.find(pref => pref.id === hoveredPreference)?.description}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

