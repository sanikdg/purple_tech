import Header from '../components/Header';

const Zones = () => {
  return (
    <div>
      <Header title="Zones" />
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Zone Management</h3>
          <button className="btn-primary">+ Add Zone</button>
        </div>
        <div className="card">
          <p className="text-surface-200/60 mb-4">
            Define store zones with polygon coordinates for spatial tracking and analytics.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['Entrance', 'Exit', 'Lipstick Section', 'Skincare Section', 'Makeup Section', 'Checkout Counter', 'Restricted Area'].map((zone) => (
              <div key={zone} className="bg-surface-800/50 rounded-lg p-3 border border-surface-700/30 text-center">
                <p className="text-sm font-medium text-surface-200">{zone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Zones;
