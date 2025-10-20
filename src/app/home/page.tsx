"use client";
import React, { useEffect, useState } from 'react';
import { client } from '../lib/apollo';
import { gql } from '@apollo/client';
type MeQuery = { me: string | null };
type p = {
  data: {
    userProfile: {
      fullName?: string;
      title?: string;
      summary?: string;
      skills?: string[];
      gender?: string;
      tone?: string;
      profilePhotoUrl?: string;
    } | null;
  } | null;
};
const ME = gql`{ me }`;
const PROFILE = gql`query($userId:Int!){ userProfile(userId:$userId){ id fullName: full_name title summary } }`;

export default function HomePage() {
  const [needsProfile,setNeedsProfile]=useState(false);
  useEffect(()=>{
    (async()=>{
      try{
        const me=await client.query({query:ME,fetchPolicy:'no-cache'});
        if(!(me.data as MeQuery)?.me){ location.href='/cv-beautifier/login'; return; }
        const userId=1;
        const p=await client.query({query:PROFILE,variables:{userId},fetchPolicy:'no-cache'});
        const prof=(p as p)?.data?.userProfile;
        setNeedsProfile(!prof || !prof.fullName || !prof.title);
      }catch{}
    })();
  },[]);
  return <main>{needsProfile ? (<p>Votre profil est incomplet. Allez à <a href="/cv-beautifier/profile">/profile</a></p>) : (<><h1>CV Beautifier</h1><p>Bienvenue</p></>)}</main>;
}


