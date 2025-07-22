import { Metadata } from "next";
import React from "react";
import { loadJsonContent } from "@/lib/loadJsonContent";

// Replace with your actual Decap CMS API endpoint
const CMS_API_URL = "https://your-decap-cms-site/api/collections/pages/entries/about-us";

export const metadata: Metadata = {
    title: "About Us",
    description: "Learn more about our company and team.",
};

async function fetchAboutData() {
    const res = await loadJsonContent("/_content/about");
    if (!res.ok) throw new Error("Failed to fetch About Us data");
    const data = await res.json();
    // Adjust this according to your Decap CMS structure
    return data.entry || data;
}

export default async function AboutPage() {
    const aboutData = await fetchAboutData();

    return (
        <main className="max-w-3xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-6">{aboutData.title || "About Us"}</h1>
            <div className="prose prose-lg">
                {/* If content is markdown, use a markdown renderer like react-markdown */}
                <p>{aboutData.body || aboutData.content || "No content available."}</p>
            </div>
        </main>
    );
}