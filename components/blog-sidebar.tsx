import Link from "next/link"
import { BlogPost } from "@/lib/types"
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react"
import { getLatestPosts } from "@/lib/utils"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store"
// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function BlogSidebar() {
  const [latestPosts, setlatestPosts] = useState<BlogPost[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const { posts: blogPosts, status } = useSelector((state: RootState) => state.blog)

  useEffect(() => {
    const latestThreePosts = getLatestPosts(blogPosts)
    setlatestPosts(latestThreePosts);
  }, []);

  return (
    <div className="space-y-6">

      {/** TODO: add the categories route and add this back */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`/blog/category/${category.id}`} className="flex justify-between text-sm hover:underline">
                  <span>{category.name}</span>
                  <span className="text-muted-foreground">({category.count})</span>
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card> */}

      <Card>
        <CardHeader>
          <CardTitle>Recent Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {latestPosts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blogs/${post.slug}`} className="block space-y-1 hover:underline">
                  <span className="font-medium">{post.title}</span>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                  
                </Link>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
      {/**TODO: Integrate the newsletter and bring this back */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Newsletter</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Subscribe to our newsletter to receive the latest updates and offers.
          </p>
          <div className="space-y-2">
            <Input placeholder="Your email address" type="email" />
            <Button className="w-full">Subscribe</Button>
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}
