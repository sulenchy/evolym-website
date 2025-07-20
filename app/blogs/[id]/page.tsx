"use client"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { notFound } from "next/navigation"
import { BlogShareButtons } from "@/components/blog-share-buttons"
import { RelatedBlogPosts } from "@/components/related-blog-posts"
import {Skeleton} from "@/components/ui/skeleton"
import { fetchBlogs } from "@/lib/features/blog/blogSlice"
import { AppDispatch, RootState } from "@/lib/store"
import { BlogPost } from "@/lib/types"

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const dispatch = useDispatch<AppDispatch>()
  const { posts: allBlogPosts, status } = useSelector((state: RootState) => state.blog)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchBlogs())
    }
  }, [dispatch, status])

  const blogPost = allBlogPosts.find((post: BlogPost) => post.slug === params.id)
  
  if (status === 'loading') {
    return <Skeleton className="h-96 w-full" />
  }

  if (status === 'succeeded' && !blogPost) {
    return notFound()
  }

  if (!blogPost) {
    // This will be caught by the next line, but it's good practice to have it.
    return notFound()
  }


  const relatedPosts = allBlogPosts.filter(
    (post) => post.category === blogPost.category && post.slug !== blogPost.slug
  )

  return (
    <main className="container py-12">
      <article className="prose prose-lg mx-auto">
        <h1>{blogPost.title}</h1>
        <p className="text-muted-foreground">
          {new Date(blogPost.date).toLocaleDateString()}
        </p>
        <div dangerouslySetInnerHTML={{ __html: blogPost.content }} />
      </article>

      <div className="mt-8 flex justify-center">
        {/* <BlogShareButtons blogPost={blogPost} /> */}
      </div>

      {relatedPosts.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold">Related Posts</h2>
          {/* <RelatedBlogPosts blogPosts={relatedPosts} /> */}
        </div>
      )}
    </main>
  )
}
