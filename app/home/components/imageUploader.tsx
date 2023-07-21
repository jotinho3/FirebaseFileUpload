// src/ImageUploader.tsx
'use client'

// src/ImageUploader.tsx

import React, { ChangeEvent, useState } from 'react';
import { storageRef, auth } from '@/database/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';


interface ImageUploaderProps {
    onUploadSuccess: () => void; // Add the onUploadSuccess prop
  }
  
  const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadSuccess }) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [imageURL, setImageURL] = useState<string | null>(null);
  
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const uploadedfile = event.target.files && event.target.files[0];
      if (uploadedfile) {
        setSelectedFile(uploadedfile);
      }
    };
  
    const handleUpload = async () => {
      if (!selectedFile) return;
  
      try {
        console.log('Starting upload...');
        const snapshot = await uploadBytes(ref(storageRef, selectedFile.name), selectedFile);
        console.log('Upload completed.');
        const downloadURL = await getDownloadURL(snapshot.ref);
        setImageURL(downloadURL);
        console.log('Download URL:', downloadURL);
        onUploadSuccess(); // Call the onUploadSuccess function after successful upload
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };
  
    return (
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        
      </div>
    );
  };
  
  export default ImageUploader;