'use client'

import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initializeApp } from 'firebase/app';
import { app } from '@/database/firebase';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { auth } from '@/database/firebase';
import ImageUploader from '../components/imageUploader';
import ImgGrid from '../components/imgGrid';






export default function Home() {

    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    const [uploadSuccess, setUploadSuccess] = useState(0);

    useEffect(() => {
      // Redirect the user to the '/signin' route if not logged in
      if (loading || !user) {
        router.push('/signin');
      }
    }, [loading, user, router]);

    const handleUploadSuccess = () => {
        setUploadSuccess(state => state + 1); // Update the state to trigger the ImgGrid refresh
      };

    return(
        <div className='w-full'>
            
            <ImageUploader onUploadSuccess={handleUploadSuccess}/>
            <ImgGrid onUploadSuccess={uploadSuccess}/>
            
          
        </div>

    )
}