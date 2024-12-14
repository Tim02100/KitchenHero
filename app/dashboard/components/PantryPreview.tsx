import { useState } from 'react';
import { Archive, Plus, Search, BarChart2, AlertTriangle, Clock, Filter, Package, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function PantryPreview() {
  const [items, setItems] = useState([
    { id: 1, name: 'Nudeln', quantity: 2, unit: 'Packung', status: 'good', expiryDays: 120, category: 'Vorrat' },
    { id: 2, name: 'Tomaten', quantity: 4, unit: 'Stück', status: 'expiring', expiryDays: 2, category: 'Gemüse' },
    { id: 3, name: 'Käse', quantity: 1, unit: 'Stück', status: 'low', expiryDays: 5, category: 'Milchprodukte' },
    { id: 4, name: 'Milch', quantity: 1, unit: 'Liter', status: 'good', expiryDays: 7, category: 'Milchprodukte' },
    { id: 5, name: 'Brot', quantity: 1, unit: 'Stück', status: 'expiring', expiryDays: 1, category: 'Backwaren' },
    { id: 6, name: 'Eier', quantity: 6, unit: 'Stück', status: 'good', expiryDays: 14, category: 'Sonstiges' },
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);

  const getStatusColor = (status, type: 'bg' | 'text' = 'bg') => {
    const colors = {
      expiring: type === 'bg' ? 'bg-red-500/20' : 'text-red-500',
      low: type === 'bg' ? 'bg-yellow-500/20' : 'text-yellow-500',
      good: type === 'bg' ? 'bg-[#00BFA5]/20' : 'text-[#00BFA5]'
    };
    return colors[status] || (type === 'bg' ? 'bg-white/10' : 'text-white');
  };

  const filteredItems = items
    .filter(item => filter === 'all' || item.status === filter)
    .filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(item => selectedCategory === 'all' || item.category === selectedCategory);

  const categories = ['all', ...new Set(items.map(item => item.category))];
  
  const stats = {
    total: items.length,
    expiring: items.filter(item => item.status === 'expiring').length,
    low: items.filter(item => item.status === 'low').length
  };

  return (
    <div className="premium-card min-h-[600px]">
      {/* Header Section */}
      <div className="p-6 border-b border-white/10">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold flex items-center bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent">
            <Package className="mr-2 text-[#00BFA5]" />
            Vorratsübersicht
          </h2>
          <Link
            href="/pantry"
            className="bg-[#00BFA5] hover:bg-[#00BFA5]/80 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center"
          >
            <Plus className="h-5 w-5 mr-2" />
            Artikel hinzufügen
          </Link>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Gesamt</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <Package className="h-8 w-8 text-[#00BFA5]" />
          </div>
          <div className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Ablaufend</p>
              <p className="text-2xl font-bold text-red-500">{stats.expiring}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-red-500" />
          </div>
          <div className="bg-white/5 rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Niedriger Bestand</p>
              <p className="text-2xl font-bold text-yellow-500">{stats.low}</p>
            </div>
            <BarChart2 className="h-8 w-8 text-yellow-500" />
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-wrap gap-4">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Artikel suchen..."
              className="w-full bg-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/40"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white/10 rounded-lg px-4 py-2 text-white"
          >
            <option value="all">Alle Kategorien</option>
            {categories.filter(c => c !== 'all').map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-white/10 rounded-lg px-4 py-2 text-white"
          >
            <option value="all">Alle Status</option>
            <option value="expiring">Ablaufend</option>
            <option value="low">Niedriger Bestand</option>
            <option value="good">Ausreichend</option>
          </select>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-white">{item.name}</h3>
                    <p className="text-sm text-white/60">{item.category}</p>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status, 'bg')} ${getStatusColor(item.status, 'text')}`}>
                    {item.status === 'expiring' ? 'Läuft ab' : 
                     item.status === 'low' ? 'Nachkaufen' : 'OK'}
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-sm text-white/60">
                  <span>{item.quantity} {item.unit}</span>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{item.expiryDays} Tage</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-12">
              <Package className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">Keine Artikel gefunden</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer Section */}
      <div className="px-6 py-4 border-t border-white/10">
        <Link 
          href="/pantry" 
          className="text-[#00BFA5] hover:text-[#00BFA5]/80 transition-colors inline-flex items-center"
        >
          Zur vollständigen Übersicht
          <Package className="h-4 w-4 ml-2" />
        </Link>
      </div>
    </div>
  );
}