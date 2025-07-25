import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// This would typically come from your CMS or database
const allBlogPosts = [
  {
    id: "1",
    title: "Top 10 Summer Fashion Trends",
    excerpt: "Discover the hottest fashion trends for this summer season.",
    date: "2024-04-15",
    image: "/placeholder.svg?height=200&width=400",
    category: "Fashion",
    author: "Jane Smith",
  },
  {
    id: "2",
    title: "The Ultimate Guide to Home Office Setup",
    excerpt: "Create the perfect home office with these essential products.",
    date: "2024-04-10",
    image: "/placeholder.svg?height=200&width=400",
    category: "Lifestyle",
    author: "John Doe",
  },
  {
    id: "3",
    title: "Best Tech Gadgets of 2024",
    excerpt: "A comprehensive review of this year's most innovative tech products.",
    date: "2024-04-05",
    image: "/placeholder.svg?height=200&width=400",
    category: "Technology",
    author: "Alex Johnson",
  },
  {
    id: "4",
    title: "Sustainable Fashion: Eco-Friendly Brands",
    excerpt: "Explore environmentally conscious fashion brands making a difference.",
    date: "2024-03-28",
    image: "/placeholder.svg?height=200&width=400",
    category: "Fashion",
    author: "Emma Wilson",
  },
  {
    id: "5",
    title: "Kitchen Gadgets That Will Change Your Cooking",
    excerpt: "Innovative kitchen tools to make meal preparation easier.",
    date: "2024-03-25",
    image: "/placeholder.svg?height=200&width=400",
    category: "Lifestyle",
    author: "David Chen",
  },
]

interface RelatedBlogPostsProps {
  currentPostId: string
  category: string
  limit?: number
}

export function RelatedBlogPosts({ currentPostId, category, limit = 3 }: RelatedBlogPostsProps) {
  // Filter posts by category and exclude current post
  const relatedPosts = allBlogPosts
    .filter((post) => post.id !== currentPostId && post.category === category)
    .slice(0, limit)

  // If not enough posts in same category, fill with other posts
  if (relatedPosts.length < limit) {
    const otherPosts = allBlogPosts
      .filter((post) => post.id !== currentPostId && post.category !== category)
      .slice(0, limit - relatedPosts.length)
    relatedPosts.push(...otherPosts)
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {relatedPosts.map((post) => (
        <Link key={post.id} href={`/blog/${post.id}`} className="group">
          <Card className="h-full overflow-hidden transition-all hover:shadow-md">
            <div className="relative aspect-[16/9]">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <Badge className="absolute left-2 top-2">{post.category}</Badge>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date}>{post.date}</time>
              </div>
              <h3 className="mt-2 font-semibold line-clamp-2">{post.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <p className="text-sm font-medium">By {post.author}</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
