import type { Metadata } from "next"

import { BlogPostGrid } from "@/components/blog-post-grid"
import { BlogSidebar } from "@/components/blog-sidebar"

export const metadata: Metadata = {
  title: "Blog | Evolyn",
  description: "Read our latest articles, tips, and product reviews",
}

export default function BlogPage() {
  return (
    <main className="container py-12">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
          <p className="text-muted-foreground">Read our latest articles, tips, and product reviews</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_300px]">
          <BlogPostGrid />
          <div className="hidden md:block">
            <BlogSidebar />
          </div>
        </div>
      </div>
    </main>
  )
}
