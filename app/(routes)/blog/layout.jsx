'use client';
import React from 'react';
import { FAQSection } from './_components/FAQSection';
import Header from '@/app/_components/Header';

function BlogLayout({ children }) {
  return (
    <div>
      <div className="bg-white h-screen">
        <Header />
        {children}
        <FAQSection />
      </div>
    </div>
  );
}

export default BlogLayout;
