import Link from "next/link"
import Image from "next/image"
import { ProductType } from "@/lib/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"



export function ProductGrid({ products }:{ products: ProductType[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product: ProductType) => (
        <Link key={product.slug} href={`/products/${product.slug}`} className="group">
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
