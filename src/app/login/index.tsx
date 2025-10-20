"use client";
import React, { useState } from 'react';
import { client } from '../lib/apollo';
import { gql } from '@apollo/client';

const LOGIN = gql`
mutation($email:String!,$password:String!){ login(email:$email,password:$password){ token email userId } }
`;

export default function LoginPage(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();
    try{
      const {data}=await client.mutate({mutation:LOGIN,variables:{email,password}});
      localStorage.setItem('token',data.login.token);
      location.href='/cv-beautifier';
    }catch(err:any){setError('Identifiants invalides');}
  };
  return (
    <main>
      <h1>Connexion</h1>
      <form onSubmit={submit}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Mot de passe" type="password"/>
        <button type="submit">Se connecter</button>
      </form>
      {error && <p>{error}</p>}
    </main>
  );
}


