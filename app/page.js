import Image from 'next/image'
import React from 'react'
import { getServerSession } from 'next-auth';
import SignInButton from '@/components/SignInButton';
import { authOptions } from '@/auth';
import Header from '@/components/Header';
import SideNav from '@/components/SideNav';

export default async function Home() {
  
  const session = await getServerSession(authOptions);

  if(!session){
    return (
      <div className='h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white'>
        <div className='bg-black h-[350px] w-[350px] rounded-md flex items-center shadow-md shadow-black flex-col gap-2'>
           <div className='text-3xl font-bold mt-2 flex justify-center items-center font-serif'>
           <Image src="/Logo.png" alt='logo' height={35} width={35} />
           ElectraBazaar
           </div>
           <p className='mt-5 text-xl font-bold text-black text-center w-full p-2 bg-blue-400'>Admin Login</p>
           <p className='mt-8 text-gray-400 text-center'>
           To begin, please log in to access your comprehensive suite of management tools and features.
           </p>
           <SignInButton />
        </div>
      </div>
    )
  }
  
  return (
    <div className='h-screen w-screen bg-blue-950 flex flex-col'>
      <Header />
      <div className='flex h-full'>
      <SideNav />
      <div className='p-4'>
      Signed in as {session.user.email}
      </div>
      </div>
      </div>
  )
}
