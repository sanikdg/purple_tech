import Header from '../components/Header';
import StatsCard from '../components/StatsCard';

const Dashboard = () => {
  return (
    <div>
      <Header title="Dashboard" />
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard title="Total Visitors" value="—" icon="👥" color="primary" />
          <StatsCard title="Active Cameras" value="—" icon="📹" color="emerald" />
          <StatsCard title="Avg Dwell Time" value="—" icon="⏱️" color="amber" />
          <StatsCard title="Anomalies" value="—" icon="⚠️" color="rose" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Visitor Trend</h3>
            <div className="h-64 flex items-center justify-center text-surface-200/40">
              Chart will render here in Phase 2
            </div>
          </div>
          <div className="card">
            <h3 className="text-lg font-semibold mb-4">Zone Activity</h3>
            <div className="h-64 flex items-center justify-center text-surface-200/40">
              Zone heatmap will render here in Phase 2
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
