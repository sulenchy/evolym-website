'use client'

import Link from "next/link"
import Image from "next/image"
import { Calendar } from "lucide-react"
import {useState, useEffect} from "react"
import { blogPost } from "@/lib/types"
import { getLatestPosts } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function LatestBlogPosts() {
  const [latestPosts, setlatestPosts] = useState<blogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/blogs')
      .then((res) => res.json())
      .then((data) => {
        const latestThreePosts = getLatestPosts(data)
        setlatestPosts(latestThreePosts);
        setLoading(false);
      });
  }, []);
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {latestPosts.map((post) => (
        <Link key={post.slug} href={`/blogs/${post.slug}`} className="group">
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
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <h3 className="mt-2 font-semibold">{post.title}</h3>
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
