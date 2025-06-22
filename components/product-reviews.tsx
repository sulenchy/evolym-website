import { Star, ThumbsUp } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

// Mock review data - would come from your database
const reviews = [
  {
    id: 1,
    author: "John Smith",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024-04-10",
    title: "Excellent quality!",
    content:
      "These headphones exceeded my expectations. The sound quality is amazing and the noise cancellation works perfectly.",
    helpful: 12,
    verified: true,
  },
  {
    id: 2,
    author: "Sarah Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4,
    date: "2024-04-08",
    title: "Great value for money",
    content:
      "Really happy with this purchase. Comfortable to wear for long periods and the battery life is as advertised.",
    helpful: 8,
    verified: true,
  },
  {
    id: 3,
    author: "Mike Wilson",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    date: "2024-04-05",
    title: "Perfect for work from home",
    content: "The noise cancellation is a game-changer for video calls. Highly recommend for anyone working from home.",
    helpful: 15,
    verified: false,
  },
]

const ratingDistribution = [
  { stars: 5, count: 78, percentage: 63 },
  { stars: 4, count: 32, percentage: 26 },
  { stars: 3, count: 10, percentage: 8 },
  { stars: 2, count: 3, percentage: 2 },
  { stars: 1, count: 1, percentage: 1 },
]

interface ProductReviewsProps {
  productId: string
  rating: number
  reviewCount: number
}

export function ProductReviews({ productId, rating, reviewCount }: ProductReviewsProps) {
  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-2xl font-bold">{rating}</span>
                <span className="text-muted-foreground">out of 5</span>
              </div>
              <p className="text-sm text-muted-foreground">{reviewCount} customer reviews</p>
            </div>

            <div className="space-y-2">
              {ratingDistribution.map((item) => (
                <div key={item.stars} className="flex items-center gap-2 text-sm">
                  <span className="w-8">{item.stars}★</span>
                  <Progress value={item.percentage} className="flex-1" />
                  <span className="w-8 text-muted-foreground">{item.count}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.author} />
                      <AvatarFallback>
                        {review.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{review.author}</span>
                        {review.verified && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">{review.date}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">{review.title}</h4>
                  <p className="text-muted-foreground">{review.content}</p>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
