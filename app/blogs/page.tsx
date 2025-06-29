"use client"

import { metaDataForBlogs } from "@/lib/utils"
import { blogPost } from "@/lib/types"
import { useEffect, useState } from "react"

import { BlogPostGrid } from "@/components/blog-post-grid"
import { BlogSidebar } from "@/components/blog-sidebar"

metaDataForBlogs

// This would typically come from your CMS or database
const blogPosts = [
  {
    id: 1,
    title: "Top 10 Summer Fashion Trends",
    excerpt: "Discover the hottest fashion trends for this summer season.",
    date: "2024-04-15",
    image: "/placeholder.svg?height=200&width=400",
    category: "Fashion",
    author: "Jane Smith",
  },
  {
    id: 2,
    title: "The Ultimate Guide to Home Office Setup",
    excerpt: "Create the perfect home office with these essential products.",
    date: "2024-04-10",
    image: "/placeholder.svg?height=200&width=400",
    category: "Lifestyle",
    author: "John Doe",
  },
  {
    id: 3,
    title: "Best Tech Gadgets of 2024",
    excerpt: "A comprehensive review of this year's most innovative tech products.",
    date: "2024-04-05",
    image: "/placeholder.svg?height=200&width=400",
    category: "Technology",
    author: "Alex Johnson",
  },
  {
    id: 4,
    title: "How to Choose the Perfect Backpack",
    excerpt: "A detailed guide to selecting the right backpack for your needs.",
    date: "2024-04-01",
    image: "/placeholder.svg?height=200&width=400",
    category: "Travel",
    author: "Michael Brown",
  },
  {
    id: 5,
    title: "Sustainable Fashion: Eco-Friendly Brands to Watch",
    excerpt: "Explore these environmentally conscious fashion brands making a difference.",
    date: "2024-03-28",
    image: "/placeholder.svg?height=200&width=400",
    category: "Fashion",
    author: "Emma Wilson",
  },
  {
    id: 6,
    title: "Kitchen Gadgets That Will Change Your Cooking Game",
    excerpt: "Innovative kitchen tools to make meal preparation easier and more enjoyable.",
    date: "2024-03-25",
    image: "/placeholder.svg?height=200&width=400",
    category: "Lifestyle",
    author: "David Chen",
  },
]

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
