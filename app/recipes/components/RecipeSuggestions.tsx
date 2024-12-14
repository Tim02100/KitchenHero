import { motion, AnimatePresence } from 'framer-motion';

interface Recipe {
  id: string;
  name: string;
  // Hier könnten weitere Rezepteigenschaften hinzugefügt werden
}

interface RecipeSuggestionsProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
}

export const RecipeSuggestions: React.FC<RecipeSuggestionsProps> = ({ recipes, onSelectRecipe }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {recipes.map((recipe) => (
          <motion.div
            key={recipe.id}
            whileHover={{ scale: 1.02 }}
            className="card p-6 cursor-pointer"
            onClick={() => onSelectRecipe(recipe)}
          >
            <h3 className="text-xl font-semibold mb-3 text-text-light">{recipe.name}</h3>
            {/* Hier könnten weitere Rezeptinformationen angezeigt werden */}
          </motion.div>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};

