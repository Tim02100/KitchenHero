import React, { useState, useEffect, useRef } from 'react';
import { Bell, X, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'urgent', message: 'Tomaten laufen in 2 Tagen ab!', timestamp: '5 Minuten' },
    { id: 2, type: 'important', message: '90% des Monatsbudgets verbraucht', timestamp: '1 Stunde' },
    { id: 3, type: 'normal', message: 'Neue Rezeptempfehlung: Sommersalat', timestamp: '3 Stunden' },
    { id: 4, type: 'info', message: 'Tipp: Planen Sie Ihre Mahlzeiten für nächste Woche', timestamp: '1 Tag' },
  ]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'urgent': return 'bg-red-500';
      case 'important': return 'bg-yellow-500';
      case 'normal': return 'bg-blue-500';
      case 'info': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Badge */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-white/10 transition-colors"
      >
        <Bell className="h-6 w-6 text-white" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center text-xs text-white">
            {notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-96 max-h-[80vh] overflow-y-auto bg-[#002A20] rounded-xl shadow-xl border border-white/10"
          >
            <div className="p-4 border-b border-white/10">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">Benachrichtigungen</h3>
                {notifications.length > 0 && (
                  <button 
                    onClick={() => setNotifications([])}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    Alle löschen
                  </button>
                )}
              </div>
            </div>

            <div className="divide-y divide-white/10">
              {notifications.length === 0 ? (
                <div className="p-4 text-center text-white/60">
                  Keine neuen Benachrichtigungen
                </div>
              ) : (
                notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 hover:bg-white/5 transition-colors relative group"
                  >
                    <div className="flex gap-4">
                      <div className={`w-2 h-2 rounded-full mt-2 ${getTypeColor(notification.type)}`} />
                      <div className="flex-1">
                        <p className="text-white">{notification.message}</p>
                        <p className="text-sm text-white/60">vor {notification.timestamp}</p>
                      </div>
                      <button 
                        onClick={() => removeNotification(notification.id)}
                        className="opacity-0 group-hover:opacity-100 transition-opacity text-white/60 hover:text-white"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationDropdown;