export type blogPost = {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    image: string;
    category: string;
    author: string;
  }

  export type productType = {
    slug: string;
    name: string;
    price: number;
    image: string;
    category: string;
    isNew: boolean;
  }