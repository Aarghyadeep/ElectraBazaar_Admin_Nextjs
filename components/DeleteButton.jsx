"use client"

import { IoTrashOutline } from "react-icons/io5";
import DeleteModal from "./DeleteModal";
import { useState } from "react";


export default function DeleteButton({ id }) {
  
    const [showModal, setShowModal] = useState(false);  

  return (
    <>     
     {showModal && <DeleteModal id={id}  setShowModal={setShowModal} />}   
     <p
        onClick={()=> setShowModal(true)} 
        className="py-1 px-1 md:px-2 bg-blue-800 rounded-[4px] flex gap-1 
        hover:bg-blue-700 md:font-medium h-8 items-center">
         <IoTrashOutline className="md:text-lg text-base" />   Delete</p> 
    </>
  )
}
