import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Login(){
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  const { login, register } = useAuth();

  const submit = async (e) => {
    e.preventDefault();
    if (mode === 'login') await login(email, password);
    else await register(name, email, password);
    nav('/');
  };

  return (
    <div style={{maxWidth:420, margin:'40px auto'}}>
      <h2>{mode==='login'?'Login':'Register'}</h2>
      <form onSubmit={submit} style={{display:'grid', gap:8}}>
        {mode==='register' && <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} required />}
        <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
        <button type="submit">{mode==='login'?'Login':'Create account'}</button>
        <button type="button" onClick={()=>setMode(mode==='login'?'register':'login')}>
          {mode==='login'?'New here? Register':'Already have an account? Login'}
        </button>
      </form>
    </div>
  );
}
