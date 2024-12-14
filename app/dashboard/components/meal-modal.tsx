import { useState, useEffect } from 'react'
import { X, Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface MealModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (meal: { name: string; portions: number; ingredients: string[]; notes: string }) => void
  initialMeal?: { name: string; portions: number; ingredients: string[]; notes: string }
}

export function MealModal({ isOpen, onClose, onSave, initialMeal }: MealModalProps) {
  const [name, setName] = useState(initialMeal?.name || '')
  const [portions, setPortions] = useState(initialMeal?.portions || 2)
  const [ingredients, setIngredients] = useState(initialMeal?.ingredients || [''])
  const [notes, setNotes] = useState(initialMeal?.notes || '')

  useEffect(() => {
    if (isOpen) {
      setName(initialMeal?.name || '')
      setPortions(initialMeal?.portions || 2)
      setIngredients(initialMeal?.ingredients || [''])
      setNotes(initialMeal?.notes || '')
    }
  }, [isOpen, initialMeal])

  const handleSave = () => {
    onSave({ name, portions, ingredients: ingredients.filter(i => i.trim() !== ''), notes })
    onClose()
  }

  const addIngredient = () => setIngredients([...ingredients, ''])
  const removeIngredient = (index: number) => setIngredients(ingredients.filter((_, i) => i !== index))
  const updateIngredient = (index: number, value: string) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = value
    setIngredients(newIngredients)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-primary rounded-lg p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-white">{initialMeal ? 'Mahlzeit bearbeiten' : 'Mahlzeit hinzufügen'}</h3>
              <button onClick={onClose} className="text-white/60 hover:text-white transition-colors duration-300">
                <X className="h-6 w-6" />
              </button>
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Mahlzeit Name"
              className="w-full p-2 mb-4 bg-white/10 rounded text-white placeholder-white/60"
            />
            <div className="flex items-center mb-4">
              <label className="mr-2 text-white">Portionen:</label>
              <button onClick={() => setPortions(Math.max(1, portions - 1))} className="p-1 bg-white/10 rounded text-white hover:bg-white/20 transition-colors duration-300">
                <Minus className="h-4 w-4" />
              </button>
              <input
                type="number"
                value={portions}
                onChange={(e) => setPortions(Math.max(1, parseInt(e.target.value)))}
                min="1"
                className="w-16 p-2 mx-2 text-center bg-white/10 rounded text-white"
              />
              <button onClick={() => setPortions(portions + 1)} className="p-1 bg-white/10 rounded text-white hover:bg-white/20 transition-colors duration-300">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-white">Zutaten:</label>
              {ingredients.map((ingredient, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={ingredient}
                    onChange={(e) => updateIngredient(index, e.target.value)}
                    placeholder="Zutat"
                    className="flex-grow p-2 bg-white/10 rounded-l text-white placeholder-white/60"
                  />
                  <button onClick={() => removeIngredient(index)} className="p-2 bg-white/20 rounded-r text-white hover:bg-white/30 transition-colors duration-300">
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              <button onClick={addIngredient} className="w-full p-2 bg-white/10 rounded text-white hover:bg-white/20 transition-colors duration-300">
                Zutat hinzufügen
              </button>
            </div>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Notizen"
              className="w-full p-2 mb-4 bg-white/10 rounded text-white placeholder-white/60"
              rows={3}
            />
            <button
              onClick={handleSave}
              className="w-full p-2 bg-[#00BFA5] text-primary rounded hover:bg-[#00BFA5]/80 transition-colors duration-300"
            >
              Speichern
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

