"use client"

import Image from 'next/image';
import React from 'react';
import { BsFillTrash3Fill } from "react-icons/bs";
import { IoIosImages } from 'react-icons/io';
import ButtonSpinner from './ButtonSpinner';

export default function ProductForm({ 
    product,
    setProduct,
    handleSubmit,
    loading
  }) {
  

  const handleUploadPhotos = (e) => {
    const newPhotos = e.target.files;
    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        photos: [...prevProduct.photos, ...newPhotos],
      };
    });
  };

  const handleRemovePhoto = (indexToRemove) => {
    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        photos: prevProduct.photos.filter((_, index) => index !== indexToRemove),
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => {
      return {
        ...prevProduct,
        [name]: value,
      };
    });
  };



  return (
    <form className="flex flex-col text-white h-full w-[60%] gap-2 p-5"
    onSubmit={handleSubmit}>
       <label className="mt-3">Product Name</label>
       <input type="text"
       name="title"
       value={product.title}
       onChange={handleChange}
       className="outline-none bg-transparent border border-gray-400 p-2 rounded-md w-full"
       placeholder="Product title"
       />

       {product.photos.length < 1 && (
          <div className="flex flex-wrap gap-4 m-[20px_0px_40px]">
          <input
            id="image"
            type="file"
            className='hidden'
            accept="image/*"
            onChange={handleUploadPhotos}
            multiple
          />
          <label htmlFor="image" className="p-[30px_40px] md:p-[40px_100px] rounded-xl flex flex-col justify-center items-center
          cursor-pointer border border-dashed border-gray-400">
            <div className="text-6xl">
              <IoIosImages />
            </div>
            <p className='text-center font-semibold'>Upload from your device</p>
          </label>
        </div>
        )}

     {product.photos.length > 0 && (
          <div className="flex flex-wrap gap-4 m-[20px_0px_40px]">
           {product?.photos?.map((photo, index) => (
              <div key={index} className="relative w-[250px] h-[150px] cursor-move">
                {photo instanceof Object ? (
                  <Image src={URL.createObjectURL(photo)} alt="product" className='w-full h-full' width={0} height={0} />
                ) : (
                  <Image src={photo} width={300} height={300} className='w-full h-full' alt="product" />
                )}
                <button type="button"
                className='absolute right-0 text-black top-0 p-[3px] bg-transparent text-xl hover:scale-105'
                onClick={() => handleRemovePhoto(index)}>
                  <BsFillTrash3Fill />
                </button>
              </div>
            ))}
            <input
              id="image"
              type="file"
              className='hidden'
              accept="image/*"
              onChange={handleUploadPhotos}
              multiple
            />
            <label htmlFor="image" className="w-[250px] h-[150px] flex flex-col justify-center items-center
            cursor-pointer border border-dashed border-gray-400">
              <div className="text-6xl">
                <IoIosImages />
              </div>
              <p>Upload from your device</p>
            </label>
          </div>
        )}
       
    
       <label className="mt-2">Description</label>
       <input type="text" 
       placeholder="Description goes here..."
       value={product.description}
       name="description"
       onChange={handleChange}
       className="outline-none bg-transparent border border-gray-400 p-2 rounded-md w-full h-40"
       />
       <label className="mt-2">Price (in INR)</label>
       <input type="text"
       placeholder="Price (₹)"
       value={product.price}
       name="price"
       onChange={handleChange} 
       className="outline-none bg-transparent border border-gray-400 p-2 rounded-md w-full"
       />
       <button
       type='submit'
       className="mt-3 p-2 bg-blue-800 font-semibold w-[80px] rounded-md hover:bg-blue-700">
         {loading ? (
          <span className='flex gap-2 items-center'><ButtonSpinner /> Save</span>
         ): ( <span> Save </span> )}
       </button>
      </form>
  )
}
