import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid } from 'recharts';
import { ChartPie, TrendingUp, BarChart as BarChartIcon, Calendar, Package } from 'lucide-react';

// Predefined color palette
const COLORS = {
  primary: '#00BFA5',
  secondary: '#004D40',
  accent: '#FFB74D',
  danger: '#FF5252',
  warning: '#FFC107',
  success: '#4CAF50',
  info: '#2196F3',
  chart: [
    '#00BFA5',
    '#4CAF50',
    '#FFB74D',
    '#FF5252',
    '#2196F3',
    '#9C27B0',
    '#FF9800'
  ]
};

const tabs = [
  { id: 'overview', label: 'Übersicht', icon: ChartPie },
  { id: 'categories', label: 'Kategorien', icon: Package },
  { id: 'trends', label: 'Trends', icon: TrendingUp },
  { id: 'expiry', label: 'Ablaufzeiten', icon: Calendar }
];

export default function EnhancedAnalytics({ items }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [hoveredCategory, setHoveredCategory] = useState(null);

  // Data processing functions
  const getCategoryData = () => {
    const categoryMap = new Map();
    items.forEach(item => {
      const count = categoryMap.get(item.category) || 0;
      categoryMap.set(item.category, count + 1);
    });
    return Array.from(categoryMap.entries())
      .map(([name, value]) => ({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        value,
        percentage: (value / items.length * 100).toFixed(1)
      }));
  };

  const getStatusData = () => {
    const statusMap = new Map();
    items.forEach(item => {
      const count = statusMap.get(item.status) || 0;
      statusMap.set(item.status, count + 1);
    });
    return Array.from(statusMap.entries())
      .map(([name, value]) => ({
        name: name === 'good' ? 'Gut' :
              name === 'expiring' ? 'Ablaufend' :
              name === 'expired' ? 'Abgelaufen' : 'Niedrig',
        value,
        percentage: (value / items.length * 100).toFixed(1)
      }));
  };

  const getExpiryData = () => {
    const today = new Date();
    const monthMap = new Map();
    
    items.forEach(item => {
      const expiryDate = new Date(item.expiryDate);
      const monthKey = expiryDate.toLocaleString('de-DE', { month: 'short', year: 'numeric' });
      
      const data = monthMap.get(monthKey) || { total: 0, expired: 0, expiring: 0 };
      data.total += 1;
      
      if (expiryDate < today) {
        data.expired += 1;
      } else if ((expiryDate - today) / (1000 * 60 * 60 * 24) <= 7) {
        data.expiring += 1;
      }
      
      monthMap.set(monthKey, data);
    });

    return Array.from(monthMap.entries())
      .map(([month, data]) => ({
        month,
        ...data
      }))
      .sort((a, b) => new Date(a.month) - new Date(b.month));
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/10 backdrop-blur-md p-4 rounded-lg shadow-lg border border-white/20">
          <p className="font-medium text-white mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p 
              key={index} 
              className="text-sm" 
              style={{ color: entry.color }}
            >
              {entry.name}: {entry.value}
              {entry.payload && entry.payload.percentage && ` (${entry.payload.percentage}%)`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Render different content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Status Overview */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-6">Status-Übersicht</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={getStatusData()}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {getStatusData().map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={COLORS.chart[index % COLORS.chart.length]}
                          onMouseEnter={() => setHoveredCategory(entry.name)}
                          onMouseLeave={() => setHoveredCategory(null)}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                {getStatusData().map((status, index) => (
                  <div 
                    key={status.name}
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      hoveredCategory === status.name ? 'bg-white/10' : 'bg-white/5'
                    }`}
                  >
                    <div className="text-sm text-white/60">{status.name}</div>
                    <div className="text-xl font-medium text-white">{status.value}</div>
                    <div className="text-sm" style={{ color: COLORS.chart[index] }}>
                      {status.percentage}%
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Distribution */}
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-lg font-medium text-white mb-6">Kategorieverteilung</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getCategoryData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: 'rgba(255,255,255,0.6)' }}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                    />
                    <YAxis tick={{ fill: 'rgba(255,255,255,0.6)' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="value" 
                      fill={COLORS.primary}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-white/60 text-sm mb-1">Gesamtartikel</div>
                <div className="text-2xl font-medium text-white">{items.length}</div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-white/60 text-sm mb-1">Kategorien</div>
                <div className="text-2xl font-medium text-white">
                  {new Set(items.map(item => item.category)).size}
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-white/60 text-sm mb-1">Ablaufend</div>
                <div className="text-2xl font-medium text-warning">
                  {items.filter(item => item.status === 'expiring').length}
                </div>
              </div>
              <div className="bg-white/5 rounded-xl p-4">
                <div className="text-white/60 text-sm mb-1">Niedriger Bestand</div>
                <div className="text-2xl font-medium text-danger">
                  {items.filter(item => item.status === 'low').length}
                </div>
              </div>
            </div>
          </div>
        );

      case 'expiry':
        return (
          <div className="bg-white/5 rounded-xl p-6">
            <h3 className="text-lg font-medium text-white mb-6">Ablaufzeitanalyse</h3>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getExpiryData()}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fill: 'rgba(255,255,255,0.6)' }}
                  />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.6)' }} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke={COLORS.primary} 
                    strokeWidth={2}
                    dot={{ fill: COLORS.primary }}
                    name="Gesamt"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expiring" 
                    stroke={COLORS.warning}
                    strokeWidth={2}
                    dot={{ fill: COLORS.warning }}
                    name="Ablaufend"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expired" 
                    stroke={COLORS.danger}
                    strokeWidth={2}
                    dot={{ fill: COLORS.danger }}
                    name="Abgelaufen"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        );

      // Add more tabs as needed...
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with tabs */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <BarChartIcon className="w-6 h-6 text-primary" />
          Vorratsanalyse
        </h2>
        <div className="flex gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary text-white'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      {renderContent()}
    </div>
  );
}