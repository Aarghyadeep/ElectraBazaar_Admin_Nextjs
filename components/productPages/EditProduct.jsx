"use client"

import React, { useEffect, useState } from 'react'
import ProductForm from '../ProductForm';
import { usePathname, useRouter } from 'next/navigation';
import Spinner from '../Spinner';


export default function EditProduct() {

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    photos: [],
  })
  const [loading, SetLoading] = useState(false);
  const [pageLoader, setPageLoad] = useState(false); 
  const pathname = usePathname();
  const paths = pathname.split("edit/");
  const id = paths[1];
  const router = useRouter();
  
  useEffect(() => {
   async function getProducts(){
    setPageLoad(true)
    if (!id) {
      return;
    }
    const res = await fetch('/api/products?id='+id, {
      method: "GET",
    })
    const data = await res.json();
    
    setProduct({
      title: data.title,
      description: data.description,
      price: data.price,
      photos: data.photoPath,
    });
   } 
   getProducts();
   setPageLoad(false);
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      SetLoading(true);
      const updateProductForm = new FormData()

      for (var key in product) {
        updateProductForm.append(key, product[key])
      }

      product.photos.forEach((photo) => {
        updateProductForm.append("photoPath", photo)
      })

      const response = await fetch('/api/products?id='+id, {
        method: "PATCH",
        body: updateProductForm
      })

      if (response.ok) {
        router.push("/products")
        SetLoading(false);
      }
    } catch (err) {
      console.log("product submission failed", err.message)
    }
  }

  return (
    <div className="flex flex-col text-white h-full w-full gap-2 p-5 items-center">
       {pageLoader ? ( <div className='h-full w-full justify-center items-center'><Spinner /></div> ) : (
        <>
        <p className="text-2xl font-bold">Edit Product</p>
        <ProductForm 
         product={product}
         setProduct={setProduct}
         handleSubmit={handleSubmit}
         loading={loading}
        />
        </>
       )}
       
      </div>
  )
}
