import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ShoppingCart, Utensils, BookOpen, Trophy, Heart, Search } from 'lucide-react';

export const HowItWorks = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredStep, setHoveredStep] = useState(null);

  const steps = [
    {
      icon: ShoppingCart,
      title: "Zutaten erfassen",
      description: "Gib einfach die Zutaten ein, die du zuhause hast. Ob einzelne Lebensmittel oder ganze Vorräte - KitchenHero findet für alles die perfekte Verwendung.",
      examples: "Zum Beispiel: Kartoffeln, Eier, Milch, übrige Gemüsereste",
      color: "from-green-500/20 to-emerald-500/20",
      tip: "Tipp: Je mehr Zutaten du eingibst, desto besser können wir passende Rezepte finden!"
    },
    {
      icon: Heart,
      title: "Vorlieben angeben",
      description: "Teile uns deine Ernährungsvorlieben und eventuelle Unverträglichkeiten mit. KitchenHero berücksichtigt alle deine Wünsche.",
      examples: "Vegetarisch, glutenfrei, Nussallergie etc.",
      color: "from-blue-500/20 to-cyan-500/20",
      tip: "Tipp: Deine Vorlieben werden für zukünftige Rezeptvorschläge gespeichert."
    },
    {
      icon: Search,
      title: "Rezepte generieren",
      description: "KitchenHero kreiert für dich maßgeschneiderte Rezepte, die perfekt zu deinen Zutaten und Vorlieben passen. Jedes Rezept wird individuell und einzigartig für dich erstellt.",
      examples: "Einzigartige Rezepte, die genau deine Zutaten optimal nutzen",
      color: "from-purple-500/20 to-pink-500/20",
      tip: "Tipp: Jedes generierte Rezept ist ein Unikat, perfekt auf deine Situation zugeschnitten!"
    },
    {
      icon: Trophy,
      title: "Erfolge feiern",
      description: "Reduziere Lebensmittelverschwendung, entdecke neue Lieblingsgerichte und werde zum Küchenhelden!",
      examples: "Spare Geld, Zeit und schone die Umwelt",
      color: "from-orange-500/20 to-amber-500/20",
      tip: "Tipp: Teile deine Erfolge mit der KitchenHero-Community!"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-[#004D40]/30 to-[#00796B]/30 rounded-xl overflow-hidden backdrop-blur-sm border border-[#00BFA5]/20 mb-8 hover:border-[#00BFA5]/40 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex justify-between items-center text-left focus:outline-none group transition-all duration-300 hover:bg-white/5"
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#00BFA5]/20 rounded-lg group-hover:bg-[#00BFA5]/30 transition-all duration-300">
            <BookOpen className="w-6 h-6 text-[#00BFA5]" />
          </div>
          <h2 className="text-xl font-semibold bg-gradient-to-r from-white to-[#00BFA5] bg-clip-text text-transparent">
            Werde zum Küchenhelden in 4 einfachen Schritten
          </h2>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[#00BFA5]"
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                  onMouseEnter={() => setHoveredStep(index)}
                  onMouseLeave={() => setHoveredStep(null)}
                >
                  <div
                    className={`h-full p-6 rounded-xl bg-gradient-to-br ${step.color} backdrop-blur-sm
                    border border-white/10 transition-all duration-300
                    ${hoveredStep === index ? 'scale-[1.02] shadow-lg shadow-[#00BFA5]/10' : 'scale-100'}`}
                  >
                    <div className="flex flex-col space-y-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-xl bg-[#00BFA5]/20 flex items-center justify-center">
                            <step.icon className="w-7 h-7 text-[#00BFA5]" />
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="w-8 h-8 rounded-full bg-[#00BFA5]/20 flex items-center justify-center text-lg font-medium text-[#00BFA5]">
                            {index + 1}
                          </span>
                          <h3 className="text-lg font-medium text-white">{step.title}</h3>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <p className="text-white/90 leading-relaxed">
                          {step.description}
                        </p>
                        <p className="text-white/70 text-sm italic">
                          {step.examples}
                        </p>
                      </div>

                      <div className="pt-2">
                        <div className="flex items-start space-x-2 text-sm text-[#00BFA5]">
                          <div className="flex-shrink-0 mt-1">
                            <Utensils className="w-4 h-4" />
                          </div>
                          <p className="leading-relaxed">
                            {step.tip}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Extra Info Box at the bottom */}
            <div className="px-6 pb-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-[#00BFA5]/10 rounded-xl p-4 border border-[#00BFA5]/20"
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <Heart className="w-5 h-5 text-[#00BFA5]" />
                  </div>
                  <p className="text-white/80 text-sm">
                    Mit KitchenHero verwandelst du übrige Lebensmittel in köstliche Gerichte. 
                    Unsere Community hat bereits über tausende Zutaten gerettet und 
                    dabei fantastische neue Rezepte entdeckt. Werde auch du Teil dieser Bewegung!
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};