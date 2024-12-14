// /app/pantry/components/PantryStats.tsx
'use client';

import { BarChart2, AlertTriangle, Package, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import type { PantryItem } from '../page';

interface PantryStatsProps {
  items: PantryItem[];
}

export default function PantryStats({ items }: PantryStatsProps) {
  const stats = {
    total: items.length,
    expiring: items.filter(item => item.status === 'expiring').length,
    expired: items.filter(item => item.status === 'expired').length,
    low: items.filter(item => item.status === 'low').length,
  };

  const cards = [
    {
      title: 'Gesamtartikel',
      value: stats.total,
      icon: Package,
      color: 'text-[#00BFA5]',
      bgColor: 'bg-[#00BFA5]/20'
    },
    {
      title: 'Bald ablaufend',
      value: stats.expiring,
      icon: AlertTriangle,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/20'
    },
    {
      title: 'Abgelaufen',
      value: stats.expired,
      icon: RefreshCw,
      color: 'text-red-500',
      bgColor: 'bg-red-500/20'
    },
    {
      title: 'Niedriger Bestand',
      value: stats.low,
      icon: BarChart2,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/20'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/60 text-sm">{card.title}</p>
              <p className={`text-2xl font-bold mt-1 ${card.color}`}>
                {card.value}
              </p>
            </div>
            <div className={`p-3 rounded-full ${card.bgColor}`}>
              <card.icon className={`h-6 w-6 ${card.color}`} />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}