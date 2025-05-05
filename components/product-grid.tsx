import Link from "next/link"
import Image from "next/image"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// This would typically come from your CMS or database
const products = [
  {
    id: 1,
    name: "Premium Headphones",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    isNew: true,
  },
  {
    id: 2,
    name: "Designer Watch",
    price: 299.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    isNew: false,
  },
  {
    id: 3,
    name: "Leather Backpack",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bags",
    isNew: true,
  },
  {
    id: 4,
    name: "Wireless Earbuds",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    isNew: false,
  },
  {
    id: 5,
    name: "Smart Watch",
    price: 249.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    isNew: true,
  },
  {
    id: 6,
    name: "Casual Sneakers",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Footwear",
    isNew: false,
  },
  {
    id: 7,
    name: "Portable Speaker",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Electronics",
    isNew: false,
  },
  {
    id: 8,
    name: "Sunglasses",
    price: 59.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Accessories",
    isNew: true,
  },
]

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`} className="group">
          <Card className="overflow-hidden transition-all hover:shadow-md">
            <div className="relative aspect-square">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              {product.isNew && <Badge className="absolute right-2 top-2 bg-slate-900">New</Badge>}
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-muted-foreground">{product.category}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <p className="font-semibold">${product.price.toFixed(2)}</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  )
}
