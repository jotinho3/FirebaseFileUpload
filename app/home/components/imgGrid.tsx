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
import Image from 'next/image';



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
        Swal.fire({
          title: 'Deleted!',
          text: 'The image was deleted.',
          icon: 'success',
          color: 'white',
          padding: '3rem',
          background: 'rgb(8, 47, 73)' 
        });
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



  function imageNameExtractor(url: string) {

    const parts = url.split('/');
    const imageNameWithToken = parts[parts.length - 1];
    const imageNameWithoutToken = imageNameWithToken.split('?')[0];

    return imageNameWithoutToken
  }


  console.log(user)

  const storageRefFromUrl = (url: string) => {
    const storage = ref(storageRef, url);
    return storage;
  };
  
  return (
    <div className=' mt-5 sm:mt-24 mb-3 flex gap-4 flex-wrap overflow-y-scroll max-h-[40rem] sm:max-h-[48rem] lg:max-h-[32rem]  max-w-full sm:max-w-full border-t-2 pt-6 border-rose-600 justify-center sm:justify-start' >
      <AnimatePresence>
      {isLoading && !isFetched ? (
        // Show skeleton loader while fetching
        <div className="w-full h-100 flex flex-col sm:flex-row  justify-center items-center gap-8  ">
          <div className="animate-pulse h-80 w-72  sm:w-1/5 bg-gray-300 rounded-ss-2xl" />
          <div className="animate-pulse h-80 w-72 sm:w-1/5 bg-gray-300 rounded-ss-2xl" />
          <div className="animate-pulse h-80 w-72 sm:w-1/5 bg-gray-300 rounded-ss-2xl" />
          <div className="animate-pulse h-80 w-72 sm:w-1/5 bg-gray-300 rounded-ss-2xl" />
          <div className="animate-pulse h-80 w-72 sm:w-1/5 bg-gray-300 rounded-ss-2xl" />
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

           
            <Image
              src={url}
              width={400}
              height={400}          
              alt={imageNameExtractor(url)}
             
              className='rounded-ss-2xl border-spacing-2.5 w-12 max-w-[350px] max-h-[400px] min-w-[270px] sm:min-w-[230px] lg:min-w-[280px]'
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

