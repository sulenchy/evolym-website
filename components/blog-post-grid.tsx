import Link from "next/link";
import Image from "next/image";
import { Calendar } from "lucide-react";
import { BlogPost } from "@/lib/types";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { set } from "date-fns";

export function BlogPostGrid({ blogPosts }: { blogPosts: BlogPost[] }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [noRecordFound, setNoRecordFound] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const postsPerPage = 2;
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);

  useEffect(() => {
    if (searchTerm) {
      const filteredPosts = blogPosts.filter((post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      filteredPosts.length === 0 ? setNoRecordFound(true) : setNoRecordFound(false);
      setPosts(filteredPosts);
      setTotalPages(Math.ceil(filteredPosts.length / postsPerPage));
      setCurrentPage(1);
    } else {
      setPosts(blogPosts);
      setTotalPages(Math.ceil(blogPosts.length / postsPerPage));
    }
  }, [searchTerm, blogPosts]);

  return (
    <div className="space-y-8">
      <div className="relative max-w-md mx-auto">
      <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
      <Input
        type="search"
        placeholder="Search posts..."
        className="pl-10 py-3 rounded-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      </div>

      {noRecordFound ? (
        <div className="text-center text-muted-foreground py-12">
          No blog posts found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {posts
        .slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)
        .map((post) => (
          <Link key={post.slug} href={`/blogs/${post.slug}`} className="group">
            <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-lg">
          <div className="relative aspect-[16/9]">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <Badge className="absolute left-3 top-3">{post.category}</Badge>
          </div>
          <CardContent className="p-6 flex-1 flex flex-col">
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
            <h3 className="mt-1 font-semibold text-lg">{post.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
              {post.excerpt}
            </p>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <p className="text-sm font-medium">By {post.author}</p>
          </CardFooter>
            </Card>
          </Link>
        ))}
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-4 mt-4">
      <button
        className="px-3 py-1 rounded bg-muted text-muted-foreground disabled:opacity-50"
        onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        className="px-3 py-1 rounded bg-muted text-muted-foreground disabled:opacity-50"
        onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
      </div>
    </div>
  );
}
