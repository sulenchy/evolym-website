"use client"

import { useState } from "react"
import { ShoppingCart, Plus, Minus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  price: number
  inStock: boolean
}

interface AddToCartButtonProps {
  product: Product
  className?: string
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = async () => {
    if (!product.inStock) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    // In a real app, you would add the item to cart state/context
    toast({
      title: "Added to cart!",
      description: `${quantity} × ${product.name} added to your cart.`,
    })

    setIsLoading(false)
  }

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decrementQuantity = () => {
    setQuantity((prev) => Math.max(1, prev - 1))
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">Quantity:</span>
        <div className="flex items-center border rounded-md">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={decrementQuantity} disabled={quantity <= 1}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-3 py-1 text-sm font-medium">{quantity}</span>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={incrementQuantity}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button onClick={handleAddToCart} disabled={!product.inStock || isLoading} className="w-full" size="lg">
        <ShoppingCart className="mr-2 h-5 w-5" />
        {isLoading
          ? "Adding..."
          : product.inStock
            ? `Add to Cart - $${(product.price * quantity).toFixed(2)}`
            : "Out of Stock"}
      </Button>
    </div>
  )
}
