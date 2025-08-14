import React from 'react';
import RoutesFile from './routes.jsx';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import { AuthProvider } from './context/AuthContext.jsx';

export default function App(){
  return (
    <AuthProvider>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <div style={{ flex: 1, padding: 16 }}>
          <RoutesFile />
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}
