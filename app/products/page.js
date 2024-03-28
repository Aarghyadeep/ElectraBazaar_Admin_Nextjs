import Layout from '@/components/PageLayout'
import ProductTable from '@/components/ProductTable'
import React from 'react'

export default function Products() {
  return (
    <Layout>
      <div className='text-white'>
       <ProductTable />
      </div>
    </Layout>
  )
}
