'use client'

import { Metadata } from "next";
import React, { use, useEffect } from "react";
import { loadJsonContent } from "@/lib/loadJsonContent";
import {useFetch} from "@/hooks/useFetch"
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/lib/store";
import { fetchAboutFailure, fetchAboutSuccess } from "@/lib/features/about/aboutSlice";

interface AboutData {
    title: string;
    description: string;
}

export default function AboutPage() {
    // const data: AboutData[] = [];

     const dispatch = useDispatch<AppDispatch>();
  const { about, status, error } = useSelector((state: RootState) => state.about);


  const { data, error: fetchError } = useFetch<AboutData[]>('/api/about');

  useEffect(() => {
  if (data) {
    dispatch(fetchAboutSuccess(data));
  }
  if (fetchError) {
    dispatch(fetchAboutFailure(fetchError));
  }
}, [data, error, dispatch]);

    return (
        <main className="max-w-3xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-bold mb-6">
                {about && about.length > 0 ? about[0].title : "About Us"}
            </h1>
            <div className="prose prose-lg">
                {/* If content is markdown, use a markdown renderer like react-markdown */}
                <p>{about && about.length > 0 ? about[0].description : "No content available."}</p>
            </div>
        </main>
    );
}