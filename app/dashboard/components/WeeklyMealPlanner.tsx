'use client';

import { useState, useEffect } from 'react';
import { Calendar, Plus, Edit2, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { MealModal } from './meal-modal';

// Types
interface Meal {
  name: string;
  portions: number;
  ingredients: string[];
  notes: string;
}

interface DayMeals {
  [mealType: string]: Meal;
}

interface WeekMeals {
  [day: number]: DayMeals;
}

interface PlannedMeals {
  [week: number]: WeekMeals;
}

interface EditingMeal {
  day: number;
  mealType: string;
}

interface ModalPosition {
  x: number;
  y: number;
}

export default function WeeklyMealPlanner() {
  // Constants
  const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  const meals = ['Frühstück', 'Mittagessen', 'Abendessen'];

  // State
  const [plannedMeals, setPlannedMeals] = useState<PlannedMeals>({});
  const [currentWeek, setCurrentWeek] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingMeal, setEditingMeal] = useState<EditingMeal | null>(null);
  const [modalPosition, setModalPosition] = useState<ModalPosition>({ x: 0, y: 0 });
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const [view, setView] = useState<'week' | 'day'>('week');
  const [isMobile, setIsMobile] = useState(false);

  // Check for mobile view
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Load saved meals
  useEffect(() => {
    const storedMeals = localStorage.getItem('plannedMeals');
    if (storedMeals) {
      setPlannedMeals(JSON.parse(storedMeals));
    }
  }, []);

  // Save meals on change
  useEffect(() => {
    localStorage.setItem('plannedMeals', JSON.stringify(plannedMeals));
  }, [plannedMeals]);

  // Helper functions
  const getWeekDates = () => {
    const today = new Date();
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 1 + currentWeek * 7));
    const endOfWeek = new Date(today.setDate(today.getDate() - today.getDay() + 7 + currentWeek * 7));
    return `${startOfWeek.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })} - ${endOfWeek.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })}`;
  };

  const addMeal = (day: number, mealType: string, event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const scrollY = window.scrollY;
    
    setModalPosition({
      x: rect.left,
      y: rect.top + scrollY
    });
    
    setEditingMeal({ day, mealType });
    setModalOpen(true);
  };

  const saveMeal = (meal: Meal) => {
    if (!editingMeal) return;
    
    const { day, mealType } = editingMeal;
    setPlannedMeals(prev => ({
      ...prev,
      [currentWeek]: {
        ...prev[currentWeek],
        [day]: { 
          ...prev[currentWeek]?.[day],
          [mealType]: meal 
        }
      }
    }));
    setEditingMeal(null);
    setModalOpen(false);
  };

  const deleteMeal = (day: number, mealType: string) => {
    setPlannedMeals(prev => {
      const newPlannedMeals = { ...prev };
      if (newPlannedMeals[currentWeek]?.[day]?.[mealType]) {
        delete newPlannedMeals[currentWeek][day][mealType];
      }
      return newPlannedMeals;
    });
  };

  // Render functions
  const renderMealCard = (day: number, meal: string) => {
    const plannedMeal = plannedMeals[currentWeek]?.[day]?.[meal];
    
    return (
      <motion.div
        key={meal}
        className="bg-white/5 hover:bg-white/10 rounded-lg relative group transition-all duration-300"
        whileHover={{ scale: 1.02 }}
      >
        {plannedMeal ? (
          <div className="p-3">
            <div className="font-medium text-white">
              {plannedMeal.name}
            </div>
            <div className="text-sm text-white/60">
              {plannedMeal.portions} Portionen
            </div>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button 
                onClick={(e) => { e.stopPropagation(); setEditingMeal({ day, mealType: meal }); setModalOpen(true); }}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <Edit2 className="h-4 w-4 text-white" />
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); deleteMeal(day, meal); }}
                className="p-1 hover:bg-white/20 rounded transition-colors"
              >
                <Trash2 className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        ) : (
          <button 
            onClick={(e) => addMeal(day, meal, e)}
            className="w-full h-16 flex items-center justify-center p-2 text-white/60 hover:text-white transition-colors"
          >
            <Plus className="h-5 w-5 mr-1" />
            {meal}
          </button>
        )}
      </motion.div>
    );
  };

  return (
    <div className={`premium-card h-[600px] ${isMobile ? 'w-full max-w-md mx-auto' : 'w-full'} overflow-hidden flex flex-col`}>
      {/* Header Section */}
      <div className="p-4 border-b border-white/10">
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold flex items-center bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent">
            <Calendar className="mr-2 text-[#00BFA5]" />
            Wochenplaner
          </h2>

          {/* Week Navigation */}
          <div className="flex items-center justify-between w-full">
            <button 
              onClick={() => setCurrentWeek(currentWeek - 1)} 
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronLeft className="h-6 w-6 text-[#00BFA5]" />
            </button>
            <span className="text-lg font-medium text-white/80">{getWeekDates()}</span>
            <button 
              onClick={() => setCurrentWeek(currentWeek + 1)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <ChevronRight className="h-6 w-6 text-[#00BFA5]" />
            </button>
          </div>

          {/* View Toggle */}
          <div className="flex bg-white/10 p-1 rounded-lg w-full max-w-[200px]">
            <button 
              className={`flex-1 px-4 py-2 rounded-md text-sm transition-all duration-300 ${
                view === 'week' ? 'bg-[#00BFA5] text-white' : 'text-white/60'
              }`}
              onClick={() => setView('week')}
            >
              Woche
            </button>
            <button 
              className={`flex-1 px-4 py-2 rounded-md text-sm transition-all duration-300 ${
                view === 'day' ? 'bg-[#00BFA5] text-white' : 'text-white/60'
              }`}
              onClick={() => setView('day')}
            >
              Tag
            </button>
          </div>

          {/* Day Selection for Day View */}
          {view === 'day' && (
            <div className="grid grid-cols-7 gap-2 w-full">
              {days.map((day, index) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(index)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    selectedDay === index 
                      ? 'bg-[#00BFA5] text-white' 
                      : 'bg-white/5 text-white/60 hover:bg-white/10'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow p-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`${isMobile ? 'space-y-6' : ''}`}
          >
            {view === 'week' ? (
              <div className={`grid ${isMobile ? 'grid-cols-1 gap-6' : 'grid-cols-2 xl:grid-cols-3 gap-4'}`}>
                {days.map((day, dayIndex) => (
                  <div key={day} className="bg-white/5 rounded-lg p-4">
                    <h3 className="text-lg font-medium text-white mb-3">{day}</h3>
                    <div className="space-y-3">
                      {meals.map((meal) => renderMealCard(dayIndex, meal))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {meals.map((meal) => renderMealCard(selectedDay, meal))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Meal Modal */}
      <AnimatePresence>
        {modalOpen && (
          <MealModal
            isOpen={modalOpen}
            onClose={() => { setModalOpen(false); setEditingMeal(null); }}
            onSave={saveMeal}
            initialMeal={editingMeal && plannedMeals[currentWeek]?.[editingMeal.day]?.[editingMeal.mealType]}
          />
        )}
      </AnimatePresence>
    </div>
  );
}