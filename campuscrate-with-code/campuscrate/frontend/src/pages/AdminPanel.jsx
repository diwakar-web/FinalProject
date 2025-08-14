import React, { useEffect, useState } from 'react';
import api from '../services/api.js';

export default function AdminPanel(){
  const [stats, setStats] = useState(null);
  useEffect(()=>{
    api.get('/admin/dashboard').then(res=>setStats(res.data));
  }, []);
  if (!stats) return <div>Loading...</div>;
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <ul>
        <li>Pending claims: {stats.pendingClaims}</li>
        <li>Active items: {stats.activeItems}</li>
        <li>Total users: {stats.users}</li>
      </ul>
    </div>
  );
}
