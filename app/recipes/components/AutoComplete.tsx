import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Suggestion {
  id: string | number;
  name: string;
  category?: string;
  icon?: string;
  description?: string;
}

interface AutoCompleteProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (suggestion: Suggestion) => void;
  suggestions: Suggestion[];
  placeholder?: string;
  disabled?: boolean;
  maxSuggestions?: number;
  className?: string;
  highlightFirstSuggestion?: boolean;
  showIcons?: boolean;
}

export default function AutoComplete({
  value,
  onChange,
  onSelect,
  suggestions,
  placeholder = 'Suchen...',
  disabled = false,
  maxSuggestions = 8,
  className = '',
  highlightFirstSuggestion = true,
  showIcons = true,
}: AutoCompleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Filter and sort suggestions based on input
  useEffect(() => {
    if (value.length > 0) {
      const filtered = suggestions
        .filter(suggestion =>
          suggestion.name.toLowerCase().includes(value.toLowerCase()) ||
          suggestion.category?.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, maxSuggestions);
      setFilteredSuggestions(filtered);
      setIsOpen(filtered.length > 0);
      setHighlightedIndex(highlightFirstSuggestion ? 0 : -1);
    } else {
      setFilteredSuggestions([]);
      setIsOpen(false);
      setHighlightedIndex(-1);
    }
  }, [value, suggestions, maxSuggestions, highlightFirstSuggestion]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : prev);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          onSelect(filteredSuggestions[highlightedIndex]);
          setIsOpen(false);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        break;
    }
  };

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-white/10 rounded-xl 
                     text-white placeholder-white/40 focus:border-[#00BFA5]/50 focus:outline-none 
                     transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        />
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
        {value && (
          <button
            onClick={() => {
              onChange('');
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 
                     hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && filteredSuggestions.length > 0 && (
          <motion.div
            ref={suggestionsRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute w-full mt-2 bg-[#002A20] border border-white/10 rounded-xl 
                     shadow-lg overflow-hidden z-50 max-h-80 overflow-y-auto"
          >
            {filteredSuggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion.id || suggestion.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => {
                  onSelect(suggestion);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 flex items-center space-x-3 
                         transition-colors text-left ${
                           index === highlightedIndex
                             ? 'bg-white/10'
                             : 'hover:bg-white/5'
                         }`}
              >
                {showIcons && suggestion.icon && (
                  <span className="text-2xl">{suggestion.icon}</span>
                )}
                <div>
                  <p className="text-white">{suggestion.name}</p>
                  {(suggestion.category || suggestion.description) && (
                    <p className="text-sm text-white/60">
                      {suggestion.category || suggestion.description}
                    </p>
                  )}
                </div>
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}