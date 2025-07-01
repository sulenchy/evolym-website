import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { blogPost } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getLatestPosts(posts: blogPost[]): blogPost[] {
  return posts
    .slice() // Create a copy to avoid mutating the original array
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);
}
