import Layout from '@/components/PageLayout'
import ProductForm from '@/components/ProductForm'
import React from 'react'

export default function EditPage() {
  return (
    <Layout>
      <div className="flex flex-col text-white h-full w-full gap-2 p-5 items-center">
       <p className="text-2xl font-bold">Edit Product</p>
       <ProductForm />
      </div>
    </Layout>
  )
}
