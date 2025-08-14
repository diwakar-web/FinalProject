import React, { useState } from 'react';
export default function SearchBar({ onSearch }){
  const [q, setQ] = useState('');
  return (
    <div style={{display:'flex', gap:8, marginBottom:12}}>
      <input placeholder="Search..." value={q} onChange={e=>setQ(e.target.value)} />
      <button onClick={()=>onSearch(q)}>Search</button>
    </div>
  );
}
