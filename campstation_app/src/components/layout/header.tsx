"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { label: "캠핑장 찾기", href: "/campsites" },
    { label: "예약 확인", href: "/bookings" },
    { label: "커뮤니티", href: "/community" },
];

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                {/* Logo */}
                <Logo />

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center space-x-6">
                    {NAV_ITEMS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-4">
                    <Button variant="ghost" asChild>
                        <Link href="/login">로그인</Link>
                    </Button>
                    <Button asChild>
                        <Link href="/signup">회원가입</Link>
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className="h-6 w-6" />
                    ) : (
                        <Menu className="h-6 w-6" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden border-t bg-background p-4 space-y-4">
                    <nav className="flex flex-col space-y-3">
                        {NAV_ITEMS.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="block px-2 py-1 text-sm font-medium text-foreground hover:text-primary transition-colors"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex flex-col space-y-2 pt-4 border-t">
                        <Button variant="ghost" asChild className="w-full justify-start">
                            <Link href="/login">로그인</Link>
                        </Button>
                        <Button asChild className="w-full justify-start">
                            <Link href="/signup">회원가입</Link>
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}
