import { useAuth } from '../contexts/AuthContext';
import { useSocket } from '../contexts/SocketContext';

const Header = ({ title }) => {
  const { user } = useAuth();
  const { connected } = useSocket();

  return (
    <header className="h-16 bg-surface-900/80 backdrop-blur-sm border-b border-surface-700/50 flex items-center justify-between px-8 sticky top-0 z-20">
      <h2 className="text-lg font-semibold text-surface-50">{title}</h2>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${connected ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
          <span className="text-xs text-surface-200/60">{connected ? 'Live' : 'Offline'}</span>
        </div>

        {user && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-sm font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm font-medium text-surface-200">{user.name}</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
