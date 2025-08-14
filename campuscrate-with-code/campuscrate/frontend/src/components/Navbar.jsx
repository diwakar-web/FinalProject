import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar(){
  const { user, logout } = useAuth();
  return (
    <nav style={{display:'flex',gap:12,padding:12,background:'#111',color:'#fff', alignItems:'center'}}>
      <Link to="/" style={{color:'#fff',textDecoration:'none',fontWeight:'bold'}}>CampusCrate</Link>
      <Link to="/dashboard/lost" style={{color:'#fff'}}>Lost</Link>
      <Link to="/dashboard/found" style={{color:'#fff'}}>Found</Link>
      {user ? (
        <>
          <Link to="/post-lost" style={{color:'#fff'}}>Post Lost</Link>
          <Link to="/post-found" style={{color:'#fff'}}>Post Found</Link>
          {user.role === 'admin' && <Link to="/admin" style={{color:'#fff'}}>Admin</Link>}
          <button onClick={logout} style={{marginLeft:'auto'}}>Logout</button>
        </>
      ) : (
        <Link to="/login" style={{marginLeft:'auto', color:'#fff'}}>Login</Link>
      )}
    </nav>
  );
}
