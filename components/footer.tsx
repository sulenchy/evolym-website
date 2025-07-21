import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export function Footer() {
  return (  
    <footer className="border-t bg-slate-50">
      <div className="container py-8 md:py-12 pl-4 md:pl-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
            <h3 className="text-lg font-semibold">Evolym</h3>
            <p className="text-sm text-muted-foreground">
              Modern e-commerce platform with integrated blog and content management.
            </p>
            <div className="flex space-x-4 mt-2">
              <Link href="#" className="text-muted-foreground hover:text-foreground flex items-center">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground flex items-center">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground flex items-center">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          {/* <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-foreground">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-muted-foreground hover:text-foreground">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/new-arrivals" className="text-muted-foreground hover:text-foreground">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link href="/sale" className="text-muted-foreground hover:text-foreground">
                  Sale
                </Link>
              </li>
            </ul>
          </div> */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Blog</h3>
            <ul className="space-y-2 text-sm mt-2">
              <li>
                <Link href="/blogs" className="text-muted-foreground hover:text-foreground">
                  All Posts
                </Link>
              </li>
              {/** TODO add the categories and authors and bring this back */}
              {/* <li>
                <Link href="/blogs/categories" className="text-muted-foreground hover:text-foreground">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/blogs/authors" className="text-muted-foreground hover:text-foreground">
                  Authors
                </Link>
              </li> */}
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <ul className="space-y-2 text-sm mt-2">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
              </li>
              {/* <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p className="mt-2">© {new Date().getFullYear()} ShopBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
