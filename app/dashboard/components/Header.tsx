// /app/dashboard/components/Header.tsx
'use client';

import React, { useState } from 'react';
import { Plus, Wallet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onNewTransaction: (transaction: {
    amount: number;
    category: string;
    date: string;
    description?: string;
  }) => void;
}

export default function Header({ onNewTransaction }: HeaderProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    description: '',
    amount: '',
    category: 'food',
    date: new Date().toISOString().split('T')[0]
  });

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    onNewTransaction({
      ...newTransaction,
      amount: parseFloat(newTransaction.amount)
    });
    setIsAddModalOpen(false);
    setNewTransaction({
      description: '',
      amount: '',
      category: 'food',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <div className="space-y-6">
      {/* Main Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent flex items-center gap-2">
            <Wallet className="h-8 w-8 text-[#00BFA5]" />
            Ausgaben-Tracker
          </h1>
          <p className="text-sm text-white/60 mt-1">
            Behalte den Überblick über deine Finanzen
          </p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-2 bg-[#00BFA5] hover:bg-[#00BFA5]/90 text-white px-4 py-2 rounded-lg transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
          <span className="hidden sm:inline">Ausgabe hinzufügen</span>
          <span className="sm:hidden">Hinzufügen</span>
        </motion.button>
      </div>

      {/* Add Transaction Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setIsAddModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#002A20] rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto"
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-white mb-6">Neue Ausgabe</h2>
              
              <form onSubmit={handleAddTransaction} className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1">Beschreibung</label>
                  <input
                    type="text"
                    value={newTransaction.description}
                    onChange={e => setNewTransaction({ ...newTransaction, description: e.target.value })}
                    className="w-full bg-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#00BFA5] focus:outline-none transition-all"
                    placeholder="Wofür war die Ausgabe?"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Betrag</label>
                  <input
                    type="number"
                    step="0.01"
                    value={newTransaction.amount}
                    onChange={e => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                    className="w-full bg-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#00BFA5] focus:outline-none transition-all"
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Kategorie</label>
                  <select
                    value={newTransaction.category}
                    onChange={e => setNewTransaction({ ...newTransaction, category: e.target.value })}
                    className="w-full bg-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#00BFA5] focus:outline-none transition-all"
                  >
                    <option value="food">🛒 Lebensmittel</option>
                    <option value="restaurant">🍽️ Restaurant</option>
                    <option value="coffee">☕ Café & Snacks</option>
                    <option value="other">📝 Sonstiges</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-white/60 mb-1">Datum</label>
                  <input
                    type="date"
                    value={newTransaction.date}
                    onChange={e => setNewTransaction({ ...newTransaction, date: e.target.value })}
                    className="w-full bg-white/10 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-[#00BFA5] focus:outline-none transition-all"
                  />
                </div>

                <div className="flex justify-end gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#00BFA5] text-white hover:bg-[#00BFA5]/90 transition-colors"
                  >
                    Hinzufügen
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}