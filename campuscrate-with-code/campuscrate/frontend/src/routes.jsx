import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import DashboardLost from './pages/DashboardLost.jsx';
import DashboardFound from './pages/DashboardFound.jsx';
import PostLost from './pages/PostLost.jsx';
import PostFound from './pages/PostFound.jsx';
import ItemDetails from './pages/ItemDetails.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import NotFound from './pages/NotFound.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

export default function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<DashboardLost />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/lost" element={<DashboardLost />} />
      <Route path="/dashboard/found" element={<DashboardFound />} />
      <Route path="/post-lost" element={<ProtectedRoute><PostLost /></ProtectedRoute>} />
      <Route path="/post-found" element={<ProtectedRoute><PostFound /></ProtectedRoute>} />
      <Route path="/item/:id" element={<ItemDetails />} />
      <Route path="/admin" element={<ProtectedRoute adminOnly><AdminPanel /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
