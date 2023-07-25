'use client'

import React, { useEffect, useState } from 'react';
import { storageRef, auth } from '@/database/firebase';
import { listAll, getDownloadURL, deleteObject, getMetadata } from 'firebase/storage';
import { ref } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { app } from '@/database/firebase';
import { storage } from '@/database/firebase'
import { Trash } from 'phosphor-react';
import Swal from 'sweetalert2'; // Import Sweet Alert 2
import { motion, AnimatePresence, spring } from 'framer-motion';



interface ImgGridProps {
  onUploadSuccess: number;
}

const ImgGrid: React.FC<ImgGridProps> = ({ onUploadSuccess }) => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [user, loading] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    setIsLoading(true); // Start the loading spinner
    try {
      const imagesRef = storageRef;
      const imagesList = await listAll(imagesRef);
      const urlsPromises = imagesList.items.map(async (itemRef) => {
        // Get the metadata for each image
        const metadata = await getMetadata(itemRef);
  
        // Check if the image belongs to the current user
        if (metadata?.customMetadata?.owner === auth.currentUser?.uid) {
          return getDownloadURL(itemRef);
        }
        return null;
      });
      const urls = await Promise.all(urlsPromises);
  
      // Filter out null values (images that don't belong to the user)
      const filteredUrls = urls.filter((url) => url !== null) as string[];

      setImageUrls(filteredUrls);
      setIsFetched(true)
    } catch (error) {
      console.error('Error fetching images:', error);
    } finally {
      setIsLoading(false); // Stop the loading spinner
    }
  };
  

  const handleImageClick = async (url: string) => {
    try {
      const shouldDelete = await Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover this image!',
        icon: 'warning',
        color: 'white',
        padding: '3rem',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3377dd',
        confirmButtonText: 'Yes, delete it!',
        background: 'rgb(8, 47, 73)'
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
    <div className='mt-24' style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' , gridTemplateRows: 'repeat(3, 1fr)', columnGap: '25px', rowGap:  '25px' }}>
      <AnimatePresence>
      {isLoading && !isFetched ? (
        // Show skeleton loader while fetching
        <div className="w-full mt-20 h-100 flex justify-center items-center gap-10">
          <div className="animate-pulse h-96 w-60 bg-gray-300 rounded" />
          <div className="animate-pulse h-96 w-60 bg-gray-300 rounded" />
          <div className="animate-pulse h-96 w-60 bg-gray-300 rounded" />
        </div>
      ) : (
        // Show images when fetching is completed
        imageUrls.map((url) => (
          <motion.div
            key={url}
            style={{ position: 'relative' }}
            initial={{ opacity: 0 }} // Set initial scale to 0
            animate={{ opacity: 1 }} // Animate to scale 1
            exit={{ opacity: 0 }} // Animate to scale 0 when removed
            transition={{ duration: 1 }}
          >
            <img
              src={url}
              alt="Uploaded"
              style={{ maxWidth: '350px', maxHeight: '400px' ,minWidth: '300px' }}
              className='rounded-ss-2xl border-spacing-2.5'
            />

               <div
               className='absolute top-1 right-1 cursor-pointer bg-red-700 hover:bg-red-600 rounded-full p-4 '
                >
                <Trash size={24} color="white" onClick={() => handleImageClick(url)} />
              </div>

            
            {/* Rest of the code... */}
          </motion.div>
        ))
      )}
      </AnimatePresence>
    </div>
  );
};

export default ImgGrid;

