'use client';
import { useEffect, useState, useCallback } from "react";
import { Blog7 } from "@/components/blog7";

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  // Wrap the Blog7 component with a container to allow vertical scrolling
  return (
    <div style={{ overflowY: "auto", maxHeight: "calc(100vh - 100px)" }}>
      <Blog7 {...data} onEdit={onEdit} onRefresh={fetchData} />
    </div>
  );
}

export { BlogList };
