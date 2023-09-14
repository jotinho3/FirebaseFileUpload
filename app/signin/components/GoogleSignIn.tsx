// pages/signin.tsx
'use client'

import React, { useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation'
import { useAuthState } from 'react-firebase-hooks/auth';
import { app } from '@/database/firebase';
import Image from 'next/image';
import googleIcon from '@/assets/googleicon.png'




  const auth = getAuth(app);

const SignIn: React.FC = () => {
const [user] = useAuthState(auth);
  const router = useRouter();

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  useEffect(() => {
    // Redirect the user to the '/home' route if already signed in
    if (user) {
      router.push('/home');
    }
  }, [user, router]);

  return (
    <button className='p-4 bg-white text-black rounded-full flex gap-4  items-center' onClick={signInWithGoogle}><p className='border-r-2 pr-2'>Sign in with google</p> <Image src={googleIcon} width={30} height={30} alt='Google icon' /> </button>
  );
};

export default SignIn;
