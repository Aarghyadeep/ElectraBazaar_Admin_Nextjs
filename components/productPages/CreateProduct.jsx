"use client"

import { useState } from "react";
import ProductForm from "../ProductForm"
import { useRouter } from "next/navigation";
 

export default function CreateProduct() {

 
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    photos: [],
  })
  const [loading, SetLoading] = useState(false);  
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      SetLoading(true);
      const newProductForm = new FormData()

      for (var key in product) {
        newProductForm.append(key, product[key])
      }

      product.photos.forEach((photo) => {
        newProductForm.append("photoPath", photo)
      })

      const response = await fetch("/api/products", {
        method: "POST",
        body: newProductForm
      })

      if (response.ok) {
        router.push("/products")
        SetLoading(false)
      }
    } catch (err) {
      console.log("product submission failed", err.message)
    }
  }
 

  return (
    <div className="flex flex-col text-white h-full w-full gap-2 p-5 items-center">
       <p className="text-2xl font-bold">Add new Product</p>
       <ProductForm
         product={product}
         setProduct={setProduct}
         handleSubmit={handleSubmit}
         loading={loading}
       />
      </div>
  )
}
