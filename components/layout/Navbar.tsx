"use client";

import Link from "next/link";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../shared/ThemeProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Learning Path", href: "/learning-path" },
    { label: "Challenges", href: "/coming-soon?feature=Challenges" },
    { label: "My Courses", href: "/coming-soon?feature=My%20Courses" },
    { label: "Achievements", href: "/coming-soon?feature=Achievements" },
    { label: "Buddy", href: "/coming-soon?feature=AI%20Buddy" },
    { label: "Lexicon", href: "/coming-soon?feature=ML%20Lexicon" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity" data-testid="link-home">
            <span className="text-2xl font-bold">
              <span className="text-pink-500">ML</span>
              <span className="text-purple-600 dark:text-purple-400">era</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8" data-testid="nav-links">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
                data-testid={`link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={toggleTheme}
              className="text-foreground/80 hover:text-primary hover:bg-accent rounded-lg transition-all duration-300"
              data-testid="button-theme-toggle"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              <div className="relative w-5 h-5">
                <Moon className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${theme === "light" ? "rotate-0 scale-100 opacity-100" : "rotate-90 scale-0 opacity-0"}`} data-testid="icon-moon" />
                <Sun className={`absolute inset-0 h-5 w-5 transition-all duration-500 ${theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} data-testid="icon-sun" />
              </div>
            </Button>
            <Avatar className="h-9 w-9 border-2 border-border cursor-pointer hover:border-primary transition-colors" data-testid="avatar-user">
              <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=MLera" alt="User avatar" />
              <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white text-sm font-semibold" data-testid="avatar-fallback">ML</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
}
