"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Import the Firestore function
import { getFeaturedCollections } from "../../firebase/firebase_services/firestore";

interface FirestoreCollection {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

export default function Collections() {
  const [collections, setCollections] = useState<FirestoreCollection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const featured = await getFeaturedCollections();
        setCollections(featured as FirestoreCollection[]);
      } catch (error) {
        console.error("Error fetching featured collections:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6">
          <h2 className="text-center text-white">Loading Collections...</h2>
        </div>
      </section>
    );
  }

  if (!collections.length) {
    return (
      <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-6 text-center text-white">
          <h2>No featured collections found.</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-sm font-light tracking-[0.3em] text-yellow-400 mb-4">
            DISCOVER OUR
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Featured Collections
          </h3>
          <div className="w-24 h-1 mx-auto bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              // For the URL, you might do something like /shop?category={collection.id}
              // or /collection/{collection.id}. Adjust as needed.
              href={`/shop?category=${collection.id}`}
              className="group relative block rounded-lg overflow-hidden"
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/20 z-10" />

              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                {/* If collection.image is missing, you can use a fallback */}
                <Image
                  src={collection.image || "/placeholder.jpg"}
                  alt={collection.name}
                  fill
                  className="object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <div className="overflow-hidden">
                  <h4 className="text-2xl font-serif text-white mb-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    {collection.name}
                  </h4>
                </div>

                <div className="overflow-hidden">
                  <p className="text-gray-300 text-sm mb-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-200">
                    {collection.description}
                  </p>
                </div>

                <div className="overflow-hidden">
                  <div className="transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-300">
                    <span className="inline-flex items-center text-yellow-400 text-sm font-medium">
                      Explore Collection
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
