"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { notFound, useParams } from "next/navigation";
import { BlogShareButtons } from "@/components/blog-share-buttons";
import { RelatedBlogPosts } from "@/components/related-blog-posts";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchBlogs } from "@/lib/features/blog/blogSlice";
import { AppDispatch, RootState } from "@/lib/store";
import { BlogPost } from "@/lib/types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

export default function BlogPostPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { posts: allBlogPosts, status } = useSelector(
    (state: RootState) => state.blog
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
  }, [dispatch, status]);

  const blogPost = allBlogPosts.find((post: BlogPost) => post.slug === id);

  if (status === "loading") {
    return <Skeleton className="h-96 w-full" />;
  }

  if (status === "succeeded" && !blogPost) {
    return notFound();
  }

  if (!blogPost) {
    // This will be caught by the next line, but it's good practice to have it.
    return notFound();
  }

  const relatedPosts = allBlogPosts.filter(
    (post) => post.category === blogPost.category && post.slug !== blogPost.slug
  );

  return (
    <main className="container py-12">
      <article className="prose prose-lg mx-auto max-w-3xl bg-white rounded-xl shadow-md p-8">
        <header className="mb-6 border-b pb-4">
        <h1 className="text-4xl font-extrabold mb-2">{blogPost.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
        <span>{new Date(blogPost.date).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}</span>
        {blogPost.category && (
          <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">{blogPost.category}</span>
        )}
        </div>
      </header>
      {blogPost.image && (
        <img
        src={blogPost.image}
        alt={blogPost.title}
        className="mb-8 w-full max-h-96 rounded-lg object-cover shadow"
        />
      )}
      
      <section className="prose prose-lg max-w-none mt-10 mb-8 leading-relaxed text-gray-800">
        <ReactMarkdown
          children={blogPost.content}
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
        h1: ({node, ...props}) => <h1 className="mt-10 mb-4 text-3xl font-bold" {...props} />,
        h2: ({node, ...props}) => <h2 className="mt-8 mb-3 text-2xl font-semibold" {...props} />,
        h3: ({node, ...props}) => <h3 className="mt-6 mb-2 text-xl font-semibold" {...props} />,
        p: ({node, ...props}) => <p className="mb-5" {...props} />,
        ul: ({node, ...props}) => <ul className="list-disc ml-6 mb-5" {...props} />,
        ol: ({node, ...props}) => <ol className="list-decimal ml-6 mb-5" {...props} />,
        li: ({node, ...props}) => <li className="mb-2" {...props} />,
        blockquote: ({node, ...props}) => (
          <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-6" {...props} />
        ),
        code: ({node, ...props}) => (
          <code className="bg-gray-100 rounded px-1 py-0.5 text-sm font-mono" {...props} />
        ),
        pre: ({node, ...props}) => (
          <pre className="bg-gray-900 text-gray-100 rounded-lg p-4 overflow-x-auto my-6" {...props} />
        ),
        a: ({node, ...props}) => (
          <a className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer" {...props} />
        ),
        img: ({node, ...props}) => (
          <img className="rounded-lg shadow my-6 max-w-full h-auto" {...props} />
        ),
          }}
        />
      </section>
      </article>

      <div className="mt-8 flex justify-center">
      {/* <BlogShareButtons blogPost={blogPost} /> */}
      </div>

      {relatedPosts.length > 0 && (
      <section className="mt-16 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
        {/* <RelatedBlogPosts blogPosts={relatedPosts} /> */}
      </section>
      )}
    </main>
  );
}
