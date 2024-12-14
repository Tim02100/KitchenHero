import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Allergy {
  id: string;
  label: string;
  icon: string;
  description: string;
}

interface AllergiesIntolerancesProps {
  allergies: Allergy[];
  selectedAllergies: string[];
  setSelectedAllergies: (allergies: string[]) => void;
}

export const AllergiesIntolerances: React.FC<AllergiesIntolerancesProps> = ({
  allergies,
  selectedAllergies,
  setSelectedAllergies,
}) => {
  const [hoveredAllergy, setHoveredAllergy] = useState<string | null>(null);

  const toggleAllergy = (allergyId: string) => {
    if (selectedAllergies.includes(allergyId)) {
      setSelectedAllergies(selectedAllergies.filter(a => a !== allergyId));
    } else if (selectedAllergies.length < 3) {
      setSelectedAllergies([...selectedAllergies, allergyId]);
    }
  };

  const clearAllergies = () => {
    setSelectedAllergies([]);
  };

  return (
    <div className="card p-6 mb-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-text-light">Allergien & Unverträglichkeiten</h2>
        <div className="text-sm text-text-light/70">
          {selectedAllergies.length}/3 ausgewählt
        </div>
      </div>
      <div className="flex flex-wrap gap-4 mb-4">
        <motion.button
          onClick={clearAllergies}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
            selectedAllergies.length === 0
              ? 'bg-accent text-primary'
              : 'bg-secondary/40 text-text-light hover:bg-secondary/60'
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>🚫</span>
          <span>Keine Allergien</span>
        </motion.button>
        {allergies.map((allergy) => (
          <motion.button
            key={allergy.id}
            onClick={() => toggleAllergy(allergy.id)}
            disabled={selectedAllergies.length >= 3 && !selectedAllergies.includes(allergy.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
              selectedAllergies.includes(allergy.id)
                ? 'bg-accent text-primary'
                : 'bg-secondary/40 text-text-light hover:bg-secondary/60'
            } ${
              selectedAllergies.length >= 3 && !selectedAllergies.includes(allergy.id)
                ? 'opacity-50 cursor-not-allowed'
                : ''
            }`}
            onMouseEnter={() => setHoveredAllergy(allergy.id)}
            onMouseLeave={() => setHoveredAllergy(null)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{allergy.icon}</span>
            <span>{allergy.label}</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {hoveredAllergy && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-text-light/80 mt-2"
          >
            {allergies.find(allergy => allergy.id === hoveredAllergy)?.description}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

