import React, { useState } from 'react';
import * as api from '../services/itemService.js';

export default function PostLost(){
  const [form, setForm] = useState({
    type: 'lost', title:'', description:'', category:'Other', location:'', date:'', claimQuestion:'', tags:''
  });
  const [photo, setPhoto] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form, tags: form.tags.split(',').map(s=>s.trim()).filter(Boolean) };
    if (photo) payload.photo = photo;
    await api.createItem(payload);
    alert('Lost item posted');
  };

  return (
    <div style={{maxWidth:640, margin:'0 auto'}}>
      <h2>Post Lost Item</h2>
      <form onSubmit={submit} style={{display:'grid', gap:8}}>
        <input placeholder="Title" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} required />
        <textarea placeholder="Description" value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required />
        <input placeholder="Category" value={form.category} onChange={e=>setForm({...form,category:e.target.value})} required />
        <input placeholder="Location" value={form.location} onChange={e=>setForm({...form,location:e.target.value})} required />
        <input type="date" value={form.date} onChange={e=>setForm({...form,date:e.target.value})} required />
        <input placeholder="Claim question (optional)" value={form.claimQuestion} onChange={e=>setForm({...form,claimQuestion:e.target.value})} />
        <input placeholder="Comma separated tags" value={form.tags} onChange={e=>setForm({...form,tags:e.target.value})} />
        <input type="file" onChange={e=>setPhoto(e.target.files[0])} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
