'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopNavigation from './components/TopNavigation';
import WeeklyMealPlanner from './components/WeeklyMealPlanner';
import ShoppingListManager from './components/ShoppingListManager';
import BudgetTracker from './components/BudgetTracker';
import PantryPreview from './components/PantryPreview';
import Kostenteiler from './components/Kostenteiler';
import MobileNavigation from './components/MobileNavigation';

export default function Dashboard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState('planner');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    let animationFrameId: number;

    if (canvas && ctx) {
      const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      };
      
      handleResize();
      window.addEventListener('resize', handleResize);

      const particles: Array<{
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;
        opacity: number;
      }> = Array.from({ length: 50 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        opacity: Math.random() * 0.5 + 0.2
      }));

      const drawParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach((particle) => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 191, 165, ${particle.opacity})`;
          ctx.fill();

          particle.x += particle.speedX;
          particle.y += particle.speedY;

          if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        });

        const gradient = ctx.createRadialGradient(
          mousePosition.x,
          mousePosition.y,
          0,
          mousePosition.x,
          mousePosition.y,
          300
        );
        gradient.addColorStop(0, 'rgba(0, 191, 165, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 191, 165, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        animationFrameId = requestAnimationFrame(drawParticles);
      };

      drawParticles();
      window.addEventListener('mousemove', handleMouseMove);

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('resize', checkMobile);
        cancelAnimationFrame(animationFrameId);
      };
    }
  }, []);

  const renderMobileSection = () => {
    const variants = {
      enter: { opacity: 0, y: 20 },
      center: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 }
    };

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="w-full min-h-[calc(100vh-12rem)]"
        >
          {activeSection === 'planner' && <WeeklyMealPlanner />}
          {activeSection === 'shopping' && <ShoppingListManager />}
          {activeSection === 'budget' && <BudgetTracker />}
          {activeSection === 'expense' && <Kostenteiler />}
          {activeSection === 'pantry' && <PantryPreview />}
        </motion.div>
      </AnimatePresence>
    );
  };

  const renderDesktopSections = () => {
    return (
      <>
        {/* Top Row - Planner and Shopping List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6">
          <div id="planner" className="w-full h-full scroll-mt-20">
            <WeeklyMealPlanner />
          </div>
          <div id="shopping" className="w-full min-h-[500px] md:min-h-[600px] scroll-mt-20">
            <ShoppingListManager />
          </div>
        </div>

        {/* Middle Row - Budget Tracker and Kostenteiler */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6">
          <div id="budget" className="w-full min-h-[500px] md:min-h-[600px] scroll-mt-20">
            <BudgetTracker />
          </div>
          <div id="menu" className="w-full min-h-[500px] md:min-h-[600px] scroll-mt-20">
            <Kostenteiler />
          </div>
        </div>

        {/* Bottom Row - Full Width Pantry */}
        <div id="pantry" className="w-full scroll-mt-20 mb-24">
          <div className="h-full">
            <PantryPreview />
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#004D40] to-black relative overflow-hidden">
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />

      <div 
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 191, 165, 0.1) 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10">
        <TopNavigation />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-[2000px] mx-auto md:mb-0 mb-24">
            {isMobile ? renderMobileSection() : renderDesktopSections()}
          </div>
        </main>

        {isMobile && (
          <MobileNavigation 
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
        )}
      </div>
    </div>
  );
}