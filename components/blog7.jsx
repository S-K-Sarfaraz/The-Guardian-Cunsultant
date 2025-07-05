"use client";
import { useState } from "react";
import { ArrowRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import RichTextRenderer from "@/components/RichTextRenderer";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const Blog7 = ({
  tagline = "Latest Updates",
  heading = "Blog Posts",
  description = "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
  buttonText = "View all articles",
  buttonUrl = "https://shadcnblocks.com",
  posts = [{}],
  onEdit,      // Callback for editing a blog
  onRefresh,   // Callback to re-fetch data after deletion
}) => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const stripHtmlTags = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  // Handle deletion of a blog post
  const handleDelete = async () => {
    try {
      const response = await fetch("/api/blog", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selectedPost.id }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Blog deleted successfully!");
        // Re-fetch the latest data so the cards update
        onRefresh && onRefresh();
        setShowConfirm(false);
        setSelectedPost(null);
      } else {
        toast.error("Failed to delete the blog.");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("An error occurred while deleting the blog.");
    }
  };

  return (
    <>
      <section className="py-32">
        <div className="container mx-auto flex flex-col items-center gap-16 lg:px-16">
          <div className="text-center">
            <h2 className="mb-3 text-pretty text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl">
              {heading}
            </h2>
            <p className="mb-8 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
              {description}
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {posts.map((post) => (
              <Card
                key={post.id}
                className="grid grid-rows-[auto_auto_1fr_auto] cursor-pointer"
                onClick={() => setSelectedPost(post)}
              >
                <div className="aspect-[16/9] w-full">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <CardHeader>
                  <h3 className="text-lg font-semibold hover:underline md:text-xl">
                    {post.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="text-muted-foreground">
                    {stripHtmlTags(post.summary)}
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center text-foreground hover:underline">
                    Read more
                    <ArrowRight className="ml-2 size-4" />
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Modal for detailed blog view */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white max-w-3xl w-full p-6 rounded-lg relative max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              <X className="h-6 w-6" />
            </button>
            <div className="mb-4">
              <img
                src={selectedPost.image}
                alt={selectedPost.title}
                className="w-full h-auto object-cover rounded"
              />
            </div>
            <h2 className="text-2xl font-bold mb-4">
              {selectedPost.title}
            </h2>
            <div className="prose max-w-none">
              {selectedPost.content ? (
                <RichTextRenderer content={selectedPost.content} />
              ) : (
                <p>{stripHtmlTags(selectedPost.summary)}</p>
              )}
            </div>

            {/* Edit and Delete Buttons */}
            <div className="flex justify-end gap-4 mt-4">
              <Button onClick={() => onEdit(selectedPost.id)}>Edit</Button>
              <Button variant="destructive" onClick={() => setShowConfirm(true)}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow">
            <p className="mb-4">Are you sure you want to delete this blog?</p>
            <div className="flex gap-4 justify-end">
              <Button onClick={() => setShowConfirm(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleDelete}>
                Yes, Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export { Blog7 };
