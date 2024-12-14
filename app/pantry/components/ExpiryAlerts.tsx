import { useState } from 'react';
import { AlertTriangle, ChevronDown, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PantryItem } from '../page';

interface ExpiryAlertsProps {
  items: PantryItem[];
}

export default function ExpiryAlerts({ items }: ExpiryAlertsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  // Gruppiere Items nach Ablaufstatus
  const expiringItems = items.filter(item => item.status === 'expiring' || item.status === 'expired');

  // Sortiere nach Ablaufdatum
  const sortedItems = [...expiringItems].sort((a, b) => 
    new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()
  );

  const getStatusColor = (status: 'expired' | 'expiring') => {
    return status === 'expired' ? 'bg-red-500' : 'bg-yellow-500';
  };

  const getDaysUntilExpiry = (date: string) => {
    const today = new Date();
    const expiryDate = new Date(date);
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryText = (date: string) => {
    const days = getDaysUntilExpiry(date);
    if (days < 0) return 'Abgelaufen';
    if (days === 0) return 'Läuft heute ab';
    if (days === 1) return 'Läuft morgen ab';
    return `Läuft in ${days} Tagen ab`;
  };

  if (sortedItems.length === 0) return null;

  return (
    <div className="bg-white/5 rounded-xl p-4 mt-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between mb-4"
      >
        <div className="flex items-center space-x-2 text-white/80">
          <AlertTriangle className="h-5 w-5 text-red-500" />
          <span className="font-medium">Ablaufwarnungen</span>
          <span className="bg-red-500/20 text-red-500 text-xs px-2 py-1 rounded-full">
            {sortedItems.length}
          </span>
        </div>
        <ChevronDown 
          className={`h-5 w-5 text-white/60 transform transition-transform duration-300 ${
            isExpanded ? 'rotate-180' : ''
          }`} 
        />
      </button>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="space-y-2 overflow-hidden"
          >
            {sortedItems.map((item) => (
              <motion.div
                key={item.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                className="bg-white/5 rounded-lg p-3 hover:bg-white/10 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-white">{item.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="h-4 w-4 text-white/60" />
                      <span className={`text-sm ${
                        item.status === 'expired' ? 'text-red-500' : 'text-yellow-500'
                      }`}>
                        {getExpiryText(item.expiryDate)}
                      </span>
                    </div>
                  </div>
                  <div className={`${
                    getStatusColor(item.status)
                  } px-2 py-1 rounded-full text-xs text-white font-medium`}>
                    {item.status === 'expired' ? 'Abgelaufen' : 'Ablaufend'}
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2 text-sm text-white/60">
                  <span>{item.quantity} {item.unit}</span>
                  <span>{item.location}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}