import Header from '../components/Header';

const Events = () => {
  return (
    <div>
      <Header title="Events" />
      <div className="p-8">
        <div className="card">
          <h3 className="text-lg font-semibold mb-4">Event Stream</h3>
          <p className="text-surface-200/60 mb-4">
            Real-time event feed showing customer entries, exits, zone visits, anomalies, and tracking updates.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs uppercase text-surface-200/60 border-b border-surface-700/50">
                <tr>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Camera</th>
                  <th className="px-4 py-3">Zone</th>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Confidence</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-surface-700/30">
                  <td className="px-4 py-4 text-surface-200/40" colSpan="5">
                    Events will appear here once the AI pipeline is active
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
