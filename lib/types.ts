export type BlogPost = {
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    date: string;
    image: string;
    category: string;
    author: string;
  }

  export type ProductType = {
    slug: string;
    name: string;
    price: number;
    image: string;
    category: string;
    isNew: boolean;
  }