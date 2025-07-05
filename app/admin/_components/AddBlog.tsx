"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";
import { toast } from "sonner";



const Editor = dynamic(
  () => import("@tinymce/tinymce-react").then((mod) => mod.Editor as any),
  {
    ssr: false,
  }
);
type AddBlogProps = {
  editingBlogId?: string;
  onSaveSuccess?: () => void;
};

export default function AddBlog({ editingBlogId, onSaveSuccess }: AddBlogProps) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [loading, setLoading] = useState(false);
  const fileInputId = useId();

  // If editing, fetch the blog data and prepopulate the form
  useEffect(() => {
    if (editingBlogId) {
      async function fetchBlog() {
        try {
          const response = await fetch(`/api/blog?id=${editingBlogId}`);
          const data = await response.json();
          if (data.success && data.data) {
            const blog = data.data;
            setTitle(blog.title);
            setContent(blog.content);
            setBannerImage(blog.bannerImage);
          }
        } catch (error) {
          console.error("Error fetching blog data:", error);
        }
      }
      fetchBlog();
    }
  }, [editingBlogId]);

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  const handleBannerImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const payload = { title, content, bannerImage };
      // If editing, use PUT; otherwise, POST
      const endpoint = editingBlogId ? `/api/blog?id=${editingBlogId}` : "/api/blog";
      const method = editingBlogId ? "PUT" : "POST";
      const response = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        // Clear the form if needed
        setTitle("");
        setContent("");
        setBannerImage("");
        toast.success(
          editingBlogId ? "Blog updated successfully!" : "Blog saved successfully!"
        );
        // Inform AdminPage to switch views (e.g. to the blog list)
        onSaveSuccess && onSaveSuccess();
      } else {
        toast.error(editingBlogId ? "Failed to update Blog." : "Failed to save Blog.");
      }
    } catch (error) {
      console.error("Save error:", error);
      toast.error("Error saving blog content.");
    }
    setLoading(false);
  };

  return (
    <div className="relative p-5 max-h-[90vh] overflow-y-auto">
      {/* Save/Update Button */}
      <div className="absolute top-5 right-5">
        <Button onClick={handleSave} disabled={loading}>
          {loading
            ? editingBlogId
              ? "Updating..."
              : "Saving..."
            : editingBlogId
            ? "Update"
            : "Save"}
        </Button>
      </div>
      <h1 className="font-bold text-3xl mb-5">
        {editingBlogId ? "Edit Blog" : "Add Blog"}
      </h1>
      {/* Title Input */}
      <div className="mb-2">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          className="w-full p-2 text-base border border-gray-300 rounded-md"
        />
      </div>
      {/* Banner Image File Input */}
      <div className="space-y-2 min-w-[300px] mb-4">
        <Label htmlFor={fileInputId}>Banner Image</Label>
        <Input
          id={fileInputId}
          type="file"
          onChange={handleBannerImageChange}
          className="p-0 pe-3 file:me-3 file:border-0 file:border-e"
        />
      </div>
      {/* Rich Text Editor */}
      <Editor
        apiKey="mc2m2hony20e98yoeq3psgr1tq3fj16x93a43dr8rxvxfd96"
        value={content}
        onEditorChange={handleEditorChange}
        init={{
          height: 500,
          menubar: true,
          plugins:
            "advlist autolink lists link image charmap preview anchor " +
            "searchreplace visualblocks code fullscreen insertdatetime media table help wordcount",
          toolbar:
            "undo redo | formatselect | bold italic backcolor | " +
            "alignleft aligncenter alignright alignjustify | " +
            "bullist numlist outdent indent | removeformat | help | image",
          image_title: true,
          automatic_uploads: true,
          file_picker_types: "image",
          file_picker_callback: (callback, value, meta) => {
            if (meta.filetype === "image") {
              const input = document.createElement("input");
              input.setAttribute("type", "file");
              input.setAttribute("accept", "image/*");
              input.onchange = function () {
                const file = this.files ? this.files[0] : null;
                if (file) {
                  const reader = new FileReader();
                  reader.onload = function () {
                    callback(reader.result, { alt: file.name });
                  };
                  reader.readAsDataURL(file);
                }
              };
              input.click();
            }
          },
          placeholder: "Start typing your content here...",
        }}
      />
    </div>
  );
}
