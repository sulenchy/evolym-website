"use client"

import { FacebookIcon, TwitterIcon, LinkedInIcon } from "@/components/ui/social-icons";
import { LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

interface BlogShareButtonsProps {
  title: string
  url: string
}

export function BlogShareButtons({ title, url }: BlogShareButtonsProps) {
  const fullUrl = typeof window !== "undefined" ? `${window.location.origin}${url}` : url

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(
      fullUrl,
    )}`
    window.open(twitterUrl, "_blank")
  }

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`
    window.open(facebookUrl, "_blank")
  }

  const shareOnLinkedIn = () => {
    const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`
    window.open(linkedinUrl, "_blank")
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      toast({
        title: "Link copied!",
        description: "The article link has been copied to your clipboard.",
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="icon" onClick={shareOnTwitter}>
        <TwitterIcon className="h-4 w-4" />
        <span className="sr-only">Share on Twitter</span>
      </Button>
      <Button variant="outline" size="icon" onClick={shareOnFacebook}>
        <FacebookIcon className="h-4 w-4" />
        <span className="sr-only">Share on Facebook</span>
      </Button>
      <Button variant="outline" size="icon" onClick={shareOnLinkedIn}>
        <LinkedInIcon className="h-4 w-4" />
        <span className="sr-only">Share on LinkedIn</span>
      </Button>
      <Button variant="outline" size="icon" onClick={copyToClipboard}>
        <LinkIcon className="h-4 w-4" />
        <span className="sr-only">Copy link</span>
      </Button>
    </div>
  )
}
