'use client'

import { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/storage';
import ImageUploader from './components/imageUploader';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { initializeApp } from 'firebase/app';
import { app } from '@/database/firebase';
import { useRouter } from 'next/navigation'
import Link from 'next/link';
import { auth } from '@/database/firebase';
import ImgGrid from './components/imgGrid';




export default function Home() {

    const [user, loading] = useAuthState(auth);
    const router = useRouter();
    const [uploadSuccess, setUploadSuccess] = useState(0);

    const handleUploadSuccess = () => {
        setUploadSuccess(state => state + 1); // Update the state to trigger the ImgGrid refresh
      };

    if (loading || !user) {
        router.push('/signin');
      }

    else return(
        <div>
            <h1>Image Uploader</h1>
            <ImageUploader onUploadSuccess={handleUploadSuccess}/>
            <ImgGrid onUploadSuccess={uploadSuccess}/>
            
          
        </div>

    )
}