"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ArrowRight, MenuIcon, X } from "lucide-react";
import Logo from "./../assets/logosaas_3.png";

function Header() {
  const { user, isSignedIn } = useUser();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <header className="sticky top-0 backdrop-blur-sm z-50">
      {/* Top info bar */}
      <div className="flex justify-center items-center py-3 bg-black text-white text-sm gap-2">
        <p className="text-white/60 hidden md:block">
          We are here to help you manage your expenses.
        </p>
        <div className="inline-flex items-center gap-1">
          <p>Get Started for free</p>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
      {/* Main header */}
      <div className="py-5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Image src={Logo} alt="logo" height={65} width={220} />
            {/* Mobile menu icon */}
            <div className="md:hidden">
              {mobileMenuOpen ? (
                <X onClick={toggleMobileMenu} className="h-6 w-6 cursor-pointer" />
              ) : (
                <MenuIcon onClick={toggleMobileMenu} className="h-6 w-6 cursor-pointer" />
              )}
            </div>
            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center gap-6 text-black/60">
              <Link href="/blog">
                <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center tracking-tight">
                  Blog
                </button>
              </Link>
              {isSignedIn ? (
                <>
                  <Link href="/dashboard">
                    <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center tracking-tight">
                      Dashboard
                    </button>
                  </Link>
                  <UserButton />
                </>
              ) : (
                <Link href="/sign-in">
                  <button className="bg-black text-white px-4 py-2 rounded-lg font-medium inline-flex items-center tracking-tight">
                    Sign In
                  </button>
                </Link>
              )}
            </nav>
          </div>
          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="mt-4 md:hidden">
              <nav className="flex flex-col gap-4 text-black/80">
                {isSignedIn ? (
                  <>
                    <Link href="/dashboard">
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="bg-black text-white px-4 py-2 rounded-lg font-medium"
                      >
                        Dashboard
                      </button>
                    </Link>
                    <div onClick={() => setMobileMenuOpen(false)}>
                      <UserButton />
                    </div>
                  </>
                ) : (
                  <Link href="/sign-in">
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="bg-black text-white px-4 py-2 rounded-lg font-medium"
                    >
                      Sign In
                    </button>
                  </Link>
                )}
                {/* You can add additional mobile navigation links here */}
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
