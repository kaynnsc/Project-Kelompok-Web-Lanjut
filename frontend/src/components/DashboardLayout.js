import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const DashboardLayout = () => (
  <>
    <Navbar />
    <main className="container mt-4">
      {/*handle halaman child seperti admin page/dashboard */}
      <Outlet />
    </main>
  </>
);

export default DashboardLayout;