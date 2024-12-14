import { motion } from 'framer-motion';
import { Utensils, ChevronDown } from 'lucide-react';

export const HeroSection = () => {
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: 'smooth'
    });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#004D40]/30 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-primary to-transparent" />
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          {/* Animated Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: 0.2, 
              type: "spring", 
              stiffness: 200, 
              damping: 15 
            }}
            className="mb-8 inline-block"
          >
            <div className="p-5 bg-gradient-to-br from-[#00BFA5]/30 to-[#00BFA5]/10 rounded-full backdrop-blur-sm border border-[#00BFA5]/20">
              <Utensils className="w-14 h-14 text-[#00BFA5]" />
            </div>
          </motion.div>

          {/* Title with Enhanced Gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl md:text-7xl font-bold mb-8 font-sans"
          >
            <span className="inline-block bg-gradient-to-r from-white via-[#00BFA5] to-white bg-clip-text text-transparent pb-2">
              Rezeptgenerator
            </span>
          </motion.h1>

          {/* Description with Better Contrast */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-xl md:text-2xl text-white mb-12 font-sans leading-relaxed max-w-2xl mx-auto"
          >
            Entdecke kreative Gerichte mit deinen verfügbaren Zutaten
          </motion.p>

          {/* Enhanced Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          >
            <motion.button
              onClick={scrollToContent}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="group flex flex-col items-center space-y-2"
            >
              <span className="text-sm text-white/60 group-hover:text-white transition-colors duration-300">
                Weiterscrollen
              </span>
              <motion.div
                animate={{ 
                  y: [0, 8, 0],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="bg-[#00BFA5]/20 rounded-full p-2 group-hover:bg-[#00BFA5]/30 transition-colors duration-300"
              >
                <ChevronDown className="w-6 h-6 text-[#00BFA5] group-hover:text-white transition-colors duration-300" />
              </motion.div>
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};