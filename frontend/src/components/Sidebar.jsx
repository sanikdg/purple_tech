import { NavLink } from 'react-router-dom';
import { NAV_ITEMS, APP_NAME } from '../utils/constants';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const { logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-surface-900 border-r border-surface-700/50 flex flex-col z-30">
      <div className="p-6 border-b border-surface-700/50">
        <h1 className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
          {APP_NAME}
        </h1>
        <p className="text-xs text-surface-200/60 mt-1">AI-Powered Analytics</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary-600/20 text-primary-400 border border-primary-500/30'
                  : 'text-surface-200/70 hover:bg-surface-800 hover:text-surface-50'
              }`
            }
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-surface-700/50">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors duration-200"
        >
          🚪 Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
