import React from 'react'
import { BlogList } from './_components/BlogList'
import Header from '@/app/_components/Header'

function BlogPage() {
  return (
    <div className="w-full">
        {/* <Header/> */}
        <BlogList/>
    </div>
  )
}

export default BlogPage