import Link from "next/link"
import type { Metadata } from "next"
import { ExternalLink } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Admin | ShopBlog",
  description: "Admin dashboard for ShopBlog",
}

export default function AdminPage() {
  return (
    <main className="container py-12">
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage your e-commerce store and blog content</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Decap CMS</CardTitle>
              <CardDescription>Manage your content with Decap CMS</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Decap CMS provides a user-friendly interface to manage your e-commerce products and blog content. Only
                authorized users can access the CMS.
              </p>
              <Button asChild>
                <Link href="/admin/decap" className="flex items-center gap-2">
                  Access CMS
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage user permissions for the CMS</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-sm text-muted-foreground">
                Control who can edit content in the CMS. Only administrators can grant access to other users.
              </p>
              <Button asChild>
                <Link href="/admin/users" className="flex items-center gap-2">
                  Manage Users
                  <ExternalLink className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
