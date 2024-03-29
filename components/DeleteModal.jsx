"use client"

import { useRouter } from "next/navigation";
import { BsFillTrash3Fill } from "react-icons/bs";


export default function DeleteModal({ setShowModal, id }) {

    const router  = useRouter();
 
    async function deleteProduct() {
        await fetch('/api/products?id='+id, {
            method: "DELETE",
        });
        setShowModal(false);
        location.reload();
      }

  return (
    <>
    <div className=" fixed left-0 right-0 bottom-0 top-0 bg-slate-200 opacity-60"></div>
    <div className="fixed h-[220px] w-[350px] bg-gray-200 left-[50%] top-[50%]
    rounded-lg flex flex-col items-center" style={{transform : "translate(-50%, -50%)"}}>
      <p onClick={()=> setShowModal(false)} 
      className="text-red-500 text-xl font-bold absolute right-0 mt-[1px] mr-2 cursor-pointer"> x</p>  
      <p className="text-red-500 text-6xl mt-5"><BsFillTrash3Fill /></p>
      <p className="font-bold text-xl mt-2 text-black">Confirm Delete</p>
      <p className="text-gray-500 mt-2">Are you sure you want to delete this item?</p>
      <div className="flex gap-4 mt-6">
       <button onClick={()=> deleteProduct()}
        className="bg-red-500 font-bold py-2 px-5 rounded-md hover:bg-red-400">
        Delete
       </button>
       <button onClick={()=> setShowModal(false)} 
       className="bg-white text-red-500 font-bold py-2 px-5 rounded-md border hover:bg-gray-100">
        Cancel
       </button>
      </div>
    </div>
    </>
  )
}
