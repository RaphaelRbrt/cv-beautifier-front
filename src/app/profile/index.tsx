"use client";
import React, { useEffect, useState } from 'react';
import { client } from '../lib/apollo';
import { gql } from '@apollo/client';

const UPSERT = gql`
mutation($userId:Int!,$input:UserProfileInput!){ upsertUserProfile(userId:$userId,input:$input){ id userId fullName: full_name title summary skills profilePhotoUrl: profile_photo_url gender tone } }
`;
const UPLOAD = gql`
mutation($userId:Int!,$file: Upload!){ uploadProfilePhoto(userId:$userId,file:$file){ id userId profilePhotoUrl: profile_photo_url } }
`;
const ME = gql`{ me }`;

export default function ProfilePage(){
  const [email,setEmail]=useState('');
  const [fullName,setFullName]=useState('');
  const [title,setTitle]=useState('');
  const [summary,setSummary]=useState('');
  const [skills,setSkills]=useState<string>('');
  const [gender,setGender]=useState('');
  const [tone,setTone]=useState('');
  const [photo,setPhoto]=useState<File|null>(null);
  const save=async()=>{
    const {data:meData}=await client.query({query:ME,fetchPolicy:'no-cache'});
    const userEmail=meData.me;
    const userId=1;
    await client.mutate({mutation:UPSERT,variables:{userId,input:{full_name:fullName,title,summary,skills:skills.split(',').map(s=>s.trim()),gender,tone}}});
    if(photo){
      await client.mutate({mutation:UPLOAD,variables:{userId,file:photo}});
    }
    location.href='/cv-beautifier';
  };
  return (
    <main>
      <h1>Profil</h1>
      <input value={fullName} onChange={e=>setFullName(e.target.value)} placeholder="Nom complet"/>
      <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Titre"/>
      <textarea value={summary} onChange={e=>setSummary(e.target.value)} placeholder="Résumé"/>
      <input value={skills} onChange={e=>setSkills(e.target.value)} placeholder="Compétences (séparées par des virgules)"/>
      <input value={gender} onChange={e=>setGender(e.target.value)} placeholder="Genre"/>
      <input value={tone} onChange={e=>setTone(e.target.value)} placeholder="Tonalité"/>
      <input type="file" accept="image/*" onChange={e=>setPhoto(e.target.files?.[0] ?? null)} />
      <button onClick={save}>Enregistrer</button>
    </main>
  );
}


