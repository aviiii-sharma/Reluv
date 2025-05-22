"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";

interface AuthSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AuthSheet({ open, onOpenChange }: AuthSheetProps) {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{isSignIn ? "Sign In" : "Sign Up"}</SheetTitle>
        </SheetHeader>
        <div className="mt-6 flex flex-col gap-4">
          {!isSignIn && (
            <div className="grid gap-2">
              <label htmlFor="name" className="text-sm font-medium">
                Full Name
              </label>
              <Input id="name" placeholder="Enter your name" />
            </div>
          )}
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input id="email" type="email" placeholder="Enter your email" />
          </div>
          <div className="grid gap-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <Button className="mt-2">{isSignIn ? "Sign In" : "Sign Up"}</Button>
          <div className="text-center text-sm">
            {isSignIn ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setIsSignIn(false)}
                  className="text-blue-600 hover:underline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setIsSignIn(true)}
                  className="text-blue-600 hover:underline"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
          <div className="text-center text-sm">
            <Link
              href="/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
