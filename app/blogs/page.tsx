"use client"

import { useSelector } from "react-redux"
import { BlogPostGrid } from "@/components/blog-post-grid"
import { BlogSidebar } from "@/components/blog-sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { RootState } from "@/lib/store"

export default function BlogPage() {
  const { posts: blogPosts, status } = useSelector((state: RootState) => state.blog)

  

  return (
    <main className="container py-12">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground">Read our latest articles, tips, and product reviews</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_300px]">
          {status === 'loading' && <Skeleton className="h-96 w-full" />}
          {status === 'succeeded' && blogPosts.length > 0 && (
            <>
              <BlogPostGrid blogPosts={blogPosts} />
              <div className="hidden md:block">
                <BlogSidebar blogPosts={blogPosts}/>
              </div>
            </>
          )}
          {status === 'succeeded' && blogPosts.length === 0 && (
            <h2>Sorry!!! There is no blog post for you at the moment. You can check back later.</h2>
          )}
          {status === 'failed' && <div>Error loading blog posts.</div>}
        </div>
      </div>
    </main>
  )
}
