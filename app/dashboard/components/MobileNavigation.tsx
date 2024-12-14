'use client';

import { Calendar, ShoppingCart, PieChart, DollarSign, Package } from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileNavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function MobileNavigation({ activeSection, onSectionChange }: MobileNavigationProps) {
  const navItems = [
    { id: 'planner', label: 'Planer', icon: Calendar },
    { id: 'shopping', label: 'Einkauf', icon: ShoppingCart },
    { id: 'budget', label: 'Budget', icon: PieChart },
    { id: 'expense', label: 'Kosten', icon: DollarSign },
    { id: 'pantry', label: 'Vorrat', icon: Package }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[999]">
      <div className="absolute inset-0 bg-black/20 backdrop-blur-lg border-t border-white/10" />

      <nav className="relative px-4 py-2">
        <ul className="flex justify-between items-center max-w-lg mx-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <li key={item.id} className="relative">
                <button
                  onClick={() => onSectionChange(item.id)}
                  className="flex flex-col items-center w-14 py-1 group focus:outline-none"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeDot"
                      className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#00BFA5] rounded-full"
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className={`relative p-2 rounded-xl transition-all duration-300 ${
                      isActive ? 'bg-[#00BFA5]/20' : 'group-hover:bg-white/10'
                    }`}
                  >
                    <Icon 
                      size={20} 
                      className={`transition-colors duration-300 ${
                        isActive ? 'text-[#00BFA5]' : 'text-white/60 group-hover:text-white'
                      }`}
                    />
                  </motion.div>
                  <span className={`text-[10px] mt-1 transition-colors duration-300 ${
                    isActive ? 'text-[#00BFA5]' : 'text-white/60 group-hover:text-white'
                  }`}>
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}