

interface BudgetDetailsProps {
  budget: number;
  spent: number;
}

export default function BudgetDetails({ budget, spent }: BudgetDetailsProps) {
  const remaining = Math.max(budget - spent, 0);

  return (
    <div className="flex flex-col h-full justify-center">
      <h3 className="text-xl font-semibold mb-6 text-white">Budget Übersicht</h3>
      <div className="grid gap-4">
        <BudgetCard title="Monatsbudget" amount={budget} />
        <BudgetCard title="Ausgegeben" amount={spent} variant="spent" />
        <BudgetCard title="Verbleibend" amount={remaining} variant="remaining" />
      </div>
    </div>
  );
}

interface BudgetCardProps {
  title: string;
  amount: number;
  variant?: 'default' | 'spent' | 'remaining';
}

function BudgetCard({ title, amount, variant = 'default' }: BudgetCardProps) {
  const variantStyles = {
    default: 'bg-white/10',
    spent: 'bg-[#00BFA5]/20',
    remaining: 'bg-white/20'
  };

  return (
    <div className={`${variantStyles[variant]} rounded-lg p-4 transition-colors duration-300`}>
      <div className="text-sm text-white/60 mb-1">{title}</div>
      <div className="text-2xl font-bold text-white">{amount.toFixed(2)} €</div>
    </div>
  );
}