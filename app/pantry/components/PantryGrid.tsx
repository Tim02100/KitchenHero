import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit2, Trash2, AlertTriangle, Clock, Package, BarChart2 } from 'lucide-react';
import type { PantryItem } from '../page';

interface PantryGridProps {
  items: PantryItem[];
  view: 'grid' | 'list';
  onUpdate: (id: string, updates: Partial<PantryItem>) => void;
  onDelete: (id: string) => void;
}

const PantryGrid: React.FC<PantryGridProps> = ({ items, view, onUpdate, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'expired':
        return 'bg-red-500';
      case 'expiring':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-orange-500';
      default:
        return 'bg-[#00BFA5]';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'expired':
        return 'Abgelaufen';
      case 'expiring':
        return 'Läuft bald ab';
      case 'low':
        return 'Niedriger Bestand';
      default:
        return 'Gut';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className={`grid gap-4 ${
        view === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
          : 'grid-cols-1'
      }`}
    >
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            layout
            className={`bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300 ${
              view === 'list' ? 'flex items-center justify-between' : ''
            }`}
          >
            <div className={`flex ${view === 'list' ? 'flex-row items-center flex-1' : 'flex-col'}`}>
              <div className={`flex items-center ${view === 'list' ? 'w-1/4' : 'mb-4'}`}>
                <div className={`${getStatusColor(item.status)} w-2 h-2 rounded-full mr-2`} />
                <h3 className="font-medium text-white">{item.name}</h3>
              </div>

              <div className={`${view === 'list' ? 'flex items-center justify-between flex-1' : ''}`}>
                <div className={`text-white/60 text-sm ${view === 'list' ? 'w-1/4' : 'mb-2'}`}>
                  <span className="font-medium">{item.quantity}</span> {item.unit}
                </div>

                <div className={`flex items-center text-sm ${view === 'list' ? 'w-1/4' : 'mb-4'}`}>
                  <Clock className="w-4 h-4 mr-1 text-white/40" />
                  <span className="text-white/60">{formatDate(item.expiryDate)}</span>
                </div>

                <div className={`flex items-center ${view === 'list' ? 'w-1/4 justify-end' : 'justify-between'}`}>
                  <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(item.status)}/20 ${getStatusColor(item.status).replace('bg-', 'text-')}`}>
                    {getStatusText(item.status)}
                  </span>
                  
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => onUpdate(item.id, {})} 
                      className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4 text-white/60" />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-white/60" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {items.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="col-span-full flex flex-col items-center justify-center py-12 text-white/60"
        >
          <Package className="w-16 h-16 mb-4" />
          <p className="text-lg">Keine Artikel gefunden</p>
          <p className="text-sm">Füge neue Artikel hinzu oder passe deine Filter an</p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PantryGrid;