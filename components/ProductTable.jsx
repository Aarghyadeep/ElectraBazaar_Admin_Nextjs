"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import { GrAdd } from "react-icons/gr";

export default function ProductTable() {
  
const [products,setProducts] = useState([]);
useEffect(() => {
    async function getData (){
        const res = await fetch('/api/products', {
            method: 'GET',
         });
         const data = await res.json();
         setProducts(data)
    }
    getData();
  }, []);

  return (
    <div className="rounded-lg border border-gray-200">
  <div className="overflow-x-auto overflow-y-auto rounded-t-lg text-white">
    <table className="min-w-full divide-y-2 divide-gray-200 bg-[#161311] text-sm">
      <thead className="ltr:text-left rtl:text-right">
      <tr className="flex justify-between border-b-2 items-center">
          <th className="px-4 py-4 text-xl font-medium">Your Products</th>
          <th className="px-4 py-4 font-medium">
          <Link className="bg-blue-800 py-2 px-5 rounded-md flex gap-1 items-center  
          hover:bg-blue-700 font-semibold"
           href={"/products/new"}>
           <GrAdd /> Add Product
          </Link>
          </th>
        </tr>
        <tr className="flex justify-between text-lg">
          <th className="px-4 py-2 font-medium">Product</th>
          <th className="px-4 py-2 font-medium">Category</th>
          <th className="px-4 py-2 font-medium">Price</th>
          <th className="px-4 py-2 font-medium md:mr-16">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {products?.map((product) => (
            <tr className="flex justify-between" key={product._id}>
             <td className=" px-4 py-2 font-medium">{product.title}</td>
             <td className=" px-4 py-2 ">Category</td>
             <td className=" px-4 py-2">₹ {product.price}</td>
             <td className=" px-4 py-2 flex gap-5">
                <Link href={'/'} className="py-1 px-2 bg-blue-800 rounded-[4px] flex gap-1 
                hover:bg-blue-700 font-medium">
                 <FaEdit className="text-lg" />Edit</Link>
                <Link href={'/'} className="py-1 px-2 bg-blue-800 rounded-[4px] flex gap-1 
                hover:bg-blue-700 font-medium group">
                 <IoTrashOutline className="text-lg" />   Delete</Link>
        </td>
        </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  )
}
