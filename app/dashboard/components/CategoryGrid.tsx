interface Transaction {
  id: string;
  type: 'expense' | 'income';
  amount: number;
  category: string;
  date: string;
}

interface CategoryGridProps {
  transactions: Transaction[];
}

export default function CategoryGrid({ transactions }: CategoryGridProps) {
  const categories = [
    { id: 'food', name: 'Lebensmittel', icon: '🛒' },
    { id: 'restaurant', name: 'Restaurant', icon: '🍽️' },
    { id: 'coffee', name: 'Café & Snacks', icon: '☕' },
    { id: 'other', name: 'Sonstiges', icon: '📝' }
  ];

  const getCategorySpent = (categoryId: string) => {
    return transactions
      .filter(t => t.category === categoryId && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const totalSpent = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {categories.map((category) => {
        const spent = getCategorySpent(category.id);
        const percentage = totalSpent > 0 ? (spent / totalSpent) * 100 : 0;

        return (
          <CategoryCard
            key={category.id}
            name={category.name}
            icon={category.icon}
            spent={spent}
            percentage={percentage}
          />
        );
      })}
    </div>
  );
}

interface CategoryCardProps {
  name: string;
  icon: string;
  spent: number;
  percentage: number;
}

function CategoryCard({ name, icon, spent, percentage }: CategoryCardProps) {
  return (
    <div className="bg-white/5 rounded-xl p-6 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 rounded-full bg-[#00BFA5]/20 flex items-center justify-center text-xl">
          {icon}
        </div>
        <span className="font-medium text-lg text-white">{name}</span>
      </div>
      
      <div className="text-[#00BFA5] text-2xl font-semibold mb-2">
        {spent.toFixed(2)} €
      </div>

      <div className="relative h-3 bg-white/10 rounded-full">
        <div
          className="absolute left-0 top-0 h-full bg-[#00BFA5] rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="mt-2 text-sm text-white/60">
        {percentage.toFixed(1)}% der Gesamtausgaben
      </div>
    </div>
  );
}