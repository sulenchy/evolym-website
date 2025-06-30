"use client"

// import type { Metadata } from "next"
import  {  useState, useEffect } from 'react'
import { productType } from "@/lib/types"
import { ProductGrid } from "@/components/product-grid"
import { ProductFilters } from "@/components/product-filters"

// export const metadata: Metadata = {
//   title: "Products | ShopBlog",
//   description: "Browse our collection of premium products",
// }

export default function ProductsPage() {
  const [products, setProducts] = useState<productType[]>([])
  const [loading, setLoading] = useState(true)

   useEffect(() => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      });
  }, []);
  return (
    <main className="container py-12">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Browse our collection of premium products</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-[240px_1fr]">
          <div className="hidden md:block">
            <ProductFilters />
          </div>
          <div>
            <ProductGrid products={products} />
          </div>
        </div>
      </div>
    </main>
  )
}
