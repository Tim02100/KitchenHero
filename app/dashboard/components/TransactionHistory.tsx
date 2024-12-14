import { useState } from 'react';
import { Clock, Filter, Search, ChevronDown, Trash2 } from 'lucide-react';

interface Transaction {
  id: string;
  type: 'expense' | 'income';
  amount: number;
  category: string;
  date: string;
  description?: string;
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  onDeleteTransaction?: (id: string) => void;
}

const categoryIcons = {
  food: '🛒',
  restaurant: '🍽️',
  coffee: '☕',
  other: '📝'
};

const categoryNames = {
  food: 'Lebensmittel',
  restaurant: 'Restaurant',
  coffee: 'Café & Snacks',
  other: 'Sonstiges'
};

export default function TransactionHistory({ transactions, onDeleteTransaction }: TransactionHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filteredTransactions = transactions
    .filter(transaction => 
      (selectedCategory === 'all' || transaction.category === selectedCategory) &&
      (transaction.description?.toLowerCase().includes(searchTerm.toLowerCase()) || 
       categoryNames[transaction.category as keyof typeof categoryNames].toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

  const handleDelete = (id: string) => {
    if (deleteConfirmId === id) {
      onDeleteTransaction?.(id);
      setDeleteConfirmId(null);
    } else {
      setDeleteConfirmId(id);
      setTimeout(() => setDeleteConfirmId(null), 3000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <Clock className="w-6 h-6 mr-2 text-[#00BFA5]" />
          Transaktionsverlauf
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-all duration-300"
          >
            <ChevronDown className={`w-5 h-5 transform transition-transform ${sortOrder === 'asc' ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Transaktion suchen..."
            className="w-full bg-white/10 rounded-lg pl-10 pr-4 py-2 text-white placeholder-white/40"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
        </div>
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white/10 rounded-lg px-10 py-2 text-white appearance-none cursor-pointer"
          >
            <option value="all">Alle Kategorien</option>
            {Object.entries(categoryNames).map(([id, name]) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </select>
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
        </div>
      </div>

      <div className="space-y-2">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-8 text-white/60">
            Keine Transaktionen gefunden
          </div>
        ) : (
          filteredTransactions.map((transaction) => (
            <div 
              key={transaction.id}
              className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-[#00BFA5]/20 flex items-center justify-center text-lg">
                    {categoryIcons[transaction.category as keyof typeof categoryIcons]}
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {transaction.description || categoryNames[transaction.category as keyof typeof categoryNames]}
                    </div>
                    <div className="text-sm text-white/60">
                      {new Date(transaction.date).toLocaleDateString('de-DE', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium text-white">
                      {transaction.type === 'expense' ? '-' : '+'}{transaction.amount.toFixed(2)} €
                    </div>
                    <div className="text-sm text-white/60">
                      {categoryNames[transaction.category as keyof typeof categoryNames]}
                    </div>
                  </div>
                  {onDeleteTransaction && (
                    <button
                      onClick={() => handleDelete(transaction.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        deleteConfirmId === transaction.id 
                          ? 'bg-red-500/20 text-red-500' 
                          : 'hover:bg-white/10 text-white/60'
                      }`}
                      title={deleteConfirmId === transaction.id ? "Zum Bestätigen nochmal klicken" : "Löschen"}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}