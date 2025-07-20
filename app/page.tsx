'use client'

import Link from "next/link"
// import { ShoppingBag, BookOpen } from "lucide-react"
import { useEffect, useState } from "react"
import { BookOpen } from "lucide-react"
import { useFetch } from "@/hooks/useFetch"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
// import { FeaturedProducts } from "@/components/featured-products"
// import { HeroSection } from "@/components/hero-section"
import { LatestBlogPosts } from "@/components/latest-blog-posts"
import { BlogPost } from "@/lib/types"
import { useDispatch, useSelector } from "react-redux"
import {RootState, AppDispatch} from "@/lib/store"
import {
  fetchBlogs,
  fetchBlogsFailure,
  fetchBlogsSuccess
} from '@/lib/features/blog/blogSlice';

export default function Home() {

  const dispatch = useDispatch<AppDispatch>();
  const { posts, status, error } = useSelector((state: RootState) => state.blog);


  const { data, error: fetchError } = useFetch<BlogPost[]>('/api/blogs');

  useEffect(() => {
  if (data) {
    dispatch(fetchBlogsSuccess(data));
  }
  if (fetchError) {
    dispatch(fetchBlogsFailure(fetchError));
  }
}, [data, error, dispatch]);

  return (
    <main className="flex min-h-screen flex-col">
      {/* <HeroSection /> */}

      {/* <section className="container py-12 space-y-6">
        <div className="flex flex-col items-center text-center space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Featured Products</h2>
          <p className="text-muted-foreground max-w-[700px]">Discover our handpicked selection of premium products</p>
        </div>
        <FeaturedProducts />
        <div className="flex justify-center pt-6">
          <Button asChild size="lg">
            <Link href="/products" className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              View All Products
            </Link>
          </Button>
        </div>
      </section> */}

      { status === 'loading' ? 
      <>
        <Skeleton className="h-96 w-full" />
      </>
      :
      <section className="bg-slate-50 py-12">
        <div className="container space-y-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tight">Latest from our Blog</h2>
            <p className="text-muted-foreground max-w-[700px]">
              Stay updated with our latest articles, tips, and product reviews
            </p>
          </div>
          { posts && <LatestBlogPosts blogPosts={posts} /> }
          <div className="flex justify-center pt-6">
            <Button asChild variant="outline" size="lg">
              <Link href="/blogs" className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Visit our Blog
              </Link>
            </Button>
          </div>
        </div>
      </section>
      }
    </main>
  )
}
