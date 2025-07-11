
// import type { Metadata } from "next"
// import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState, use } from "react"
import { Calendar, User, ArrowLeft } from "lucide-react"
// import { blogPost } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
// import { RelatedBlogPosts } from "@/components/related-blog-posts"
import { BlogShareButtons } from "@/components/blog-share-buttons"
// import { use } from "react"
import { loadJsonContentBySlug } from "@/lib/loadJsonContent"
import { blogPost } from "@/lib/types"

// async function getBlogPost(slug: string, posts: blogPost[]) {
//   // In a real app, this would fetch from your CMS or database
//   const post = posts.find((post) => post.slug === slug)
//   return post
// }

// export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
//     const { id } = use(params);
//     const post = loadJsonContentBySlug('_contents/blogs', id)


//   if (!post) {
//     return {
//       title: "Post Not Found",
//     }
//   }

//   return {
//     title: `${post.title} | ShopBlog`,
//     description: post.excerpt,
//     openGraph: {
//       title: post.title,
//       description: post.excerpt,
//       images: [post.image],
//       type: "article",
//       publishedTime: post.date,
//       authors: [post.author],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: post.title,
//       description: post.excerpt,
//       images: [post.image],
//     },
//   }
// }

type BlogPostPageProps = {
  params: {
    id: string;
  };
}

export default function BlogPostPage({ params }: any) {
  const { id }: {id: string} = use(params);
  const post = loadJsonContentBySlug('_contents/blogs', id)
  console.log('====> ', {post})

  // const [post, setPost] = useState<blogPost | null>(null);
  // const [error, setError] = useState('');

  // useEffect(() => {
  //   fetch(`/api/blogs/${id}`)
  //     .then((res) => {
  //       if (!res.ok) throw new Error('Not found');
  //       return res.json();
  //     })
  //   .then((data) => {
  //     setPost(data)
  //     debugger
  //     console.log('data ===> ', data);
  // })
  //     .catch(() => setError('Post not found'));
  // }, [id]);

  if (!post) {
    // notFound()
    return <h1>Sorry!</h1>
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
            {post.tags.map((tag: string) => (
              <Badge key={tag} variant="outline">
                #{tag}
              </Badge>
            ))}
          </div>

          <Separator />

          {/* Share Buttons */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Share this article</h3>
            <BlogShareButtons title={post.title} url={`/blog/${id}`} />
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
        {/* <section className="mt-16">
          <h2 className="mb-8 text-2xl font-bold">Related Articles</h2>
          <RelatedBlogPosts currentPostId={post.id} category={post.category} />
        </section> */}
      </div>
    </main>
  )
}

