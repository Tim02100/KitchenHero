import { useState } from 'react';
import { Plus, Trash2, ArrowRight, DollarSign, UserPlus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Purchase {
  id: number;
  description: string;
  amount: number;
  splitPercentage: number;
}

export default function Kostenteiler() {
  const [partner1, setPartner1] = useState('');
  const [partner2, setPartner2] = useState('');
  const [isSettingPartners, setIsSettingPartners] = useState(false);
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [newPurchase, setNewPurchase] = useState({ 
    description: '', 
    amount: '', 
    splitPercentage: '50' 
  });

  const addPurchase = () => {
    if (newPurchase.description && newPurchase.amount) {
      setPurchases([...purchases, {
        id: Date.now(),
        description: newPurchase.description,
        amount: parseFloat(newPurchase.amount),
        splitPercentage: parseFloat(newPurchase.splitPercentage)
      }]);
      setNewPurchase({ description: '', amount: '', splitPercentage: '50' });
    }
  };

  const removePurchase = (id: number) => {
    setPurchases(purchases.filter(purchase => purchase.id !== id));
  };

  const calculateTotals = () => {
    let total = 0;
    let partner1Total = 0;
    let partner2Total = 0;

    purchases.forEach(purchase => {
      total += purchase.amount;
      partner1Total += purchase.amount * (purchase.splitPercentage / 100);
      partner2Total += purchase.amount * ((100 - purchase.splitPercentage) / 100);
    });

    return { total, partner1Total, partner2Total };
  };

  const { total, partner1Total, partner2Total } = calculateTotals();

  return (
    <div className="h-full premium-card">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent flex items-center">
                <DollarSign className="mr-2 text-[#00BFA5]" /> Kostenmanager
              </h2>
              <p className="text-sm text-white/60 ml-8">Teile Ausgaben einfach und fair auf</p>
            </div>
            <button 
              onClick={() => setIsSettingPartners(true)}
              className="bg-[#00BFA5] hover:bg-[#00BFA5]/80 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              <span>Partner festlegen</span>
            </button>
          </div>
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Neue Ausgabe */}
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-6">
              Neue Ausgabe
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-white/60 block">Beschreibung</label>
                  <input
                    type="text"
                    value={newPurchase.description}
                    onChange={(e) => setNewPurchase({...newPurchase, description: e.target.value})}
                    placeholder="Was wurde gekauft?"
                    className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-white/60 block">Betrag</label>
                  <div className="relative">
                    <input
                      type="number"
                      value={newPurchase.amount}
                      onChange={(e) => setNewPurchase({...newPurchase, amount: e.target.value})}
                      placeholder="0.00"
                      className="w-full bg-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 pr-12"
                    />
                    <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60">€</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white/60 block">Aufteilung</label>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="flex justify-between text-sm text-white/80 mb-2">
                    <span>{partner1 || 'Partner 1'}: {newPurchase.splitPercentage}%</span>
                    <span>{partner2 || 'Partner 2'}: {100 - parseInt(newPurchase.splitPercentage)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={newPurchase.splitPercentage}
                    onChange={(e) => setNewPurchase({...newPurchase, splitPercentage: e.target.value})}
                    className="w-full accent-[#00BFA5]"
                  />
                  <div className="flex justify-between mt-2">
                    <div className="h-1 w-1 rounded-full bg-white/20"></div>
                    <div className="h-1 w-1 rounded-full bg-white/20"></div>
                    <div className="h-1 w-1 rounded-full bg-white/20"></div>
                  </div>
                </div>
              </div>

              <button
                onClick={addPurchase}
                disabled={!newPurchase.description || !newPurchase.amount}
                className="w-full bg-[#00BFA5] hover:bg-[#00BFA5]/80 disabled:bg-white/10 
                          disabled:cursor-not-allowed text-white rounded-lg py-3 
                          transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="h-5 w-5" />
                Ausgabe hinzufügen
              </button>
            </div>
          </div>

          {/* Ausgabenliste */}
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-white/80 uppercase tracking-wider mb-4">
              Ausgabenliste
            </h3>
            <div className="space-y-2">
              <AnimatePresence>
                {purchases.map(purchase => (
                  <motion.div
                    key={purchase.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white/10 rounded-lg p-3 flex items-center justify-between group hover:bg-white/20 transition-all duration-300"
                  >
                    <div className="flex-grow">
                      <div className="flex items-center">
                        <span className="text-white font-medium">{purchase.description}</span>
                        <ArrowRight className="mx-2 h-4 w-4 text-white/40" />
                        <span className="text-[#00BFA5] font-medium">{purchase.amount.toFixed(2)} €</span>
                      </div>
                      <div className="text-xs text-white/60 mt-1">
                        {partner1 || 'Partner 1'}: {purchase.splitPercentage}% / {partner2 || 'Partner 2'}: {100 - purchase.splitPercentage}%
                      </div>
                    </div>
                    <button
                      onClick={() => removePurchase(purchase.id)}
                      className="text-white/40 hover:text-red-500 transition-colors p-2 opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
              {purchases.length === 0 && (
                <div className="text-center text-white/40 py-6">
                  Noch keine Ausgaben hinzugefügt
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Summary Footer */}
        <div className="p-6 border-t border-white/10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white/10 rounded-xl p-4 flex flex-col">
              <span className="text-xs text-white/60 uppercase tracking-wider mb-1">Gesamt</span>
              <span className="text-2xl font-bold text-[#00BFA5]">{total.toFixed(2)} €</span>
            </div>
            <div className="bg-white/10 rounded-xl p-4 flex flex-col">
              <span className="text-xs text-white/60 uppercase tracking-wider mb-1">{partner1 || 'Partner 1'}</span>
              <span className="text-2xl font-bold text-[#00BFA5]">{partner1Total.toFixed(2)} €</span>
            </div>
            <div className="bg-white/10 rounded-xl p-4 flex flex-col">
              <span className="text-xs text-white/60 uppercase tracking-wider mb-1">{partner2 || 'Partner 2'}</span>
              <span className="text-2xl font-bold text-[#00BFA5]">{partner2Total.toFixed(2)} €</span>
            </div>
          </div>
        </div>
      </div>

      {/* Partner Setup Modal */}
      <AnimatePresence>
        {isSettingPartners && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={() => setIsSettingPartners(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#002A20] rounded-xl p-6 w-full max-w-md m-4"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-white">Partner festlegen</h3>
                <button 
                  onClick={() => setIsSettingPartners(false)}
                  className="text-white/60 hover:text-white"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-white/60 block mb-2">Partner 1</label>
                  <input
                    type="text"
                    value={partner1}
                    onChange={(e) => setPartner1(e.target.value)}
                    placeholder="Name eingeben"
                    className="w-full bg-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/60 block mb-2">Partner 2</label>
                  <input
                    type="text"
                    value={partner2}
                    onChange={(e) => setPartner2(e.target.value)}
                    placeholder="Name eingeben"
                    className="w-full bg-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40"
                  />
                </div>
                <button
                  onClick={() => setIsSettingPartners(false)}
                  className="w-full bg-[#00BFA5] hover:bg-[#00BFA5]/80 text-white rounded-lg px-4 py-2 mt-4"
                >
                  Bestätigen
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}