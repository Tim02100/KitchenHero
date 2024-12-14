'use client';

import { useState, useRef, useEffect } from 'react';
import PantryHeader from './components/PantryHeader';
import PantryStats from './components/PantryStats';
import PantryGrid from './components/PantryGrid';
import PantryFilters from './components/PantryFilters';
import AddItemModal from './components/AddItemModal';
import CategorySidebar from './components/CategorySidebar';
import ExpiryAlerts from './components/ExpiryAlerts';
import PantryAnalytics from './components/PantryAnalytics';
import { motion } from 'framer-motion';

// Types
export interface PantryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  location: string;
  expiryDate: string;
  status: 'good' | 'expiring' | 'expired' | 'low';
  notes?: string;
  barcode?: string;
}

export interface FilterState {
  search: string;
  category: string;
  location: string;
  status: string;
  sortBy: 'name' | 'expiry' | 'quantity';
}

export default function PantryPage() {
  // State Management
  const [items, setItems] = useState<PantryItem[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: 'all',
    location: 'all',
    status: 'all',
    sortBy: 'name'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Refs for animations
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Setup canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize();

    if (canvas && ctx) {
      const particles: Array<{
        x: number;
        y: number;
        size: number;
        speedX: number;
        speedY: number;
        opacity: number;
      }> = [];

      // Create particles
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 1,
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          opacity: Math.random() * 0.5 + 0.2
        });
      }

      const drawParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw particles
        particles.forEach((particle) => {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 191, 165, ${particle.opacity})`;
          ctx.fill();

          // Move particles
          particle.x += particle.speedX;
          particle.y += particle.speedY;

          // Bounce off edges
          if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
          if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
        });

        // Draw spotlight effect
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
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Filter and sort items
  const filteredItems = items
    .filter(item => {
      if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase())) return false;
      if (filters.category !== 'all' && item.category !== filters.category) return false;
      if (filters.location !== 'all' && item.location !== filters.location) return false;
      if (filters.status !== 'all' && item.status !== filters.status) return false;
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'expiry':
          return new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime();
        case 'quantity':
          return b.quantity - a.quantity;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  // Event handlers
  const handleFilterChange = (updates: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  };

  const handleAddItem = (item: Omit<PantryItem, 'id'>) => {
    const newItem = {
      ...item,
      id: Date.now().toString()
    };
    setItems(prev => [newItem, ...prev]);
  };

  const handleUpdateItem = (id: string, updates: Partial<PantryItem>) => {
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const handleDeleteItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#004D40] to-black overflow-hidden" ref={containerRef}>
      {/* Background Animation Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <PantryHeader 
            onAddClick={() => setIsModalOpen(true)}
            onViewChange={setView}
            currentView={view}
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* Sidebar */}
          <motion.div 
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CategorySidebar
              items={items}
              selectedCategory={filters.category}
              onCategorySelect={(category) => handleFilterChange({ category })}
            />
            <ExpiryAlerts items={items} />
          </motion.div>

          {/* Main Content Area */}
          <motion.div 
            className="lg:col-span-3 space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <PantryStats items={items} />
            
            <PantryFilters
              filters={filters}
              onChange={handleFilterChange}
            />

            <PantryGrid
              items={filteredItems}
              view={view}
              onUpdate={handleUpdateItem}
              onDelete={handleDeleteItem}
            />
          </motion.div>
        </div>

        {/* Analytics Section */}
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <PantryAnalytics items={items} />
        </motion.div>

        {/* Modals */}
        <AddItemModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdd={handleAddItem}
        />
      </div>
    </div>
  );
}