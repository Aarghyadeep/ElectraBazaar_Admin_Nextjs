import Layout from "@/components/PageLayout";


export default function page() {
  return (
    <Layout>
      <div className="flex flex-col text-white h-full w-full gap-2 p-5 items-center">
       <p className="text-2xl font-bold">Add new Product</p>
      <form className="flex flex-col text-white h-full w-[60%] gap-2 p-5">
       <label className="mt-3">Product Name</label>
       <input type="text" 
       className="outline-none bg-transparent border border-gray-400 p-2 rounded-md w-full"
       placeholder="Product title"
       />
       <label className="mt-2">Description</label>
       <textarea type="text" 
       placeholder="Description goes here..."
       className="outline-none bg-transparent border border-gray-400 p-2 rounded-md w-full"
       />
       <label className="mt-2">Price (in INR)</label>
       <input type="text"
       placeholder="Price (₹)" 
       className="outline-none bg-transparent border border-gray-400 p-2 rounded-md w-full"
       />
       <button className="mt-3 p-2 bg-blue-800 font-semibold w-[80px] rounded-md">
         Save
       </button>
      </form>
      </div>
    </Layout>
  )
}
