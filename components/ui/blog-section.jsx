'use client'
import React, { useEffect, useState } from "react";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        if (data.success) {
          setBlogs(data.data);
        }
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto flex flex-col gap-14">
        <div className="flex w-full flex-col sm:flex-row sm:justify-between sm:items-center gap-8">
          <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
            Latest articles
          </h4>
          {/* Uncomment the button below if needed */}
          {/* <Button className="gap-4">
            View all articles <MoveRight className="w-4 h-4" />
          </Button> */}
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="flex flex-col gap-2 hover:opacity-75 cursor-pointer"
              >
                <div
                  className="bg-muted rounded-md aspect-video mb-4"
                  style={{
                    backgroundImage: blog.image ? `url(${blog.image})` : "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <h3 className="text-xl tracking-tight">{blog.title}</h3>
                <p className="text-muted-foreground text-base">
                  {blog.summary || "No summary available."}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export { Blog };
