"use client"

import React, { useEffect, useState } from 'react'
import ProductForm from './ProductForm'
import { usePathname } from 'next/navigation';

export default function EditProduct() {

  const [productInfo, setProductInfo] = useState(null);
  const pathname = usePathname();
  const paths = pathname.split("edit/");
  const id = paths[1];
  
  useEffect(() => {
   async function getProducts(){
    if (!id) {
      return;
    }
    const res = await fetch('/api/products?id='+id, {
      method: "GET",
    })
    const data = await res.json();
    setProductInfo(data);
   } 
   getProducts();
  }, [id]);

  return (
    <div className="flex flex-col text-white h-full w-full gap-2 p-5 items-center">
       <p className="text-2xl font-bold">Edit Product</p>
       { productInfo && (
        <ProductForm {...productInfo} />
       ) }
      </div>
  )
}
