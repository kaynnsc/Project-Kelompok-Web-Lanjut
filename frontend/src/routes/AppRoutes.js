import { Routes, Route } from 'react-router-dom';

// mengimpor komponen layout yang baru
import DashboardLayout from '../components/DashboardLayout'; 

import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import AdminPage from '../pages/AdminPage';
import PrivateRoute from '../components/PrivateRoute';

const AppRoutes = () => (
  <Routes>
    {/* rute publik (Tanpa Navbar) */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />

    {/* grup rute privat (Menggunakan Layout dengan Navbar) */}
    <Route element={<DashboardLayout />}>
      <Route 
        path="/dashboard" 
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/admin" 
        element={
          <PrivateRoute adminOnly={true}>
            <AdminPage />
          </PrivateRoute>
        } 
      />
    </Route>
  </Routes>
);

export default AppRoutes;