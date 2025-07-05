'use client';
import { useEffect, useState, useCallback } from "react";
import { PublicBlog } from "@/components/PublicBlog";

function BlogList({ onEdit }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Function to fetch the blog data.
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog");
      const result = await res.json();
      if (result.success) {
        const posts = result.data.map(blog => ({
          id: blog.id,
          title: blog.title,
          content: blog.content, // Include full content for editing
          summary:
            blog.content.length > 150
              ? blog.content.slice(0, 150) + "..."
              : blog.content,
          label: "Blog Post",
          author: "Admin",
          published: new Date(blog.createdAt).toLocaleDateString(),
          url: `/blog/${blog.id}`,
          image: blog.bannerImage,
        }));

        setData({
          tagline: "Latest Updates",
          heading: "Blog Posts",
          description:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Elig doloremque mollitia fugiat omnis! Porro facilis quo animi consequatur. Explicabo.",
          buttonText: "Explore all posts",
          buttonUrl: "https://www.shadcnblocks.com",
          posts: posts,
        });
      } else {
        setError("Failed to load blog data");
      }
    } catch (err) {
      console.error("Error fetching blog data:", err);
      setError("Error fetching blog data");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg overflow-hidden animate-pulse"
            >
              <div className="aspect-[16/9] bg-gray-300"></div>
              <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                <div className="h-3 bg-gray-300 rounded w-full"></div>
                <div className="h-3 bg-gray-300 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  // Removed vertical scrolling styles from the container
  return (
    <div>
      <PublicBlog {...data} onEdit={onEdit} onRefresh={fetchData} />
    </div>
  );
}

export { BlogList };
