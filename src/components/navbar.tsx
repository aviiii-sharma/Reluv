"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { createClient } from "../../supabase/client";
import { Button } from "./ui/button";
import { Search, User, Heart, ShoppingCart } from "lucide-react";
import UserProfile from "./user-profile";
import { Input } from "./ui/input";
import AuthSheet from "./auth-sheet";

export default function Navbar() {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [authSheetOpen, setAuthSheetOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsScrollingUp(false);
      } else {
        // Scrolling up
        setIsScrollingUp(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    async function fetchUser() {
      try {
        const supabase = createClient();
        const { data } = await supabase.auth.getUser();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchUser();
  }, []);

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link
            href="/"
            prefetch
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-instagram-blue via-instagram-pink to-instagram-orange"
          >
            ReLuv
          </Link>

          {/* Center search button/bar */}
          <div className="flex-1 flex justify-center px-4">
            {showSearchBar ? (
              <div className="w-full max-w-md relative">
                <Input
                  placeholder="Search for items..."
                  className="pr-10"
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const searchQuery = (e.target as HTMLInputElement).value;
                      window.location.href = `/dashboard?search=${encodeURIComponent(searchQuery)}`;
                    }
                  }}
                />
                <button
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  onClick={() => setShowSearchBar(false)}
                >
                  <Search className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            ) : (
              <Button
                variant="outline"
                className="hidden sm:flex items-center gap-2"
                onClick={() => setShowSearchBar(true)}
              >
                <Search className="h-4 w-4" />
                <span>Search</span>
              </Button>
            )}
          </div>

          {/* Right side icons */}
          <div className="flex gap-2 items-center">
            <Button variant="ghost" size="icon" className="relative">
              <Heart className="h-5 w-5" />
            </Button>

            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                0
              </span>
            </Button>

            {!isLoading &&
              (user ? (
                <UserProfile />
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setAuthSheetOpen(true)}
                >
                  <User className="h-5 w-5" />
                </Button>
              ))}
          </div>
        </div>
      </nav>

      {/* Sticky search button that appears when scrolling up */}
      {!showSearchBar && isScrollingUp && lastScrollY > 100 && (
        <div className="fixed bottom-6 right-6 z-50 sm:hidden">
          <Button
            className="rounded-full h-12 w-12 shadow-lg flex items-center justify-center"
            onClick={() => setShowSearchBar(true)}
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      )}

      <AuthSheet open={authSheetOpen} onOpenChange={setAuthSheetOpen} />
    </>
  );
}
