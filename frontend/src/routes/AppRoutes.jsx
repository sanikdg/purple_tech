import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import AuthLayout from '../layouts/AuthLayout';
import Dashboard from '../pages/Dashboard';
import Analytics from '../pages/Analytics';
import Cameras from '../pages/Cameras';
import Zones from '../pages/Zones';
import Events from '../pages/Events';
import Login from '../pages/Login';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/cameras" element={<Cameras />} />
        <Route path="/zones" element={<Zones />} />
        <Route path="/events" element={<Events />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
