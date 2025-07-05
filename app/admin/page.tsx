"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  UserCog2,
  Upload,
  MessageCircle,
  LogOut,
  User,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Dashboard from "./_components/Dashboard";
import AddBlog from "./_components/AddBlog"; // Your AddBlog component
import { BlogList } from "./_components/BlogList";

const AdminPage = () => {
  // Track active view: "dashboard", "addBlog", or "allBlogs"
  const [activeView, setActiveView] = useState("dashboard");
  const [open, setOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState(null);

  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => {
        setActiveView("dashboard");
        setEditingBlogId(null);
      },
    },
    {
      label: "Add Blog",
      href: "#",
      icon: (
        <Upload className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => {
        setActiveView("addBlog");
        setEditingBlogId(null);
      },
    },
    {
      label: "All Blogs",
      href: "#",
      icon: (
        <MessageCircle className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => {
        setActiveView("allBlogs");
        setEditingBlogId(null);
      },
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      onClick: () => {
        // Handle logout logic here
      },
    },
  ];

  // Callback for initiating editing from the blog list.
  const handleEditBlog = (id) => {
    setEditingBlogId(id);
    setActiveView("addBlog");
  };

  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-300 dark:bg-neutral-800 w-full flex-1 border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // full viewport height
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <User /> : <UserCog2 />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} onClick={link.onClick} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      <main className="flex-1 p-5">
        {activeView === "dashboard" && <Dashboard />}
        {activeView === "addBlog" && (
          <AddBlog
            editingBlogId={editingBlogId}
            onSaveSuccess={() => {
              setActiveView("allBlogs");
              setEditingBlogId(null);
            }}
          />
        )}
        {activeView === "allBlogs" && <BlogList onEdit={handleEditBlog} />}
      </main>
    </div>
  );
};

export default AdminPage;
