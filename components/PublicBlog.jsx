"use client";
import { Button } from "@/components/ui/button";
import RichTextRenderer from "@/components/RichTextRenderer";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

const PublicBlog = ({
  tagline = "Latest Updates",
  heading = "Blog Posts",
  description = "Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights.",
  buttonText = "View all articles",
  buttonUrl = "https://shadcnblocks.com",
  posts = [{}],
  onEdit,      // Callback for editing a blog
  onRefresh,   // Callback to re-fetch data after deletion
}) => {
  const stripHtmlTags = (html) => {
    if (!html) return "";
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  return (
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
            <a key={post.id} href={post.url} className="cursor-pointer">
              <Card className="grid grid-rows-[auto_auto_1fr_auto]">
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
                  </div>
                </CardFooter>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export { PublicBlog };
