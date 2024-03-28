import Layout from "@/components/PageLayout";
import ProductForm from "@/components/ProductForm";


export default function NewProduct() {
   
  return (
    <Layout>
      <div className="flex flex-col text-white h-full w-full gap-2 p-5 items-center">
       <p className="text-2xl font-bold">Add new Product</p>
       <ProductForm />
      </div>
    </Layout>
  )
}
