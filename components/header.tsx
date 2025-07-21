"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const routes = [
  {
    href: "/",
    label: "Home",
  },
  // {
  //   href: "/products",
  //   label: "Products",
  // },
  // {
  //   href: "/categories",
  //   label: "Categories",
  // },
  {
    href: "/blogs",
    label: "Blogs",
  },
  {
    href: "/about",
    label: "About",
  },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <div className="flex h-full flex-col justify-between">
                <div className="px-2">
                  <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
                    <span className="text-xl font-bold">Evolym</span>
                  </Link>
                  <nav className="mt-8 flex flex-col gap-4">
                    {routes.map((route) => (
                      <Link
                        key={route.href}
                        href={route.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-foreground/80",
                          pathname === route.href ? "text-foreground" : "text-foreground/60",
                        )}
                      >
                        {route.label}
                      </Link>
                    ))}
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold hidden sm:inline-block">Evolym</span>
            <span className="text-xl font-bold sm:hidden">Evolym</span>
          </Link>
          <nav className="ml-10 hidden lg:flex gap-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80",
                  pathname === route.href ? "text-foreground" : "text-foreground/60",
                )}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        {/** TODO: remove the comment and implement the cart icon */}
        {/* <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
            </Link>
          </Button>
        </div> */}
      </div>
    </header>
  )
}
