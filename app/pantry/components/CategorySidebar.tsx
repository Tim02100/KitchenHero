import { useMemo } from 'react';
import { motion } from 'framer-motion';
import type { PantryItem } from '../page';

interface CategorySidebarProps {
  items: PantryItem[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

// Vordefinierte Kategorien mit Icons und Farben
const predefinedCategories = [
  { id: 'vegetables', name: 'Gemüse', icon: '🥬', color: 'bg-green-500' },
  { id: 'fruits', name: 'Obst', icon: '🍎', color: 'bg-red-500' },
  { id: 'dairy', name: 'Milchprodukte', icon: '🥛', color: 'bg-blue-500' },
  { id: 'meat', name: 'Fleisch & Fisch', icon: '🥩', color: 'bg-pink-500' },
  { id: 'grains', name: 'Getreide', icon: '🌾', color: 'bg-yellow-500' },
  { id: 'spices', name: 'Gewürze', icon: '🌶️', color: 'bg-orange-500' },
  { id: 'canned', name: 'Konserven', icon: '🥫', color: 'bg-purple-500' },
  { id: 'drinks', name: 'Getränke', icon: '🥤', color: 'bg-cyan-500' },
  { id: 'snacks', name: 'Snacks', icon: '🍪', color: 'bg-amber-500' },
  { id: 'frozen', name: 'Tiefkühlkost', icon: '❄️', color: 'bg-indigo-500' },
  { id: 'others', name: 'Sonstiges', icon: '📦', color: 'bg-gray-500' }
];

export default function CategorySidebar({ items, selectedCategory, onCategorySelect }: CategorySidebarProps) {
  // Berechne die Anzahl der Items pro Kategorie
  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    items.forEach(item => {
      const count = counts.get(item.category) || 0;
      counts.set(item.category, count + 1);
    });
    return counts;
  }, [items]);

  // Berechne den Gesamtwert aller Items
  const totalItems = items.length;

  return (
    <div className="bg-white/5 rounded-xl p-4">
      <h2 className="text-lg font-semibold text-white mb-4">Kategorien</h2>
      
      {/* "Alle" Kategorie */}
      <button
        onClick={() => onCategorySelect('all')}
        className={`w-full flex items-center justify-between p-3 rounded-lg mb-2 transition-colors ${
          selectedCategory === 'all' 
            ? 'bg-[#00BFA5] text-white' 
            : 'bg-white/5 text-white/80 hover:bg-white/10'
        }`}
      >
        <div className="flex items-center space-x-3">
          <span className="text-xl">📊</span>
          <span>Alle Kategorien</span>
        </div>
        <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
          {totalItems}
        </span>
      </button>

      {/* Kategorie-Liste */}
      <div className="space-y-2">
        {predefinedCategories.map((category) => {
          const count = categoryCounts.get(category.id) || 0;
          const isSelected = selectedCategory === category.id;

          return (
            <motion.button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                isSelected 
                  ? 'bg-[#00BFA5] text-white' 
                  : 'bg-white/5 text-white/80 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-3">
                <span className="text-xl">{category.icon}</span>
                <span>{category.name}</span>
              </div>
              {count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className={`px-2 py-1 rounded-full text-sm ${
                    isSelected ? 'bg-white/20' : `${category.color}/20`
                  }`}
                >
                  {count}
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}