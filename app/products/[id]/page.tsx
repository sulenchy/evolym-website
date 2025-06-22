import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import { Star, Heart, Share2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { ProductReviews } from "@/components/product-reviews"
import { RelatedProducts } from "@/components/related-products"
import { AddToCartButton } from "@/components/add-to-cart-button"

// This would typically come from your CMS or database
const products = [
  {
    id: "1",
    name: "Premium Headphones",
    price: 199.99,
    originalPrice: 249.99,
    description:
      "Experience crystal-clear audio with our premium wireless headphones featuring active noise cancellation and 30-hour battery life.",
    longDescription: `
These premium headphones deliver exceptional sound quality with deep bass and crisp highs. The active noise cancellation technology blocks out ambient noise, allowing you to focus on your music or calls.

**Key Features:**
- Active Noise Cancellation (ANC)
- 30-hour battery life
- Quick charge: 15 minutes for 3 hours of playback
- Premium materials with comfortable padding
- Bluetooth 5.0 connectivity
- Built-in microphone for calls
- Foldable design for easy storage

**What's in the box:**
- Premium Headphones
- USB-C charging cable
- 3.5mm audio cable
- Carrying case
- User manual

Perfect for music lovers, professionals, and anyone who values high-quality audio experience.
    `,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Electronics",
    brand: "AudioTech",
    sku: "AT-PH-001",
    inStock: true,
    stockCount: 15,
    rating: 4.8,
    reviewCount: 124,
    isNew: true,
    isFeatured: true,
    tags: ["wireless", "noise-cancelling", "premium", "bluetooth"],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 ohms",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      Weight: "250g",
      Connectivity: "Bluetooth 5.0, 3.5mm",
      Warranty: "2 years",
    },
  },
  {
    id: "2",
    name: "Designer Watch",
    price: 299.99,
    originalPrice: 399.99,
    description:
      "Elegant timepiece combining classic design with modern functionality. Features sapphire crystal glass and Swiss movement.",
    longDescription: `
This designer watch represents the perfect fusion of traditional craftsmanship and contemporary style. Each piece is meticulously crafted with attention to detail.

**Key Features:**
- Swiss quartz movement for precision
- Sapphire crystal glass (scratch-resistant)
- Stainless steel case and bracelet
- Water resistant up to 100m
- Date display
- Luminous hands and markers
- Adjustable bracelet

**Specifications:**
- Case diameter: 42mm
- Case thickness: 10mm
- Band width: 20mm
- Movement: Swiss quartz
- Crystal: Sapphire
- Water resistance: 100m

This watch is perfect for both formal occasions and everyday wear, making it a versatile addition to any wardrobe.
    `,
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    category: "Accessories",
    brand: "TimeClassic",
    sku: "TC-DW-002",
    inStock: true,
    stockCount: 8,
    rating: 4.6,
    reviewCount: 89,
    isNew: false,
    isFeatured: true,
    tags: ["luxury", "swiss", "waterproof", "elegant"],
    specifications: {
      "Case Material": "Stainless Steel",
      "Band Material": "Stainless Steel",
      Movement: "Swiss Quartz",
      Crystal: "Sapphire",
      "Water Resistance": "100m",
      "Case Diameter": "42mm",
      "Case Thickness": "10mm",
      Warranty: "3 years",
    },
  },
]

async function getProduct(id: string) {
  // In a real app, this would fetch from your CMS or database
  const product = products.find((product) => product.id === id)
  return product
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: `${product.name} | ShopBlog`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.images,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: product.images,
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  return (
    <main className="container py-12">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-foreground">
              Products
            </Link>
            <span>/</span>
            <Link href={`/categories/${product.category.toLowerCase()}`} className="hover:text-foreground">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Product Images */}
          <div>
            <ProductImageGallery images={product.images} productName={product.name} />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{product.category}</Badge>
                {product.isNew && <Badge className="bg-green-500">New</Badge>}
                {discountPercentage > 0 && <Badge variant="destructive">-{discountPercentage}%</Badge>}
              </div>

              <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">{product.name}</h1>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground">{product.description}</p>

              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium">Brand:</span>
                <span>{product.brand}</span>
                <span className="mx-2">•</span>
                <span className="font-medium">SKU:</span>
                <span>{product.sku}</span>
              </div>

              <div className="flex items-center gap-2">
                {product.inStock ? (
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    In Stock ({product.stockCount} available)
                  </Badge>
                ) : (
                  <Badge variant="destructive">Out of Stock</Badge>
                )}
              </div>
            </div>

            <Separator />

            {/* Add to Cart Section */}
            <div className="space-y-4">
              <div className="flex gap-4">
                <AddToCartButton product={product} className="flex-1" />
                <Button variant="outline" size="icon">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Add to wishlist</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-5 w-5" />
                  <span className="sr-only">Share product</span>
                </Button>
              </div>

              <div className="text-sm text-muted-foreground">
                <p>• Free shipping on orders over $100</p>
                <p>• 30-day return policy</p>
                <p>• 2-year warranty included</p>
              </div>
            </div>

            <Separator />

            {/* Tags */}
            <div className="space-y-2">
              <h3 className="font-medium">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <section className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: product.longDescription.replace(/\n/g, "<br />") }} />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b pb-2">
                        <span className="font-medium">{key}:</span>
                        <span className="text-muted-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
              <ProductReviews productId={product.id} rating={product.rating} reviewCount={product.reviewCount} />
            </TabsContent>
          </Tabs>
        </section>

        {/* Related Products */}
        <section className="mt-16">
          <h2 className="mb-8 text-2xl font-bold">Related Products</h2>
          <RelatedProducts currentProductId={product.id} category={product.category} />
        </section>
      </div>
    </main>
  )
}
