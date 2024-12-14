// /app/dashboard/components/BudgetSetter.tsx
'use client';

import { useState } from 'react';
import { Save, Edit2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BudgetSetterProps {
  currentBudget: number;
  onBudgetSet: (newBudget: number) => void;
}

export default function BudgetSetter({ currentBudget, onBudgetSet }: BudgetSetterProps) {
  const [budget, setBudget] = useState(currentBudget.toString());
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBudget = parseFloat(budget);
    if (!isNaN(newBudget) && newBudget > 0) {
      onBudgetSet(newBudget);
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="mb-6 flex items-center justify-between">
        <div>
          <span className="text-white/60 text-sm">Monatsbudget</span>
          <div className="text-2xl font-bold text-white">
            {currentBudget.toFixed(2)} €
          </div>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="text-[#00BFA5] hover:text-[#00BFA5]/80 transition-colors p-2 hover:bg-[#00BFA5]/10 rounded-lg"
        >
          <Edit2 className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="bg-white/5 rounded-lg p-4">
        <label className="block text-sm text-white/60 mb-2">
          Neues Monatsbudget festlegen
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-grow">
            <input
              type="number"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-white/10 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00BFA5]"
              min="0"
              step="0.01"
              placeholder="0.00"
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60">
              €
            </span>
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-[#00BFA5] text-white px-4 py-2 rounded-lg hover:bg-[#00BFA5]/90 transition-colors w-full sm:w-auto"
            >
              <span className="hidden sm:inline">Speichern</span>
              <Save className="w-5 h-5 sm:hidden" />
            </button>
            <button
              type="button"
              onClick={() => {
                setBudget(currentBudget.toString());
                setIsEditing(false);
              }}
              className="bg-white/10 text-white px-4 py-2 rounded-lg hover:bg-white/20 transition-colors w-full sm:w-auto"
            >
              <span className="hidden sm:inline">Abbrechen</span>
              <span className="sm:hidden">×</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}