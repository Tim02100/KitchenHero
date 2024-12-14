import React, { useState, useEffect } from 'react';
import { X, Camera, Barcode, Save } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { PantryItem } from '../page';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: Omit<PantryItem, 'id'>) => void;
  editItem?: PantryItem;
}

const predefinedCategories = [
  { id: 'vegetables', name: 'Gemüse', icon: '🥬' },
  { id: 'fruits', name: 'Obst', icon: '🍎' },
  { id: 'dairy', name: 'Milchprodukte', icon: '🥛' },
  { id: 'meat', name: 'Fleisch & Fisch', icon: '🥩' },
  { id: 'grains', name: 'Getreide', icon: '🌾' },
  { id: 'spices', name: 'Gewürze', icon: '🌶️' },
  { id: 'canned', name: 'Konserven', icon: '🥫' },
  { id: 'drinks', name: 'Getränke', icon: '🥤' },
  { id: 'snacks', name: 'Snacks', icon: '🍪' },
  { id: 'frozen', name: 'Tiefkühlkost', icon: '❄️' },
  { id: 'others', name: 'Sonstiges', icon: '📦' }
];

const locations = [
  { id: 'fridge', name: 'Kühlschrank', icon: '❄️' },
  { id: 'freezer', name: 'Gefrierschrank', icon: '🧊' },
  { id: 'pantry', name: 'Vorratskammer', icon: '🗄️' },
  { id: 'shelf', name: 'Regal', icon: '📚' }
];

export default function AddItemModal({ isOpen, onClose, onAdd, editItem }: AddItemModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '1',
    unit: 'Stück',
    category: 'others',
    location: 'pantry',
    expiryDate: '',
    status: 'good',
    notes: '',
    barcode: ''
  });

  useEffect(() => {
    if (editItem) {
      setFormData({
        name: editItem.name,
        quantity: editItem.quantity.toString(),
        unit: editItem.unit,
        category: editItem.category,
        location: editItem.location,
        expiryDate: editItem.expiryDate,
        status: editItem.status,
        notes: editItem.notes || '',
        barcode: editItem.barcode || ''
      });
    }
  }, [editItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      quantity: parseFloat(formData.quantity)
    });
    setFormData({
      name: '',
      quantity: '1',
      unit: 'Stück',
      category: 'others',
      location: 'pantry',
      expiryDate: '',
      status: 'good',
      notes: '',
      barcode: ''
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={e => e.stopPropagation()}
            className="bg-[#002A20] rounded-xl w-full max-w-lg overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/10">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                  {editItem ? 'Artikel bearbeiten' : 'Neuer Artikel'}
                </h2>
                <button
                  onClick={onClose}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Barcode Scanner */}
              <div className="flex gap-4 mb-6">
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg transition-colors"
                >
                  <Camera className="h-5 w-5" />
                  <span>Foto aufnehmen</span>
                </button>
                <button
                  type="button"
                  className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white py-3 rounded-lg transition-colors"
                >
                  <Barcode className="h-5 w-5" />
                  <span>Barcode scannen</span>
                </button>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-sm text-white/60 mb-1">
                  Artikelname*
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-white/10 rounded-lg px-4 py-2 text-white"
                  required
                />
              </div>

              {/* Quantity and Unit */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1">
                    Menge*
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    value={formData.quantity}
                    onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                    className="w-full bg-white/10 rounded-lg px-4 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1">
                    Einheit*
                  </label>
                  <select
                    value={formData.unit}
                    onChange={e => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full bg-white/10 rounded-lg px-4 py-2 text-white"
                    required
                  >
                    <option value="Stück">Stück</option>
                    <option value="g">Gramm</option>
                    <option value="kg">Kilogramm</option>
                    <option value="ml">Milliliter</option>
                    <option value="l">Liter</option>
                    <option value="Packung">Packung</option>
                  </select>
                </div>
              </div>

              {/* Category and Location */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-1">
                    Kategorie*
                  </label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white/10 rounded-lg px-4 py-2 text-white"
                    required
                  >
                    {predefinedCategories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-1">
                    Lagerort*
                  </label>
                  <select
                    value={formData.location}
                    onChange={e => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-white/10 rounded-lg px-4 py-2 text-white"
                    required
                  >
                    {locations.map(loc => (
                      <option key={loc.id} value={loc.id}>
                        {loc.icon} {loc.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Expiry Date */}
              <div>
                <label className="block text-sm text-white/60 mb-1">
                  Ablaufdatum*
                </label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={e => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full bg-white/10 rounded-lg px-4 py-2 text-white"
                  required
                />
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm text-white/60 mb-1">
                  Notizen
                </label>
                <textarea
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-white/10 rounded-lg px-4 py-2 text-white resize-none"
                  rows={3}
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 mt-6 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-lg bg-[#00BFA5] text-white hover:bg-[#00BFA5]/80 transition-colors flex items-center gap-2"
                >
                  <Save className="h-5 w-5" />
                  {editItem ? 'Aktualisieren' : 'Hinzufügen'}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}