// src/firebase.ts

import { initializeApp } from 'firebase/app';
import { getStorage, ref  } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

require('dotenv').config();


// Initialize Firebase
export const app = initializeApp({
    apiKey: "AIzaSyAjdxicLYmDmPiCy1FH3dOYBB0NgunI-EQ",
    authDomain: "superchat-jotinho.firebaseapp.com",
    projectId: "superchat-jotinho",
    storageBucket: "superchat-jotinho.appspot.com",
    messagingSenderId: "669987963573",
    appId: "1:669987963573:web:cf7c15e18064b72d1ab4fc"
  });


// Export Firebase storage
export const storage = getStorage(app);
export const auth = getAuth(app);
export const storageRef = ref(storage, 'images');