import React from 'react';
import { ArrowLeft, Clock, Users, Scale, Thermometer } from 'lucide-react';
import { motion } from 'framer-motion';

interface RecipeDetailProps {
  recipe: {
    name: string;
    description?: string;
    prepTime: number;
    cookTime: number;
    servings: number;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    difficulty: string;
    ingredients: string[];
    instructions: string[];
    tips: string[];
    tags: string[];
  };
  onClose: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-primary/95 backdrop-blur-lg"
    >
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
        {/* Header mit Zurück-Button */}
        <div className="max-w-4xl mx-auto mb-8">
          <button
            onClick={onClose}
            className="flex items-center space-x-2 text-accent hover:text-accent-dark transition-colors duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Zurück zur Übersicht</span>
          </button>
        </div>

        <div className="max-w-4xl mx-auto bg-secondary/50 rounded-2xl p-8">
          {/* Titel und Beschreibung */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white to-accent bg-clip-text text-transparent">
              {recipe.name}
            </h1>
            {recipe.description && (
              <p className="text-lg text-text-light/80">{recipe.description}</p>
            )}
          </div>

          {/* Quick Info Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-primary/50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-5 h-5 text-accent" />
                <span className="text-sm text-text-light/80">Zubereitungszeit</span>
              </div>
              <p className="text-xl font-semibold">{recipe.prepTime + recipe.cookTime} Min.</p>
            </div>
            <div className="bg-primary/50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-accent" />
                <span className="text-sm text-text-light/80">Portionen</span>
              </div>
              <p className="text-xl font-semibold">{recipe.servings}</p>
            </div>
            <div className="bg-primary/50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Thermometer className="w-5 h-5 text-accent" />
                <span className="text-sm text-text-light/80">Kalorien</span>
              </div>
              <p className="text-xl font-semibold">{recipe.calories} kcal</p>
            </div>
            <div className="bg-primary/50 rounded-xl p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Scale className="w-5 h-5 text-accent" />
                <span className="text-sm text-text-light/80">Schwierigkeit</span>
              </div>
              <p className="text-xl font-semibold">{recipe.difficulty}</p>
            </div>
          </div>

          {/* Nährwerte */}
          <div className="bg-primary/50 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Nährwerte pro Portion</h2>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="h-2 bg-accent/20 rounded-full mb-2">
                  <div 
                    className="h-2 bg-accent rounded-full"
                    style={{ width: `${(recipe.protein / (recipe.protein + recipe.carbs + recipe.fat)) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-text-light/80">Protein</p>
                <p className="font-semibold">{recipe.protein}g</p>
              </div>
              <div>
                <div className="h-2 bg-accent/20 rounded-full mb-2">
                  <div 
                    className="h-2 bg-accent rounded-full"
                    style={{ width: `${(recipe.carbs / (recipe.protein + recipe.carbs + recipe.fat)) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-text-light/80">Kohlenhydrate</p>
                <p className="font-semibold">{recipe.carbs}g</p>
              </div>
              <div>
                <div className="h-2 bg-accent/20 rounded-full mb-2">
                  <div 
                    className="h-2 bg-accent rounded-full"
                    style={{ width: `${(recipe.fat / (recipe.protein + recipe.carbs + recipe.fat)) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-text-light/80">Fett</p>
                <p className="font-semibold">{recipe.fat}g</p>
              </div>
            </div>
          </div>

          {/* Zwei-Spalten-Layout für Zutaten und Anleitung */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Zutaten */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Zutaten</h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-accent rounded-full" />
                    <span className="text-text-light/80">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Anleitung */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Zubereitung</h2>
              <ol className="space-y-4">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="flex space-x-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <span className="text-text-light/80">{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Tipps */}
          {recipe.tips.length > 0 && (
            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4">Tipps & Tricks</h2>
              <div className="bg-primary/50 rounded-xl p-6">
                <ul className="space-y-3">
                  {recipe.tips.map((tip, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <span className="text-accent">💡</span>
                      <span className="text-text-light/80">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Tags */}
          {recipe.tags.length > 0 && (
            <div className="mt-8">
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-accent/20 text-text-light/80 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeDetail;

