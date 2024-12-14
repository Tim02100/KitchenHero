"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection } from './components/HeroSection';
import { IngredientInput } from './components/IngredientInput';
import { DietaryPreferences } from './components/DietaryPreferences';
import { AllergiesIntolerances } from './components/AllergiesIntolerances';
import { RecipeSuggestions } from './components/RecipeSuggestions';
import { HowItWorks } from './components/HowItWorks';
import RecipeDetail from './components/RecipeDetail';

const dietaryPreferences = [
  { id: 'vegan', label: 'Vegan', icon: '🌱', description: 'Keine tierischen Produkte' },
  { id: 'vegetarian', label: 'Vegetarisch', icon: '🥕', description: 'Kein Fleisch oder Fisch' },
  { id: 'gluten_free', label: 'Glutenfrei', icon: '🌾', description: 'Ohne Gluten' },
  { id: 'lactose_free', label: 'Laktosefrei', icon: '🥛', description: 'Ohne Milchprodukte' },
  { id: 'keto', label: 'Ketogen', icon: '🥑', description: 'Wenig Kohlenhydrate, viel Fett' },
  { id: 'low_carb', label: 'Low Carb', icon: '🥦', description: 'Reduzierte Kohlenhydrate' },
  { id: 'high_protein', label: 'High Protein', icon: '💪', description: 'Proteinreich' },
  { id: 'mediterranean', label: 'Mediterran', icon: '🫒', description: 'Mediterrane Küche' },
  { id: 'paleo', label: 'Paleo', icon: '🍖', description: 'Steinzeit-Ernährung' },
  { id: 'halal', label: 'Halal', icon: '🕌', description: 'Nach islamischen Vorschriften' },
  { id: 'kosher', label: 'Kosher', icon: '✡️', description: 'Nach jüdischen Vorschriften' },
  { id: 'low_fat', label: 'Low Fat', icon: '🥗', description: 'Fettreduziert' },
  { id: 'quick', label: 'Schnell & Einfach', icon: '⚡', description: 'Unter 30 Minuten' },
  { id: 'budget', label: 'Budget', icon: '💰', description: 'Kostengünstige Zutaten' }
];

const allergiesIntolerances = [
  { id: 'gluten', label: 'Gluten', icon: '🌾', description: 'Glutenhaltige Getreide und daraus hergestellte Produkte' },
  { id: 'lactose', label: 'Laktose', icon: '🥛', description: 'Milch und Milchprodukte (einschließlich Laktose)' },
  { id: 'nuts', label: 'Nüsse', icon: '🥜', description: 'Schalenfrüchte und daraus hergestellte Produkte' },
  { id: 'peanuts', label: 'Erdnüsse', icon: '🥜', description: 'Erdnüsse und daraus hergestellte Produkte' },
  { id: 'eggs', label: 'Eier', icon: '🥚', description: 'Eier und daraus hergestellte Produkte' },
  { id: 'soy', label: 'Soja', icon: '🫘', description: 'Sojabohnen und daraus hergestellte Produkte' },
  { id: 'fish', label: 'Fisch', icon: '🐟', description: 'Fische und daraus hergestellte Produkte' },
  { id: 'shellfish', label: 'Schalentiere', icon: '🦐', description: 'Krebstiere und daraus hergestellte Produkte' },
  { id: 'molluscs', label: 'Weichtiere', icon: '🐚', description: 'Weichtiere und daraus hergestellte Produkte' },
  { id: 'celery', label: 'Sellerie', icon: '🥬', description: 'Sellerie und daraus hergestellte Produkte' },
  { id: 'mustard', label: 'Senf', icon: '🌭', description: 'Senf und daraus hergestellte Produkte' },
  { id: 'sesame', label: 'Sesam', icon: '🌰', description: 'Sesamsamen und daraus hergestellte Produkte' },
  { id: 'sulphites', label: 'Sulfite', icon: '🍇', description: 'Schwefeldioxid und Sulphite' },
  { id: 'lupin', label: 'Lupinen', icon: '🌿', description: 'Lupinen und daraus hergestellte Produkte' },
  { id: 'nightshades', label: 'Nachtschattengewächse', icon: '🍅', description: 'Tomaten, Paprika, Auberginen, Kartoffeln' },
  { id: 'corn', label: 'Mais', icon: '🌽', description: 'Mais und daraus hergestellte Produkte' },
  { id: 'yeast', label: 'Hefe', icon: '🍞', description: 'Hefe und daraus hergestellte Produkte' },
  { id: 'citrus', label: 'Zitrusfrüchte', icon: '🍋', description: 'Zitrusfrüchte und daraus hergestellte Produkte' },
];

const RecipeGenerator = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [selectedPreferences, setSelectedPreferences] = useState<string[]>([]);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    let animationFrameId: number;

    if (canvas && ctx) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const particles: { x: number; y: number; size: number; speedX: number; speedY: number }[] = [];
      for (let i = 0; i < 100; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25
        });
      }

      const drawParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(0, 191, 165, 0.1)';
        particles.forEach((particle) => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();

          particle.x += particle.speedX;
          particle.y += particle.speedY;

          if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        });
        animationFrameId = requestAnimationFrame(drawParticles);
      };

      drawParticles();
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const generateRecipes = async () => {
    if (ingredients.length === 0) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ingredients,
          diets: selectedPreferences.slice(0, 3), // Limit to 3 preferences
          allergies: selectedAllergies.slice(0, 3), // Limit to 3 allergies
        }),
      });

      if (!response.ok) throw new Error('Fehler beim Generieren der Rezepte');

      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Fehler:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />
      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 191, 165, 0.1) 0%, transparent 50%)`,
        }}
      />
      
      <HeroSection />

      <div className="container mx-auto px-4 py-8">
        <HowItWorks />

        <div className="card p-8 mb-8">
          <IngredientInput ingredients={ingredients} setIngredients={setIngredients} />
        </div>

        <DietaryPreferences 
          dietaryPreferences={dietaryPreferences}
          selectedPreferences={selectedPreferences}
          setSelectedPreferences={setSelectedPreferences}
        />

        <AllergiesIntolerances
          allergies={allergiesIntolerances}
          selectedAllergies={selectedAllergies}
          setSelectedAllergies={setSelectedAllergies}
        />

        <div className="text-center mb-12">
          <motion.button
            onClick={generateRecipes}
            disabled={isGenerating || ingredients.length === 0}
            className={`btn hover-scale text-lg px-8 py-4 ${
              ingredients.length === 0
                ? 'bg-gray-500 cursor-not-allowed'
                : isGenerating
                  ? 'bg-accent/50'
                  : 'bg-accent'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isGenerating ? (
              <div className="flex items-center justify-center space-x-2">
                <motion.div
                  className="w-6 h-6 border-t-2 border-r-2 border-primary rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
                <span>Generiere Rezepte...</span>
              </div>
            ) : (
              'Rezepte generieren'
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {recipes.length > 0 && !selectedRecipe && (
            <RecipeSuggestions recipes={recipes} onSelectRecipe={setSelectedRecipe} />
          )}
        </AnimatePresence>

        {selectedRecipe && (
          <RecipeDetail 
            recipe={selectedRecipe} 
            onClose={() => setSelectedRecipe(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default RecipeGenerator;

