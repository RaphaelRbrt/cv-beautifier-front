"use client";
import React, { useState } from 'react';
import { client } from '../lib/apollo';
import { gql } from '@apollo/client';

type LoginResponse = {
  login: { token: string; email: string; userId: string };
};

type LoginVariables = { email: string; password: string };

const LOGIN = gql`
mutation($email:String!,$password:String!){ login(email:$email,password:$password){ token email userId } }
`;

export default function Page(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();
    try{
      const {data}=await client.mutate<LoginResponse,LoginVariables>({mutation:LOGIN,variables:{email,password}});
      const token=data?.login.token;
      if(!token) throw new Error('Missing token');
      localStorage.setItem('token',token);
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


