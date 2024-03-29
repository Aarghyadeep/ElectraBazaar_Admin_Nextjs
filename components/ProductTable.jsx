"use client"

import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { GrAdd } from "react-icons/gr";
import DeleteButton from "./DeleteButton";
import Spinner from "./Spinner";

export default function ProductTable() {

const [loader, setLoader] = useState(false);  
const [products,setProducts] = useState([]);
useEffect(() => {
    async function getData (){
        setLoader(true); 
        const res = await fetch('/api/products', {
            method: 'GET',
         });
         const data = await res.json();
         setProducts(data);
         setLoader(false);
    }
    getData();
  }, []);

  return (
        <div className="rounded-lg border md:w-[650px] w-[375px] border-gray-200 md:mt-2 mt-20">
      <div className="overflow-auto h-[472px] rounded-t-lg text-white">
        <table className="min-w-full text-sm">
          <thead className="ltr:text-left rtl:text-right sticky top-0 bg-[#161311]">
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
            
            <tr className="flex justify-between text-lg  border-b-[1.5px]">
              <th className="px-4 py-2 font-medium">Product</th>
              <th className="px-4 py-2 font-medium md:mr-16">Actions</th>
            </tr>
          </thead>
          {loader ?  (<div className="mt-24"> <Spinner /> </div>  ) : (
             <tbody className="divide-y divide-gray-200">
             {products?.map((product) => (
                 <tr className="flex justify-between" key={product._id}>
                  <td className=" px-4 py-2 font-medium">{product.title}</td>
                  <td className=" px-4 py-2 flex md:gap-5 gap-1">
                     <Link href={'/products/edit/'+product._id} 
                     className="py-1 px-1 md:px-2 bg-blue-800 rounded-[4px] flex gap-1 
                     hover:bg-blue-700 md:font-medium">
                      <FaEdit className="md:text-lg text-base" />Edit</Link>
                     <DeleteButton  id={product._id} />
             </td>
             </tr>
             ))}
           </tbody>
          )} 
        </table>
      </div>
    </div>
    )
}
