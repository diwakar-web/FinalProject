import React from 'react';
import { Link } from 'react-router-dom';
export default function ItemCard({ item }){
  return (
    <div style={{border:'1px solid #ddd', padding:12, borderRadius:8, display:'flex', gap:12}}>
      {item.photoUrl && <img src={item.photoUrl} alt={item.title} width={96} height={96} style={{objectFit:'cover',borderRadius:8}} />}
      <div style={{flex:1}}>
        <h3 style={{margin:0}}>{item.title}</h3>
        <div style={{fontSize:12, opacity:0.8}}>{item.category} · {new Date(item.date).toLocaleDateString()} · {item.location}</div>
        <p>{item.description}</p>
        <Link to={`/item/${item._id}`}>View</Link>
      </div>
      <div><span style={{padding:'2px 6px', border:'1px solid #aaa', borderRadius:6}}>{item.type}</span></div>
    </div>
  );
}
