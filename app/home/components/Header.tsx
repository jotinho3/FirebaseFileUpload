'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { auth } from '@/database/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import Swal from 'sweetalert2';


import mainIcon from '../../../assets/add_photo_alternate_outlined.png'
import Image from 'next/image';





export function SignOut() {
    const handleSignOut = () => {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will be signed out!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, sign me out!',
      }).then((result) => {
        if (result.isConfirmed) {
          auth.signOut();
        }
      });
    };
  
    return (
      auth.currentUser && (
        <button onClick={handleSignOut} className="bg-white text-gray-900 px-4 py-2 rounded">
          Sign Out!
        </button>
      )
    );
  }


const Header: React.FC = () => {
    const [user] = useAuthState(auth);

    
  
    return (
      <header className="flex items-center justify-between py-4 px-8 bg-red-800 text-white">
        <div className="flex items-center">
      <Image src={mainIcon} alt='main icon' />
          <h1 className="ml-2 text-xl font-bold"> Image Uploader</h1>
          
        </div>
        {user && (
          <div className="flex items-center">
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt="User"
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <p className="text-sm font-medium">{user.displayName}</p>
          </div>
        )}
        <SignOut />
      </header>
    );
  };
  

export default Header;
