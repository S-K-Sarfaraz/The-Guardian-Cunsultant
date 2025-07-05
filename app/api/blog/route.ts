import { NextResponse } from "next/server";
import { db } from "@/utils/dbConfig";
import { Blog } from "@/utils/schema";
import { eq } from "drizzle-orm"; // Import eq to build your WHERE clause

// POST endpoint for adding a new blog entry
export async function POST(request: Request) {
  try {
    const { title, content, bannerImage } = await request.json();
    const insertedData = await db
      .insert(Blog)
      .values({
        title,
        content,
        bannerImage,
      })
      .returning();
    return NextResponse.json({ success: true, data: insertedData });
  } catch (error) {
    console.error("Error inserting blog data:", error);
    return NextResponse.json({ success: false, error: "Failed to save blog data" }, { status: 500 });
  }
}

// GET endpoint for fetching blog entries.
// To support fetching a single blog, you can check for an id query parameter.
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    let blogs;
    if (id) {
      blogs = await db.select().from(Blog).where(eq(Blog.id, parseInt(id)));
      // Return a single blog if found
      return NextResponse.json({ success: true, data: blogs[0] });
    } else {
      blogs = await db.select().from(Blog);
      return NextResponse.json({ success: true, data: blogs });
    }
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return NextResponse.json({ success: false, error: "Failed to fetch blog data" }, { status: 500 });
  }
}

// DELETE endpoint for deleting a blog entry
export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    await db.delete(Blog).where(eq(Blog.id, id));
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog data:", error);
    return NextResponse.json({ success: false, error: "Failed to delete blog data" }, { status: 500 });
  }
}

// PUT endpoint for updating an existing blog entry
export async function PUT(request: Request) {
  try {
    const { title, content, bannerImage } = await request.json();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing blog id" }, { status: 400 });
    }
    const updatedData = await db
      .update(Blog)
      .set({ title, content, bannerImage, updatedAt: new Date() })
      .where(eq(Blog.id, parseInt(id)))
      .returning();
    return NextResponse.json({ success: true, data: updatedData });
  } catch (error) {
    console.error("Error updating blog data:", error);
    return NextResponse.json({ success: false, error: "Failed to update blog data" }, { status: 500 });
  }
}
