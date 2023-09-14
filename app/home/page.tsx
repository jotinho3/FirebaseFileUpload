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
      
        <div className='w-full'>
            <div className='w-full flex sm:flex-row flex-col justify-center items-center  text-stone-950 '>
              <div className='flex flex-col gap-10 items-start'>
                <h1 className='bold text-5xl sm:text-8xl text-center mt-6'>Hello, this is your gallery!</h1>
                <p className='text-center'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo aut possimus in aspernatur voluptate id, reprehenderit veniam</p>
              </div>

              <div className='w-full'>
                <Lottie animationData={lottieData} />
              </div>

            </div>
          
            
          
        </div>
        

    )
}