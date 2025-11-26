"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowLeft, Rocket, Construction } from "lucide-react";

export default function ComingSoon() {
  const searchParams = useSearchParams();
  const feature = searchParams.get("feature") || "This Feature";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto max-w-7xl px-6 lg:px-8 py-12 flex items-center justify-center">
        <div className="w-full max-w-3xl space-y-8">
          {/* Animated Background */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-3xl"></div>
            <Card className="relative border-2 border-border overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500"></div>
              <CardContent className="p-12 text-center space-y-8">
                {/* Icon */}
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="relative w-24 h-24 mx-auto bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Construction className="h-12 w-12 text-white" />
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-4">
                  <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
                    Coming Soon!
                  </h1>
                  <p className="text-2xl font-semibold text-foreground">
                    {feature}
                  </p>
                </div>

                {/* Description */}
                <div className="space-y-4 max-w-xl mx-auto">
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    We're working hard to bring you this exciting feature. It will be worth the wait!
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Sparkles className="h-4 w-4 text-purple-500" />
                    <span>Stay tuned for updates</span>
                    <Sparkles className="h-4 w-4 text-pink-500" />
                  </div>
                </div>

                {/* Features Preview */}
                <div className="grid gap-4 md:grid-cols-3 pt-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20">
                    <Rocket className="h-6 w-6 text-pink-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">New Features</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20">
                    <Sparkles className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">Enhanced Experience</p>
                  </div>
                  <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                    <Construction className="h-6 w-6 text-cyan-500 mx-auto mb-2" />
                    <p className="text-sm font-medium text-foreground">In Development</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-center flex-wrap pt-4">
                  <Link href="/">
                    <Button
                      size="lg"
                      variant="outline"
                      className="gap-2 border-2 border-border hover:border-purple-500/50"
                    >
                      <ArrowLeft className="h-5 w-5" />
                      Back to Home
                    </Button>
                  </Link>
                  <Link href="/learning-path">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 gap-2"
                    >
                      <Rocket className="h-5 w-5" />
                      Explore Learning Path
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Info */}
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              In the meantime, check out our available courses and start building ML models!
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/linear-regression">
                <Button variant="ghost" size="sm" className="hover:text-pink-500">
                  Linear Regression →
                </Button>
              </Link>
              <Link href="/logistic-regression">
                <Button variant="ghost" size="sm" className="hover:text-purple-500">
                  Logistic Regression →
                </Button>
              </Link>
              <Link href="/neural-networks">
                <Button variant="ghost" size="sm" className="hover:text-cyan-500">
                  Neural Networks →
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
