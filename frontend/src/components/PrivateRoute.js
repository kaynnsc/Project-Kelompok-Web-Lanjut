import React from 'react';
import { Navigate } from 'react-router-dom';

// helper function untuk membaca isi token JWT
function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

const PrivateRoute = ({ children, adminOnly }) => {
    const token = localStorage.getItem('token');

    // jika tidak ada token sama sekali, lempar ke halaman login
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    const user = parseJwt(token);

    // jika rute ini ditandai "adminOnly" tapi peran pengguna bukan "admin"
    if (adminOnly && (!user || user.role !== 'admin')) {
        // Arahkan ke halaman dasbor user, karena dia tidak berhak mengakses halaman admin
        return <Navigate to="/dashboard" replace />;
    }

    // jika semua kondisi aman, tampilkan halaman yang dituju
    return children;
};

export default PrivateRoute;