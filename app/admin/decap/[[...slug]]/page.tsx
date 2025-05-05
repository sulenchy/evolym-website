"use client"

import { useEffect } from "react"
import Script from "next/script"

export default function DecapCMSPage() {
  useEffect(() => {
    // Initialize Decap CMS when the component mounts
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", (user) => {
        if (!user) {
          window.netlifyIdentity.on("login", () => {
            document.location.href = "/admin/decap/"
          })
        }
      })
    }
  }, [])

  return (
    <>
      <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
      <Script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js" />
    </>
  )
}
