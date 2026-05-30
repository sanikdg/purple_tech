import Header from '../components/Header';

const Analytics = () => {
  return (
    <div>
      <Header title="Analytics" />
      <div className="p-8">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Analytics Dashboard</h3>
          <p className="text-surface-200/60">
            Advanced analytics with visitor trends, zone performance, dwell time analysis, and anomaly reports will be available in Phase 2.
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Visitor Trends', 'Zone Performance', 'Dwell Time Analysis'].map((item) => (
              <div key={item} className="bg-surface-800/50 rounded-lg p-4 border border-surface-700/30">
                <p className="text-sm font-medium text-surface-200">{item}</p>
                <p className="text-xs text-surface-200/40 mt-1">Coming in Phase 2</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
