import React, { useEffect, useState } from 'react';
import * as items from '../services/itemService.js';
import ItemCard from '../components/ItemCard.jsx';
import SearchBar from '../components/SearchBar.jsx';

export default function DashboardLost(){
  const [data, setData] = useState([]);
  const [q, setQ] = useState('');

  const load = async () => {
    const res = await items.getItems({ type: 'found', q });
    setData(res);
  };

  useEffect(()=>{ load(); },[]);

  return (
    <div>
      <h2>Found Items (match your lost)</h2>
      <SearchBar onSearch={(val)=>{ setQ(val); items.getItems({ type:'found', q: val }).then(setData); }} />
      <div style={{display:'grid', gap:12}}>
        {data.map(item => <ItemCard key={item._id} item={item} />)}
      </div>
    </div>
  );
}
