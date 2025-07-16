import Link from "next/link"
import { Search } from "lucide-react"
import { BlogPost } from "@/lib/types"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { getLatestPosts } from "@/lib/utils"
// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// This would typically come from your CMS or database
// const categories = [
//   { id: "fashion", name: "Fashion", count: 12 },
//   { id: "technology", name: "Technology", count: 8 },
//   { id: "lifestyle", name: "Lifestyle", count: 15 },
//   { id: "travel", name: "Travel", count: 6 },
//   { id: "food", name: "Food & Cooking", count: 9 },
// ]

// const recentPosts = [
//   {
//     id: 1,
//     title: "Top 10 Summer Fashion Trends",
//     date: "April 15, 2024",
//   },
//   {
//     id: 2,
//     title: "The Ultimate Guide to Home Office Setup",
//     date: "April 10, 2024",
//   },
//   {
//     id: 3,
//     title: "Best Tech Gadgets of 2024",
//     date: "April 5, 2024",
//   },
// ]

export function BlogSidebar({blogPosts} : {blogPosts: BlogPost[] }) {
  //set state for recentPost and categoriesWithCount
  // use the the useEffect to set them

  const [latestPosts, setlatestPosts] = useState<BlogPost[]>([])
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search posts..." className="pl-8" />
          </div>
        </CardContent>
      </Card>
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
                <Link href={`/blog/${post.slug}`} className="block space-y-1 hover:underline">
                  <span className="font-medium">{post.title}</span>
                  <span className="block text-xs text-muted-foreground">{post.date}</span>
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
