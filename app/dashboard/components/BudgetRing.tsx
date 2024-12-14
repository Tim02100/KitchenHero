// /app/dashboard/components/BudgetRing.tsx
import { motion } from 'framer-motion';

interface BudgetRingProps {
  budget: number;
  spent: number;
}

export default function BudgetRing({ budget, spent }: BudgetRingProps) {
  const percentage = Math.min(Math.round((spent / budget) * 100), 100);
  const remaining = Math.max(budget - spent, 0);
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          className="text-white/10"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
        />
        {/* Progress circle */}
        <motion.circle
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="text-[#00BFA5]"
          strokeWidth="8"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="50"
          cy="50"
          strokeLinecap="round"
          strokeDasharray={circumference}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">{remaining.toFixed(2)} €</span>
        <span className="text-sm sm:text-base md:text-lg text-white/60">verfügbar</span>
      </div>
    </div>
  );
}