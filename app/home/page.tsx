'use client'

import { useState, useEffect } from 'react';
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


import Lottie from 'lottie-react'
import lottieData from '../../assets/upload_photos_gallery.json'





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
        <div>
            <div className='w-full flex justify-center items-center gap-36 mb-96 text-stone-950 mt-28'>
              <div className='flex flex-col gap-10 items-start'>
                <h1 className='bold text-8xl'>Hello, this is your gallery!</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo aut possimus in aspernatur voluptate id, reprehenderit veniam, fugiat natus distinctio doloribus odio quia quae. Possimus perferendis aliquam culpa dolores facilis?</p>
              </div>

              <div className='w-full '>
                <Lottie animationData={lottieData} />
              </div>

            </div>
            <ImageUploader onUploadSuccess={handleUploadSuccess}/>
            <ImgGrid onUploadSuccess={uploadSuccess}/>
            
          
        </div>

    )
}