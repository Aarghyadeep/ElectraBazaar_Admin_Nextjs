import Layout from '@/components/PageLayout'
import Link from 'next/link'
import React from 'react'

export default function Products() {
  return (
    <Layout>
      <div className='text-white'>
       <Link href={"/products/new"}>
        Add Product
       </Link>
      </div>
    </Layout>
  )
}
