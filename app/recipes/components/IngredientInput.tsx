"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Search, Tag, ChevronDown } from 'lucide-react';
import { Ingredient, commonIngredients, categories, getSuggestedIngredients } from '../../types/ingredients';

interface IngredientInputProps {
  ingredients: string[];
  setIngredients: (ingredients: string[]) => void;
}

export const IngredientInput: React.FC<IngredientInputProps> = ({ ingredients, setIngredients }) => {
  const [currentInput, setCurrentInput] = useState('');
  const [suggestions, setSuggestions] = useState<Ingredient[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentInput.length > 0) {
      const filtered = commonIngredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(currentInput.toLowerCase()) ||
        ingredient.category.toLowerCase().includes(currentInput.toLowerCase()) ||
        ingredient.tags?.some(tag => tag.toLowerCase().includes(currentInput.toLowerCase()))
      );
      setSuggestions(filtered.slice(0, 8)); // Begrenzen auf 8 Vorschläge für bessere Übersicht
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [currentInput]);

  const handleIngredientAdd = (ingredientName: string) => {
    if (!ingredients.includes(ingredientName)) {
      setIngredients([...ingredients, ingredientName]);
      setCurrentInput('');
      setSuggestions([]);
      inputRef.current?.focus();
    }
  };

  const handleIngredientRemove = (ingredient: string) => {
    setIngredients(ingredients.filter(i => i !== ingredient));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      handleIngredientAdd(currentInput.trim());
    }
  };

  // Sortiere häufig verwendete Zutaten nach Kategorien
  const quickAddIngredients = Object.values(categories).reduce((acc, category) => {
    const categoryIngredients = commonIngredients
      .filter(ing => ing.category === category)
      .slice(0, 4); // Nehme die ersten 4 Zutaten jeder Kategorie
    if (categoryIngredients.length > 0) {
      acc[category] = categoryIngredients;
    }
    return acc;
  }, {} as Record<string, Ingredient[]>);

  return (
    <div className="space-y-6">
      {/* Header mit Animation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent">
          Deine Zutaten
        </h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowQuickAdd(!showQuickAdd)}
          className="flex items-center space-x-2 text-sm text-white/60 hover:text-white transition-colors"
        >
          <Tag className="w-4 h-4" />
          <span>Häufige Zutaten</span>
          <ChevronDown 
            className={`w-4 h-4 transform transition-transform duration-300 ${
              showQuickAdd ? 'rotate-180' : ''
            }`}
          />
        </motion.button>
      </motion.div>

      {/* Eingabefeld mit Autovervollständigung */}
      <div className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Zutat eingeben..."
            className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-white/10 rounded-xl 
                     text-white placeholder-white/40 focus:border-[#00BFA5]/50 focus:outline-none 
                     transition-all duration-300"
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
          {currentInput && (
            <button
              onClick={() => setCurrentInput('')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 
                       hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Vorschlagsliste */}
        <AnimatePresence>
          {showSuggestions && suggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute w-full mt-2 bg-[#002A20] border border-white/10 rounded-xl 
                       shadow-lg overflow-hidden z-50"
            >
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={suggestion.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleIngredientAdd(suggestion.name)}
                  className="w-full px-4 py-3 flex items-center space-x-3 hover:bg-white/5 
                           transition-colors text-left"
                >
                  <span className="text-2xl">{suggestion.icon}</span>
                  <div>
                    <p className="text-white">{suggestion.name}</p>
                    <p className="text-sm text-white/60">{suggestion.category}</p>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Quick Add Section */}
      <AnimatePresence>
        {showQuickAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div className="space-y-4">
              {Object.entries(quickAddIngredients).map(([category, categoryIngredients]) => (
                <div key={category} className="bg-white/5 rounded-xl p-4 border border-white/10">
                  <h3 className="text-sm text-white/60 mb-3">{category}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {categoryIngredients.map((ingredient) => (
                      <motion.button
                        key={ingredient.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => handleIngredientAdd(ingredient.name)}
                        disabled={ingredients.includes(ingredient.name)}
                        className={`p-2 rounded-lg flex items-center justify-center space-x-2 
                                 transition-all duration-300 ${
                                   ingredients.includes(ingredient.name)
                                     ? 'bg-[#00BFA5]/20 text-white/40 cursor-not-allowed'
                                     : 'bg-white/10 hover:bg-white/20 text-white'
                                 }`}
                      >
                        <span className="text-xl">{ingredient.icon}</span>
                        <span className="text-sm">{ingredient.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Zutatenliste */}
      <motion.div 
        layout
        className="flex flex-wrap gap-2"
      >
        <AnimatePresence>
          {ingredients.map((ingredient) => {
            const ingredientData = commonIngredients.find(i => i.name === ingredient);
            return (
              <motion.div
                key={ingredient}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="bg-[#00BFA5]/20 text-white px-3 py-1.5 rounded-full flex items-center space-x-2"
              >
                {ingredientData && <span>{ingredientData.icon}</span>}
                <span>{ingredient}</span>
                <button
                  onClick={() => handleIngredientRemove(ingredient)}
                  className="hover:text-[#00BFA5] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Hilfetexte */}
      {ingredients.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/60 text-sm text-center"
        >
          Füge Zutaten hinzu, die du verwenden möchtest
        </motion.p>
      )}
    </div>
  );
};