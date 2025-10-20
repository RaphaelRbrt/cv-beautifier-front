"use client";
import React, { useState } from 'react';
import { client } from '../lib/apollo';
import { gql } from '@apollo/client';

type RegisterResponse = {
  register: { token: string; email: string; userId: string };
};

type RegisterVariables = { email: string; password: string };

const REGISTER = gql`
mutation($email:String!,$password:String!){ register(email:$email,password:$password){ token email userId } }
`;

export default function Page(){
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const submit=async(e:React.FormEvent)=>{
    e.preventDefault();
    try{
      const {data}=await client.mutate<RegisterResponse,RegisterVariables>({mutation:REGISTER,variables:{email,password}});
      const token=data?.register.token;
      if(!token) throw new Error('Missing token');
      localStorage.setItem('token',token);
      location.href='/cv-beautifier/profile';
    }catch(err:any){setError('Erreur inscription');}
  };
  return (
    <main>
      <h1>Inscription</h1>
      <form onSubmit={submit}>
        <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email"/>
        <input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Mot de passe" type="password"/>
        <button type="submit">Créer un compte</button>
      </form>
      {error && <p>{error}</p>}
    </main>
  );
}




