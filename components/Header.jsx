"use client"

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { MdLogout } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";


export default function Header() {

  const { data: session } = useSession();

  return (
    <div className="top-0 bg-[#161311] w-full p-2 flex text-white justify-between border-b border-gray-600">
                {/* logo */}
      <Link href={"/"} className='md:text-2xl text-xl font-bold mt-2 flex justify-center items-center font-serif
      hover:opacity-90'>
           <Image src="/Logo.png" alt='logo' height={25} width={25} />
           ElectraBazaar
           <p className="text-orange-500 ml-1 mb-2 text-sm">Admin</p>
           </Link>

              {/* Avatar */}
       <div className="relative">
       <button className="peer flex items-center">
       { session?.user?.image ? (
         <Image src={session?.user?.image} alt="avatar" width={40} height={25} className="rounded-full
         mr-5"  />
       ) : (
         <IoPersonCircle className="bg-gray-600 w-10 h-10 rounded-full mr-5" />
       )
       }
       </button>
       <div className="hidden bg-[#28231D] min-w-36 text-white peer-hover:flex 
       hover:flex flex-col drop-shadow-lg z-[1] absolute right-6 text-sm rounded-md">
         <p className="py-2 px-3 text-xs text-center">{session?.user?.name}</p>
         <hr className="border text-gray-400 border-t border-gray-600" />
         <p className="py-2 px-3 cursor-pointer flex justify-center items-center gap-1 hover:text-gray-300"
         onClick={()=> signOut()}
         ><MdLogout className="text-lg" /> Logout</p>
       </div>
        </div>              
    </div>
  )
}
