'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Search, Check, AlertTriangle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ShoppingListModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (items: any[]) => void;
  initialItems?: any[];
}

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

export default function ShoppingListModal({ isOpen, onClose, onSave, initialItems = [] }: ShoppingListModalProps) {
  const [items, setItems] = useState(initialItems);
  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
    unit: '',
    category: 'Sonstiges',
    priority: 'normal',
    notes: '',
    completed: false
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const modalRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setItems(initialItems);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen, initialItems]);

  const addItem = () => {
    if (newItem.name.trim() === '') return;
    
    const newItemWithDetails = {
      ...newItem,
      id: Date.now(),
      icon: kategorien.find(k => k.name === newItem.category)?.icon
    };
    
    setItems([...items, newItemWithDetails]);
    setNewItem({
      name: '',
      quantity: '',
      unit: '',
      category: 'Sonstiges',
      priority: 'normal',
      notes: '',
      completed: false
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-[999]"
          onClick={onClose}
        >
          <motion.div
            ref={modalRef}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 500 }}
            onClick={e => e.stopPropagation()}
            className="w-full sm:w-[95%] max-w-lg bg-[#002A20] rounded-t-2xl sm:rounded-xl sm:my-8 flex flex-col"
            style={{
              height: isMobile ? 'calc(100vh - 70px)' : 'auto',
              maxHeight: isMobile ? 'calc(100vh - 70px)' : '85vh',
              marginBottom: isMobile ? '0' : 'auto'
            }}
          >
          >
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-white/10 flex justify-between items-center bg-[#002A20] sticky top-0 z-10">
              <h2 className="text-xl font-bold text-white">Artikel hinzufügen</h2>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="h-6 w-6 text-white/60" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 sm:p-6 space-y-6">
                {/* Name und Menge */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Artikel</label>
                    <input
                      type="text"
                      value={newItem.name}
                      onChange={e => setNewItem({ ...newItem, name: e.target.value })}
                      placeholder="Name des Artikels"
                      className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Menge</label>
                      <input
                        type="number"
                        value={newItem.quantity}
                        onChange={e => setNewItem({ ...newItem, quantity: e.target.value })}
                        placeholder="0"
                        className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-white/60 mb-2">Einheit</label>
                      <select
                        value={newItem.unit}
                        onChange={e => setNewItem({ ...newItem, unit: e.target.value })}
                        className="w-full bg-white/10 rounded-lg px-4 py-3 text-white"
                      >
                        <option value="">Wählen</option>
                        <option value="Stück">Stück</option>
                        <option value="kg">kg</option>
                        <option value="g">g</option>
                        <option value="l">l</option>
                        <option value="ml">ml</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Kategorie */}
                <div>
                  <label className="block text-sm text-white/60 mb-2">Kategorie</label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    {kategorien.map(kat => (
                      <button
                        key={kat.name}
                        type="button"
                        onClick={() => setNewItem({ ...newItem, category: kat.name })}
                        className={`flex flex-col items-center p-3 rounded-lg transition-colors ${
                          newItem.category === kat.name
                            ? 'bg-[#00BFA5] text-white'
                            : 'bg-white/10 hover:bg-white/20 text-white/60'
                        }`}
                      >
                        <span className="text-2xl mb-1">{kat.icon}</span>
                        <span className="text-xs text-center">{kat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Priorität */}
                <div>
                  <label className="block text-sm text-white/60 mb-2">Priorität</label>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setNewItem({ ...newItem, priority: 'normal' })}
                      className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${
                        newItem.priority === 'normal'
                          ? 'bg-[#00BFA5] text-white'
                          : 'bg-white/10 text-white/60'
                      }`}
                    >
                      <Clock className="w-5 h-5" />
                      <span>Normal</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewItem({ ...newItem, priority: 'high' })}
                      className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${
                        newItem.priority === 'high'
                          ? 'bg-red-500 text-white'
                          : 'bg-white/10 text-white/60'
                      }`}
                    >
                      <AlertTriangle className="w-5 h-5" />
                      <span>Wichtig</span>
                    </button>
                  </div>
                </div>

                {/* Notizen */}
                <div>
                  <label className="block text-sm text-white/60 mb-2">Notizen</label>
                  <textarea
                    value={newItem.notes}
                    onChange={e => setNewItem({ ...newItem, notes: e.target.value })}
                    placeholder="Optionale Notizen zum Artikel..."
                    className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 resize-none h-24"
                  />
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 pb-4 sm:pb-0">
                  <button
                    type="button"
                    onClick={onClose}
                    className="order-2 sm:order-1 py-3 px-6 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors text-center"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      addItem();
                      onSave(items);
                    }}
                    disabled={!newItem.name}
                    className="order-1 sm:order-2 flex-1 py-3 px-6 rounded-lg bg-[#00BFA5] text-white hover:bg-[#00BFA5]/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Plus className="w-5 h-5" />
                    Hinzufügen
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}