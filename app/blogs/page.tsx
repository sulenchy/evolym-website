"use client"

// import { metaDataForBlogs } from "@/lib/utils"
import { blogPost } from "@/lib/types"
import { useEffect, useState } from "react"

import { BlogPostGrid } from "@/components/blog-post-grid"
import { BlogSidebar } from "@/components/blog-sidebar"

// metaDataForBlogs



export default function BlogPage() {
  const [blogPosts, setPostBlogs] = useState<blogPost[]>([])
  const [loading, setLoading] = useState(true)

   useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        setPostBlogs(data);
        console.log('===> ', {data})
        setLoading(false);
      });
  }, []);

  return (
    <main className="container py-12">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground">Read our latest articles, tips, and product reviews</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_300px]">
          <BlogPostGrid blogPosts={blogPosts} />
          <div className="hidden md:block">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </main>
  )
}
