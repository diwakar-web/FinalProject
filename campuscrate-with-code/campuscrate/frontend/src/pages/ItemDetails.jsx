import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import * as items from '../services/itemService.js';
import * as claims from '../services/claimService.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function ItemDetails(){
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [message, setMessage] = useState('');
  const [answer, setAnswer] = useState('');
  const { user } = useAuth();

  useEffect(()=>{
    items.getItem(id).then(setItem);
  }, [id]);

  const claim = async () => {
    await claims.createClaim({ itemId: id, message, answer });
    alert('Claim sent');
  };

  const markReturned = async () => {
    await items.updateItemStatus(id, 'returned');
    items.getItem(id).then(setItem);
  };

  if (!item) return <div>Loading...</div>;
  return (
    <div style={{maxWidth:720, margin:'0 auto'}}>
      <h2>{item.title}</h2>
      {item.photoUrl && <img src={item.photoUrl} alt="" style={{maxWidth:'100%', borderRadius:8}} />}
      <p><b>Type:</b> {item.type} | <b>Status:</b> {item.status}</p>
      <p><b>Category:</b> {item.category} | <b>Date:</b> {new Date(item.date).toLocaleDateString()} | <b>Location:</b> {item.location}</p>
      <p>{item.description}</p>
      <p><b>Tags:</b> {(item.tags||[]).join(', ')}</p>
      {user && String(user.id) !== String(item.postedBy?._id) && (
        <div style={{borderTop:'1px solid #ddd', marginTop:12, paddingTop:12}}>
          <h3>Claim this item</h3>
          {item.claimQuestion && <div><b>Question:</b> {item.claimQuestion}</div>}
          <textarea placeholder="Message" value={message} onChange={e=>setMessage(e.target.value)} />
          <input placeholder="Your answer (if applicable)" value={answer} onChange={e=>setAnswer(e.target.value)} />
          <button onClick={claim}>Send Claim</button>
        </div>
      )}
      {user && (user.role==='admin' || String(user.id)===String(item.postedBy?._id)) && (
        <button onClick={markReturned} style={{marginTop:12}}>Mark as Returned</button>
      )}
    </div>
  );
}
