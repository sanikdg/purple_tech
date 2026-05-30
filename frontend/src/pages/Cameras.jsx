import Header from '../components/Header';

const Cameras = () => {
  return (
    <div>
      <Header title="Cameras" />
      <div className="p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Camera Management</h3>
          <button className="btn-primary">+ Add Camera</button>
        </div>
        <div className="card">
          <p className="text-surface-200/60">
            Camera feeds, status monitoring, and stream management will be available in Phase 2.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cameras;
