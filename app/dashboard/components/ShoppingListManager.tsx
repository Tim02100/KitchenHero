import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Search, BarChart2, AlertTriangle, Clock, Filter, Package, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ShoppingListModal from './ShoppingListModal';

const kategorien = [
  { name: 'Obst & Gemüse', color: 'bg-green-500', icon: '🥬' },
  { name: 'Milchprodukte', color: 'bg-blue-500', icon: '🥛' },
  { name: 'Fleisch & Fisch', color: 'bg-red-500', icon: '🥩' },
  { name: 'Getränke', color: 'bg-purple-500', icon: '🥤' },
  { name: 'Backwaren', color: 'bg-yellow-500', icon: '🥖' },
  { name: 'Gewürze', color: 'bg-orange-500', icon: '🌶️' },
  { name: 'Konserven', color: 'bg-gray-500', icon: '🥫' },
  { name: 'Süßigkeiten', color: 'bg-pink-500', icon: '🍬' },
  { name: 'Sonstiges', color: 'bg-slate-500', icon: '📦' }
];

export default function EnhancedShoppingList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('category');
  const [expandedCategories, setExpandedCategories] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Lädt gespeicherte Einkaufslisten
  useEffect(() => {
    const savedItems = localStorage.getItem('shoppingList');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    }
  }, []);

  const filteredAndSortedItems = React.useMemo(() => {
    let filtered = items.filter(item =>
      (selectedCategory === 'all' || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return filtered.sort((a, b) => {
      if (sortBy === 'category') return a.category.localeCompare(b.category);
      if (sortBy === 'priority') return b.priority === 'high' ? 1 : -1;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [items, selectedCategory, searchTerm, sortBy]);

  const groupedItems = React.useMemo(() => {
    return filteredAndSortedItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {});
  }, [filteredAndSortedItems]);

  const handleSave = (newItems) => {
    setItems(newItems);
    localStorage.setItem('shoppingList', JSON.stringify(newItems));
  };

  return (
    <div className="premium-card h-[600px] w-full flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-6 border-b border-white/10">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold flex items-center bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent">
            <ShoppingCart className="mr-2 text-[#00BFA5]" />
            Einkaufsliste
          </h2>
          <p className="text-sm sm:text-base text-white/60">
            Verwalte deine Einkäufe smart und effizient
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="bg-[#00BFA5] text-white px-4 py-2 rounded-lg flex items-center text-sm sm:text-base"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
            {isMobile ? 'Hinzufügen' : 'Artikel hinzufügen'}
          </motion.button>
        </div>

        {/* Mobile Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Artikel suchen..."
              className="w-full bg-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/40"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/10 rounded-lg px-3 py-2 text-white text-sm"
            >
              <option value="all">Alle</option>
              {kategorien.map(kat => (
                <option key={kat.name} value={kat.name}>
                  {kat.icon} {isMobile ? '' : kat.name}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white/10 rounded-lg px-3 py-2 text-white text-sm"
            >
              <option value="category">Nach Kategorie</option>
              <option value="priority">Nach Priorität</option>
              <option value="name">Nach Name</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow p-4 sm:p-6 overflow-y-auto">
        <AnimatePresence>
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <motion.div
              key={category}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mb-4"
            >
              <div
                className="premium-card p-3 sm:p-4"
                onClick={() => setExpandedCategories(prev => ({
                  ...prev,
                  [category]: !prev[category]
                }))}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">
                      {kategorien.find(k => k.name === category)?.icon}
                    </span>
                    <span className="font-medium">{category}</span>
                    <span className="text-white/60 text-sm">
                      ({categoryItems.length})
                    </span>
                  </div>
                </div>

                <AnimatePresence>
                  {expandedCategories[category] && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="mt-3 space-y-2 overflow-hidden"
                    >
                      {categoryItems.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
                        >
                          <div className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              checked={item.completed}
                              onChange={() => {
                                const newItems = items.map(i =>
                                  i.id === item.id ? { ...i, completed: !i.completed } : i
                                );
                                handleSave(newItems);
                              }}
                              className="w-4 h-4 rounded border-white/20"
                            />
                            <span className={item.completed ? 'line-through text-white/40' : ''}>
                              {item.name}
                            </span>
                          </div>

                          <div className="flex items-center space-x-2">
                            {item.priority === 'high' && (
                              <AlertTriangle className="w-4 h-4 text-red-500" />
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                const newItems = items.filter(i => i.id !== item.id);
                                handleSave(newItems);
                              }}
                              className="p-1 hover:bg-white/10 rounded"
                            >
                              <X className="w-4 h-4 text-white/60" />
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}

          {Object.keys(groupedItems).length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <Package className="w-16 h-16 text-white/20 mb-4" />
              <p className="text-white/60">Keine Artikel in der Einkaufsliste</p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="p-4 sm:p-6 border-t border-white/10">
        <div className="flex justify-center items-center text-sm text-white/60">
          <span>{items.length} Artikel gesamt</span>
          <span className="mx-2">•</span>
          <span>{items.filter(i => i.completed).length} erledigt</span>
        </div>
      </div>

      {/* Shopping List Modal */}
      <ShoppingListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialItems={items}
      />
    </div>
  );
}