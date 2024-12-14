'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coins, PieChart, Receipt } from 'lucide-react';
import BudgetRing from './BudgetRing';
import BudgetDetails from './BudgetDetails';
import CategoryGrid from './CategoryGrid';
import TransactionHistory from './TransactionHistory';
import Header from './Header';
import BudgetSetter from './BudgetSetter';
import Notification from './Notification';

const tabs = [
  { id: 'overview', label: 'Übersicht', icon: Coins },
  { id: 'categories', label: 'Kategorien', icon: PieChart },
  { id: 'transactions', label: 'Transaktionen', icon: Receipt },
];

interface Transaction {
  id: string;
  type: 'expense' | 'income';
  amount: number;
  category: string;
  date: string;
  description?: string;
}

export default function BudgetTracker() {
  const [budget, setBudget] = useState(900);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'warning' | 'tip' } | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  const spent = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    if (spent >= budget * 0.9) {
      setNotification({
        message: '90% des Budgets wurden bereits ausgegeben!',
        type: 'warning'
      });
    } else if (spent >= budget * 0.75) {
      setNotification({
        message: '75% des Budgets wurden ausgegeben.',
        type: 'tip'
      });
    }
  }, [transactions, budget, spent]);

  const handleBudgetSet = (newBudget: number) => {
    setBudget(newBudget);
    setNotification({
      message: 'Budget wurde erfolgreich aktualisiert!',
      type: 'success'
    });
  };

  const handleNewTransaction = (transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transactionData,
      id: Date.now().toString(),
      type: 'expense'
    };

    setTransactions(prev => [newTransaction, ...prev]);
    setNotification({
      message: 'Transaktion wurde hinzugefügt!',
      type: 'success'
    });
  };

  const handleDeleteTransaction = (id: string) => {
    setTransactions(prevTransactions => 
      prevTransactions.filter(t => t.id !== id)
    );
    setNotification({
      message: 'Transaktion wurde gelöscht',
      type: 'success'
    });
  };

  return (
    <div className="premium-card w-full max-w-4xl mx-auto">
      <div className="p-4">
        <Header onNewTransaction={handleNewTransaction} />
        
        <div className="mt-4">
          <BudgetSetter currentBudget={budget} onBudgetSet={handleBudgetSet} />
        </div>

        <div className="mt-4">
          <div className="flex bg-white/5 p-0.5 rounded-lg">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center justify-center flex-1 gap-1 px-2 py-1.5 rounded-md text-xs transition-all duration-300 ${
                    isActive 
                      ? 'bg-[#00BFA5] text-white' 
                      : 'text-white/60 hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="whitespace-nowrap hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'overview' && (
                <div className="flex flex-col items-center sm:flex-row sm:items-start sm:justify-center">
                  <div className="w-[60vw] max-w-[300px] aspect-square mb-6 sm:mb-0 sm:mr-6">
                    <BudgetRing budget={budget} spent={spent} />
                  </div>
                  <div className="w-full sm:w-1/2">
                    <BudgetDetails budget={budget} spent={spent} />
                  </div>
                </div>
              )}
              {activeTab === 'categories' && (
                <CategoryGrid transactions={transactions} />
              )}
              {activeTab === 'transactions' && (
                <TransactionHistory 
                  transactions={transactions} 
                  onDeleteTransaction={handleDeleteTransaction}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
        />
      )}
    </div>
  );
}

