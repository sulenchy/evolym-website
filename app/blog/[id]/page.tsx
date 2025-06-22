import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { RelatedBlogPosts } from "@/components/related-blog-posts"
import { BlogShareButtons } from "@/components/blog-share-buttons"

// This would typically come from your CMS or database
const blogPosts = [
  {
    id: "1",
    title: "Top 10 Summer Fashion Trends",
    excerpt: "Discover the hottest fashion trends for this summer season.",
    content: `
# Top 10 Summer Fashion Trends

Summer is here, and it's time to refresh your wardrobe with the latest fashion trends. This season brings a perfect blend of comfort, style, and sustainability that will keep you looking chic while staying cool.

## 1. Oversized Blazers

The oversized blazer trend continues to dominate this summer. Perfect for air-conditioned offices or evening outings, these structured pieces add instant sophistication to any outfit.

## 2. Bright Colors and Bold Patterns

Say goodbye to muted tones! This summer is all about vibrant colors and eye-catching patterns. Think electric blues, sunny yellows, and tropical prints that capture the essence of the season.

## 3. Sustainable Fashion

More than ever, consumers are choosing eco-friendly options. Brands are responding with sustainable materials, ethical production processes, and timeless designs that won't go out of style.

## 4. Comfortable Footwear

Comfort meets style with chunky sneakers, platform sandals, and supportive flats. Your feet will thank you while you stay on-trend.

## 5. Flowing Maxi Dresses

Perfect for beach vacations or summer parties, flowing maxi dresses offer comfort and elegance in one piece.

## Conclusion

These trends offer something for everyone, whether you prefer bold statements or subtle elegance. Remember, the best fashion trend is the one that makes you feel confident and comfortable.
    `,
    date: "2024-04-15",
    image: "/placeholder.svg?height=400&width=800",
    category: "Fashion",
    author: "Jane Smith",
    authorImage: "/placeholder.svg?height=100&width=100",
    authorBio: "Fashion enthusiast and style blogger with over 5 years of experience in the industry.",
    tags: ["fashion", "summer", "trends", "style"],
    readTime: "5 min read",
  },
  {
    id: "2",
    title: "The Ultimate Guide to Home Office Setup",
    excerpt: "Create the perfect home office with these essential products.",
    content: `
# The Ultimate Guide to Home Office Setup

Working from home has become the new normal for many professionals. Creating an efficient and comfortable home office space is crucial for productivity and well-being.

## Essential Equipment

### 1. Ergonomic Chair
Invest in a quality ergonomic chair that supports your posture during long work sessions.

### 2. Adjustable Desk
A height-adjustable desk allows you to alternate between sitting and standing throughout the day.

### 3. Proper Lighting
Good lighting reduces eye strain and improves focus. Consider a combination of natural light and task lighting.

## Technology Setup

### Monitor Configuration
A dual-monitor setup can significantly boost productivity by providing more screen real estate.

### Audio Equipment
Quality headphones or speakers are essential for video calls and maintaining focus.

## Creating the Right Environment

### Minimize Distractions
Choose a quiet area of your home and use noise-canceling headphones if needed.

### Personal Touches
Add plants, artwork, or personal items to make the space feel welcoming and inspiring.

## Conclusion

A well-designed home office is an investment in your productivity and job satisfaction. Take time to create a space that works for your specific needs and work style.
    `,
    date: "2024-04-10",
    image: "/placeholder.svg?height=400&width=800",
    category: "Lifestyle",
    author: "John Doe",
    authorImage: "/placeholder.svg?height=100&width=100",
    authorBio: "Remote work consultant and productivity expert helping professionals optimize their home offices.",
    tags: ["home office", "productivity", "remote work", "workspace"],
    readTime: "7 min read",
  },
  {
    id: "3",
    title: "Best Tech Gadgets of 2024",
    excerpt: "A comprehensive review of this year's most innovative tech products.",
    content: `
# Best Tech Gadgets of 2024

2024 has been an exciting year for technology, with innovations that are changing how we work, play, and connect with others.

## Smartphones

### Latest iPhone Features
The newest iPhone models bring advanced camera capabilities and improved battery life.

### Android Innovations
Android devices continue to push boundaries with foldable screens and enhanced AI features.

## Wearable Technology

### Smartwatches
Health monitoring features have become more sophisticated, offering detailed insights into fitness and wellness.

### Fitness Trackers
Affordable options now include features previously found only in premium devices.

## Home Technology

### Smart Home Devices
Voice assistants and smart home integration have become more seamless and intuitive.

### Entertainment Systems
4K and 8K displays with advanced HDR support provide cinema-quality experiences at home.

## Conclusion

The tech landscape in 2024 offers something for everyone, from productivity enthusiasts to entertainment lovers. Choose gadgets that align with your lifestyle and needs.
    `,
    date: "2024-04-05",
    image: "/placeholder.svg?height=400&width=800",
    category: "Technology",
    author: "Alex Johnson",
    authorImage: "/placeholder.svg?height=100&width=100",
    authorBio: "Tech reviewer and gadget enthusiast with expertise in consumer electronics and emerging technologies.",
    tags: ["technology", "gadgets", "reviews", "innovation"],
    readTime: "6 min read",
  },
]

async function getBlogPost(id: string) {
  // In a real app, this would fetch from your CMS or database
  const post = blogPosts.find((post) => post.id === id)
  return post
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const post = await getBlogPost(id)

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | ShopBlog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getBlogPost(id)

  if (!post) {
    notFound()
  }

  return (
    <main className="container py-12">
      <div className="mx-auto max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Button variant="ghost" asChild className="p-0 h-auto">
            <Link href="/blog" className="flex items-center gap-2 text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </nav>

        {/* Article Header */}
        <article className="space-y-8">
          <header className="space-y-6">
            <div className="space-y-4">
              <Badge variant="secondary">{post.category}</Badge>
              <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{post.title}</h1>
              <p className="text-xl text-muted-foreground">{post.excerpt}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>By {post.author}</span>
              </div>
              <span>{post.readTime}</span>
            </div>

            <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
            </div>
          </header>

          {/* Article Content */}
          <div className="prose prose-gray max-w-none dark:prose-invert">
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }} />
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>

          <Separator />

          {/* Share Buttons */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Share this article</h3>
            <BlogShareButtons title={post.title} url={`/blog/${post.id}`} />
          </div>

          <Separator />

          {/* Author Bio */}
          <Card>
            <CardContent className="p-6">
              <div className="flex gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full">
                  <Image src={post.authorImage || "/placeholder.svg"} alt={post.author} fill className="object-cover" />
                </div>
                <div className="flex-1 space-y-2">
                  <h4 className="font-semibold">{post.author}</h4>
                  <p className="text-sm text-muted-foreground">{post.authorBio}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </article>

        {/* Related Posts */}
        <section className="mt-16">
          <h2 className="mb-8 text-2xl font-bold">Related Articles</h2>
          <RelatedBlogPosts currentPostId={post.id} category={post.category} />
        </section>
      </div>
    </main>
  )
}
