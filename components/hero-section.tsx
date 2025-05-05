import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative bg-slate-900 text-white">
      <div className="container flex flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">Shop the Latest Trends</h1>
        <p className="max-w-[700px] text-lg text-slate-300 md:text-xl">
          Discover our curated collection of premium products and stay updated with our expert blog content.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
            <Link href="/products">
              Shop Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
            <Link href="/blog">Read Our Blog</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
