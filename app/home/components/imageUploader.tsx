// src/ImageUploader.tsx
'use client'

// src/ImageUploader.tsx

import React, { ChangeEvent, useState } from 'react';
import { storageRef, auth } from '@/database/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Upload, File, PaperPlaneRight } from 'phosphor-react';

interface ImageUploaderProps {
  onUploadSuccess: () => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [fileSelected, setFileSelected] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false); // Add state for upload success

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const uploadedfile = event.target.files && event.target.files[0];
    if (uploadedfile) {
      setSelectedFile(uploadedfile);
      setFileSelected(true);
      setUploadSuccess(false); // Reset uploadSuccess state when a new file is selected
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      console.log('Starting upload...');
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
  };

  const handleReset = () => {
    setSelectedFile(null); // Reset the selectedFile state
    setFileSelected(false); // Reset the fileSelected state
    setUploadSuccess(false); // Reset the uploadSuccess state
  };

  return (
    <div className="flex flex-col  gap-6 w-1/3 m-auto">
      {!fileSelected ? (
        // Show the initial upload UI if no file is selected
        <label
          htmlFor="upload-button"
          className="cursor-pointer flex flex-column bg-neutral-300 transition duration-500 hover:bg-neutral-400 text-white font-semibold p-28  items-center justify-center gap-4"
        >
          <Upload size={54} />
          <h1>Upload your file here</h1>
        </label>
      ) : uploadSuccess ? (
        // Show the success message after successful upload
        <div className="flex flex-column bg-green-500 text-white font-semibold p-6 rounded-md items-center justify-center gap-4">
          <File size={54} />
          <h1>Image successfully uploaded!</h1>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-full p-4 flex items-center justify-center"
            onClick={handleReset}
          >
            Upload Another
          </button>
        </div>
      ) : (
        // Show feedback after a file is selected
        <div className="flex flex-column bg-yellow-500 text-white font-semibold p-6 rounded-md items-center justify-center gap-4">
          <File size={54} />
          <h1>File selected! Click Upload to proceed</h1>
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
        className="bg-red-700 hover:bg-red-600 text-white font-semibold rounded-full p-6 flex items-center justify-center"
        onClick={handleUpload}
        disabled={!fileSelected} // Disable the button if no file is selected
      >
        <PaperPlaneRight size={20} />
      </button>
    </div>
  );
};

export default ImageUploader;

