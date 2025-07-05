'use client';
import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

function BlogDetail({ onEdit }) {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blog");
      const result = await res.json();
      if (result.success) {
        const found = result.data.find((blog) => String(blog.id) === id);
        if (found) {
          const blogData = {
            id: found.id,
            title: found.title,
            content: found.content,
            summary:
              found.content.length > 150
                ? found.content.slice(0, 150) + "..."
                : found.content,
            label: "Blog Post",
            author: "Admin",
            published: new Date(found.createdAt).toLocaleDateString(),
            url: `/blog/${found.id}`,
            image: found.bannerImage,
          };
          setBlog(blogData);
        } else {
          setError("Blog not found");
        }
      } else {
        setError("Failed to load blog data");
      }
    } catch (err) {
      console.error("Error fetching blog data:", err);
      setError("Error fetching blog data");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) return <p>{error}</p>;
  if (!blog) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
        <p className="text-base text-gray-700 mb-4">
          <span className="italic">Authored by</span>{" "}
          <span className="font-semibold">{blog.author}</span>{" "}
          <span className="italic">on</span>{" "}
          <span className="font-semibold">{blog.published}</span>
        </p>
        {blog.image && (
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-auto object-cover rounded mb-4"
          />
        )}
        <div
          className="prose mb-6"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        {onEdit && (
          <Button onClick={() => onEdit(blog.id)}>Edit</Button>
        )}
      </div>
    </div>
  );
}

export default BlogDetail;
