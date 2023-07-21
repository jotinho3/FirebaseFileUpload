'use client'

import React, { useEffect, useState } from 'react';
import { storageRef, auth } from '@/database/firebase';
import { listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { ref } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { app } from '@/database/firebase';
import { storage } from '@/database/firebase'
import { Trash } from 'phosphor-react';
import Swal from 'sweetalert2'; // Import Sweet Alert 2




interface ImgGridProps {
  onUploadSuccess: number;
}

const ImgGrid: React.FC<ImgGridProps> = ({ onUploadSuccess }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const imagesRef = storageRef;
      const imagesList = await listAll(imagesRef);
      const urlsPromises = imagesList.items.map((itemRef) =>
        getDownloadURL(itemRef)
      );
      const urls = await Promise.all(urlsPromises);
      setImageUrls(urls);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  

  const handleImageClick = async (url: string) => {
    try {
      const shouldDelete = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this image!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        background: '#000'
      });

      if (shouldDelete.isConfirmed) {
        const imageRef = ref(storage, url);
        await deleteObject(imageRef);
        fetchImages(); // Refresh the images after deletion

        // Show success message
        Swal.fire('Deleted!', 'The image has been deleted.', 'success');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      // Show error message
      Swal.fire('Error!', 'An error occurred while deleting the image.', 'error');
    }
  };

  useEffect(() => {
    fetchImages();
    console.log('imgGrid refreshed!')
  }, [onUploadSuccess]);


  console.log(user)

  const storageRefFromUrl = (url: string) => {
    const storage = ref(storageRef, url);
    return storage;
  };
  
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {imageUrls.map((url) => (
        <div key={url} style={{ position: 'relative' }}>
          <img
            src={url}
            alt="Uploaded"
            style={{ maxWidth: '300px', cursor: 'pointer' }}
          />
          <div
            style={{
              position: 'absolute',
              top: '5px',
              right: '5px',
              cursor: 'pointer',
            }}
            onClick={() => handleImageClick(url)}
          >
            {/* Replace the following line with the actual Thrash icon component */}
            <Trash size={24} color="blue" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ImgGrid;

