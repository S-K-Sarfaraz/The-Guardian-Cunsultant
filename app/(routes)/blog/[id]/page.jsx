'use client'
import dynamic from "next/dynamic";

const BlogDetail = dynamic(() => import('./BlogDetail'), { ssr: false });

export default function Page() {
  return <BlogDetail />;
}
