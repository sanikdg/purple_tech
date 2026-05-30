const StatsCard = ({ title, value, change, icon, color = 'primary' }) => {
  const colorMap = {
    primary: 'from-primary-500/20 to-primary-600/5 border-primary-500/30',
    emerald: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/30',
    amber: 'from-amber-500/20 to-amber-600/5 border-amber-500/30',
    rose: 'from-rose-500/20 to-rose-600/5 border-rose-500/30',
  };

  return (
    <div className={`bg-gradient-to-br ${colorMap[color]} border rounded-xl p-6 transition-transform duration-300 hover:scale-[1.02]`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-2xl">{icon}</span>
        {change !== undefined && (
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${change >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-surface-50">{value}</p>
      <p className="text-sm text-surface-200/60 mt-1">{title}</p>
    </div>
  );
};

export default StatsCard;
