// src/ImageUploader.tsx
'use client'

// src/ImageUploader.tsx

import React, { ChangeEvent, useState, useCallback } from 'react';
import { storageRef, auth } from '@/database/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Upload, File, PaperPlaneRight } from 'phosphor-react';
import Spinner from './LoadingSpinner/Spinner';

interface ImageUploaderProps {
  onUploadSuccess: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false); // Add state for upload success
  const [isLoading, setIsLoading] = useState(false); // Add loading spinner

  const handleFileChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const uploadedfile = event.target.files && event.target.files[0];
    if (uploadedfile) {
      setSelectedFile(uploadedfile);
      setFileSelected(true);

    }
  }, []);

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      console.log('Starting upload...');
      setIsLoading(true)

      const snapshot = await uploadBytes(ref(storageRef, selectedFile.name), selectedFile, {
        customMetadata: {
          owner: auth.currentUser?.uid || 'unknown',
        },
      });
      console.log('Upload completed.');
      const downloadURL = await getDownloadURL(snapshot.ref);
      setImageURL(downloadURL);
      console.log('Download URL:', downloadURL);
      onUploadSuccess();
      setUploadSuccess(true); // Set uploadSuccess to true after successful upload
    } catch (error) {
      console.error('Error uploading image:', error);
    }
    finally {
      setIsLoading(false)
    }
  };

  const handleReset = () => {
    setSelectedFile(null); // Reset the selectedFile state
    setFileSelected(false); // Reset the fileSelected state
    setUploadSuccess(false); // Reset the uploadSuccess state
  };

  return (
    <div className="flex flex-row sm:flex-col ml-0 gap-2 sm:gap-6 w-1/4 sm:ml-[29rem] mt-3  ">
      {!fileSelected ? (
        // Show the initial upload UI if no file is selected
        <label
          htmlFor="upload-button"
          className="cursor-pointer ml-20 sm:ml-0 flex flex-column bg-neutral-300 transition duration-500 hover:bg-neutral-400 text-white font-semibold p-8  items-center justify-center gap-4 rounded-2xl"
        >
          <Upload size={54} />
          <h1 className='hidden sm:block'>Upload your file here</h1>
        </label>
      ) : uploadSuccess ? (
        // Show the success message after successful upload
        <div className="flex flex-column bg-green-500 text-white font-semibold p-4 rounded-md items-center justify-center gap-4">
          <File size={34} />
          <h1>Image uploaded!</h1>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full p-4 flex items-center justify-center"
            onClick={handleReset}
          >
            
            <Upload size={24} />
          </button>
        </div>
      ) : (
        // Show feedback after a file is selected
        <div className="flex flex-column bg-yellow-500 text-white font-semibold p-6 rounded-md items-center justify-center gap-4">
          <File size={54} />
          
          {isLoading ? <Spinner/> : <h1>File selected! Click Upload to proceed</h1>}
          
        </div>
        
      )}
      <input
        id="upload-button"
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept="image/*" // Restrict file type to images only
      />
      <button
        className="bg-red-700 hover:bg-red-600 text-white font-semibold rounded-full p-5 max-h-14 sm:p-6 flex items-center justify-center cursor-pointer mt-4 sm:mt-0" 
        onClick={handleUpload}
        disabled={!fileSelected} // Disable the button if no file is selected
      >
        
        <PaperPlaneRight size={20} />
      </button>
    </div>
  );
};

export default ImageUploader;

