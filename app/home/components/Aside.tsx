'use client'

import React from 'react';
import Link from 'next/link';
import { House, Image, Trash } from 'phosphor-react';

const LeftSidedAside = () => {
  return (
    <aside className="sm:w-96 p-4 sm:p-8 shadow-2xl bg-slate-800 h-[91.4vh]">
      <nav>
        <ul className='flex flex-col gap-6 '>
          <li className=" w-full flex gap-4  cursor-pointer hover:bg-slate-200 transition duration-150 ease-out hover:ease-in rounded">
            <Link href="/home" className='flex gap-3 p-1 sm:p-3'>
            <House size={24 } /> 
            <p className='hidden sm:block'>Home</p>
            </Link>
            
           
          </li>

          <li className="flex gap-4 cursor-pointer hover:bg-slate-200 transition duration-150 ease-out hover:ease-in rounded">
            <Link href="/home/gallery" className='flex gap-3 p-1 sm:p-3'>
            <Image size={24 } alt='Image Icon' /> 
            <p className='hidden sm:block'>Gallery</p>
            </Link>
            
           
          </li>
          <li className="flex gap-4 cursor-pointer hover:bg-slate-200 transition duration-150 ease-out hover:ease-in rounded">
            <Link href="/home/gallery" className='flex gap-3 p-1 sm:p-3'>
            <Trash size={24 } /> 
            <p className='hidden sm:block'>Trash</p>
            </Link>
            
          
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default LeftSidedAside;
