// pages/signin.tsx
'use client'

import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import firebase from 'firebase/compat/app'; // Update the import statement
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import 'firebase/compat/auth'; // Update the import statement
import { useRouter } from 'next/navigation'
import { initializeApp } from 'firebase/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import { app } from '@/database/firebase';




  const auth = getAuth(app);

const SignIn: React.FC = () => {
const [user] = useAuthState(auth);
  const router = useRouter();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  if (user) {
    router.push('/home');
  }

  return (
    <button onClick={signInWithGoogle}>Sign In with Google</button>
  );
};

export default SignIn;
