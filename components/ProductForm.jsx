"use client"

import { useRouter } from 'next/navigation';
import React from 'react';
import { useState } from "react";

export default function ProductForm({ 
    _id,
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,  
  }) {
  
  const [title,setTitle] = useState(existingTitle || '');
  const [description,setDescription] = useState(existingDescription || '');
  const [price,setPrice] = useState(existingPrice || '');
  const [goToProducts,setGoToProducts] = useState(false);
  const router = useRouter();
  
  async function saveProduct(e) {
   e.preventDefault();
   const data = { title, description, price };
   if(_id){
      try {
       const response = await fetch("/api/products", {
          method: 'PUT',
          body: JSON.stringify({...data, _id}),
        })
        if(response.ok){
          setGoToProducts(true);
         }   
      } catch (error) {
        console.log(error);
      }
   } else {
    try {
      const res = await fetch("/api/products", {
          method: 'POST',
          body: JSON.stringify(data),
      });
     if(res.ok){
      setGoToProducts(true);
     }
     } catch (error) {
      console.log(error);
     }
   }
  }

  if (goToProducts) {
    router.push('/products');
  }

  return (
    <form className="flex flex-col text-white h-full w-[60%] gap-2 p-5"
    onSubmit={saveProduct}>
       <label className="mt-3">Product Name</label>
       <input type="text"
       value={title}
       onChange={e => setTitle(e.target.value)}
       className="outline-none bg-transparent border border-gray-400 p-2 rounded-md w-full"
       placeholder="Product title"
       />
       <label className="mt-2">Description</label>
       <textarea type="text" 
       placeholder="Description goes here..."
       value={description}
       onChange={e => setDescription(e.target.value)}
       className="outline-none bg-transparent border border-gray-400 p-2 rounded-md w-full"
       />
       <label className="mt-2">Price (in INR)</label>
       <input type="text"
       placeholder="Price (₹)"
       value={price}
       onChange={e => setPrice(e.target.value)} 
       className="outline-none bg-transparent border border-gray-400 p-2 rounded-md w-full"
       />
       <button
       type='submit'
       className="mt-3 p-2 bg-blue-800 font-semibold w-[80px] rounded-md hover:bg-blue-700">
         Save
       </button>
      </form>
  )
}
