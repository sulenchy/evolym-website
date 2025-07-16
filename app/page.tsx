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
// import { getLatestPosts } from "@/lib/utils"
import { BlogPost } from "@/lib/types"

export default function Home() {
  // const [blogPosts, setBlogPosts] = useState([]);
  const [loading, isLoading] = useState(false);

  const { data:  blogPosts } = useFetch<BlogPost[]>('/api/blogs');

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

      { loading ? 
      <>
        <Skeleton />
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
          { blogPosts && <LatestBlogPosts blogPosts={blogPosts} /> }
          <div className="flex justify-center pt-6">
            <Button asChild variant="outline" size="lg">
              <Link href="/blogs" className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Visit our Blog
              </Link>
            </Button>
          </div>
        </div>
      </section>}
    </main>
  )
}
