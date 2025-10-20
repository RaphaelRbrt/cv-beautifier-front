"use client";
import React, { useEffect, useState } from 'react';
import { client } from '../lib/apollo';
import { gql } from '@apollo/client';
import * as styles from './styles.css';

type MeQuery = { me: string | null };
type GetProfileQuery = {
  userProfile: {
    fullName?: string;
    title?: string;
    summary?: string;
    skills?: string[];
    gender?: string;
    tone?: string;
    profilePhotoUrl?: string;
  } | null;
};

const UPSERT = gql`
  mutation UpsertUserProfile($userId: Int!, $input: UserProfileInput!) {
    upsertUserProfile(userId: $userId, input: $input) {
      id
      userId
      fullName: full_name
      title
      summary
      skills
      profilePhotoUrl: profile_photo_url
      gender
      tone
    }
  }
`;

const UPLOAD = gql`
  mutation UploadProfilePhoto($userId: Int!, $file: Upload!) {
    uploadProfilePhoto(userId: $userId, file: $file) {
      id
      userId
      profilePhotoUrl: profile_photo_url
    }
  }
`;

const ME = gql`
  query GetMe {
    me
  }
`;

const GET_PROFILE = gql`
  query GetUserProfile($userId: Int!) {
    userProfile(userId: $userId) {
      id
      fullName: full_name
      title
      summary
      skills
      gender
      tone
      profilePhotoUrl: profile_photo_url
    }
  }
`;

export default function ProfilePage() {
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [skills, setSkills] = useState<string>('');
  const [gender, setGender] = useState('');
  const [tone, setTone] = useState('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const { data: meData } = await client.query<MeQuery>({
        query: ME,
        fetchPolicy: 'no-cache'
      });
      const userEmail = meData?.me;
      setEmail(userEmail || '');

      const userId = 1;
      try {
        const { data: profileData } = await client.query<GetProfileQuery>({
          query: GET_PROFILE,
          variables: { userId },
          fetchPolicy: 'no-cache'
        });

        if (profileData?.userProfile) {
          const profile = profileData.userProfile;
          setFullName(profile.fullName || '');
          setTitle(profile.title || '');
          setSummary(profile.summary || '');
          setSkills(profile.skills?.join(', ') || '');
          setGender(profile.gender || '');
          setTone(profile.tone || '');
          if (profile.profilePhotoUrl) {
            setPhotoPreview(profile.profilePhotoUrl);
          }
        }
      } catch (err) {
        console.log('Aucun profil existant');
      }
    } catch (err) {
      console.error('Erreur lors du chargement:', err);
      setError('Erreur lors du chargement du profil');
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setPhoto(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview('');
    }
  };

  const save = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Validation basique
      if (!fullName.trim()) {
        throw new Error('Le nom complet est requis');
      }

      const { data: meData } = await client.query({
        query: ME,
        fetchPolicy: 'no-cache'
      });
      const userEmail = (meData as MeQuery)?.me;
      const userId = 1; 

      await client.mutate({
        mutation: UPSERT,
        variables: {
          userId,
          input: {
            full_name: fullName,
            title,
            summary,
            skills: skills.split(',').map(s => s.trim()).filter(s => s),
            gender,
            tone
          }
        }
      });

      if (photo) {
        await client.mutate({
          mutation: UPLOAD,
          variables: {
            userId,
            file: photo
          }
        });
      }

      setSuccess(true);
      
      setTimeout(() => {
        window.location.href = '/cv-beautifier';
      }, 1500);
    } catch (err: any) {
      console.error('Erreur lors de la sauvegarde:', err);
      setError(err.message || 'Erreur lors de la sauvegarde du profil');
      setLoading(false);
    }
  };

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Profil</h1>

      {error && (
        <div className={styles.errorAlert}>
          {error}
        </div>
      )}

      {success && (
        <div className={styles.successAlert}>
        </div>
      )}

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Nom complet *
        </label>
        <input
          value={fullName}
          onChange={e => setFullName(e.target.value)}
          placeholder="Nom complet"
          className={styles.input}
          disabled={loading}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Titre
        </label>
        <input
          value={title}
          onChange={e => setTitle(e.target.value)}
          placeholder="Ex: Développeur Full Stack"
          className={styles.input}
          disabled={loading}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Résumé
        </label>
        <textarea
          value={summary}
          onChange={e => setSummary(e.target.value)}
          placeholder="Présentez-vous en quelques lignes"
          className={styles.textarea}
          disabled={loading}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Compétences (séparées par des virgules)
        </label>
        <input
          value={skills}
          onChange={e => setSkills(e.target.value)}
          placeholder="React, TypeScript, Node.js"
          className={styles.input}
          disabled={loading}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Genre
        </label>
        <input
          value={gender}
          onChange={e => setGender(e.target.value)}
          placeholder="Genre"
          className={styles.input}
          disabled={loading}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Tonalité
        </label>
        <input
          value={tone}
          onChange={e => setTone(e.target.value)}
          placeholder="Professionnel, décontracté, etc."
          className={styles.input}
          disabled={loading}
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>
          Photo de profil
        </label>
        {photoPreview && (
          <div className={styles.photoPreview}>
            <img 
              src={photoPreview} 
              alt="Aperçu" 
              className={styles.photoImage}
            />
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className={styles.fileInput}
          disabled={loading}
        />
      </div>

      <button
        onClick={save}
        disabled={loading}
        className={loading ? styles.disabledButton : styles.primaryButton}
      >
        {loading ? 'Enregistrement...' : 'Enregistrer'}
      </button>
    </main>
  );
}