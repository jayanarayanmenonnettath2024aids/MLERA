"use client";

import Link from "next/link";
import { ChevronLeft, Mail, MessageCircle, Shield, TrendingUp } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ProgressBar from "@/components/shared/ProgressBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function LogisticRegression() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto max-w-7xl px-6 lg:px-8 py-8 space-y-8">
        <div className="space-y-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Learning Path", href: "/learning-path" },
              { label: "Logistic Regression" },
            ]}
          />

          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 md:text-5xl text-center">
            Logistic Regression: Making Yes/No Decisions
          </h1>

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="w-full lg:max-w-md">
              <ProgressBar current={2} total={5} />
            </div>
            <Link href="/linear-regression">
              <Button variant="outline" size="default" className="gap-2 w-full sm:w-auto">
                <ChevronLeft className="h-4 w-4" />
                Previous Module
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <Card className="border-2 border-border shadow-xl bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-purple-500/5">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
                Like Netflix Recommending Shows, But for Decisions! 🎬
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Ever wonder how your email knows what's spam? Or how apps decide to show you certain ads? 
                That's Logistic Regression - the algorithm that makes smart "yes or no" decisions!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Real-World Examples */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 text-center mb-6">
            Where You've Already Seen This (Without Knowing It!)
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-2 border-border shadow-xl hover:shadow-2xl hover:border-pink-500/50 transition-all cursor-pointer group">
              <CardHeader>
                <Mail className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg">Email Spam Filter</CardTitle>
                <CardDescription>
                  "Is this spam?" Your email decides in milliseconds
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Words like "FREE"</span>
                    <span className="font-bold text-red-600">🚫 Spam</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">From your friend</span>
                    <span className="font-bold text-green-600">✓ Safe</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-border shadow-xl hover:shadow-2xl hover:border-purple-500/50 transition-all cursor-pointer group">
              <CardHeader>
                <Shield className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg text-foreground">Fraud Detection</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Banks catching suspicious transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Usual coffee shop</span>
                    <span className="font-bold text-green-600">✓ OK</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">$5000 in Belarus</span>
                    <span className="font-bold text-red-600">🚫 Block</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-border shadow-xl hover:shadow-2xl hover:border-cyan-500/50 transition-all cursor-pointer group">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg text-foreground">Social Media</CardTitle>
                <CardDescription className="text-muted-foreground">
                  "Will you click this post?"
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Cat videos</span>
                    <span className="font-bold text-green-600">✓ Show</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Boring ad</span>
                    <span className="font-bold text-red-600">🚫 Skip</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-border shadow-xl hover:shadow-2xl hover:border-purple-500/50 transition-all cursor-pointer group">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg text-foreground">Health Apps</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Medical risk predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Normal vitals</span>
                    <span className="font-bold text-green-600">✓ Healthy</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">High risk factors</span>
                    <span className="font-bold text-red-600">⚠ Alert</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* The Simple Idea */}
        <Card className="border-2 border-border shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-foreground">The Super Simple Idea</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl p-6 border border-purple-500/20">
              <p className="text-lg text-center font-medium">
                Instead of predicting <span className="text-purple-600 font-bold">"how much"</span> like Linear Regression,<br />
                Logistic Regression predicts <span className="text-pink-600 font-bold">"yes or no"</span> / <span className="text-pink-600 font-bold">"true or false"</span>
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-purple-600">Linear Regression</h3>
                <ul className="space-y-2 text-foreground">
                  <li>→ How much will this house cost? <span className="font-mono">$350,000</span></li>
                  <li>→ What's my exam score? <span className="font-mono">87.5</span></li>
                  <li>→ Revenue prediction? <span className="font-mono">$12,450</span></li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-pink-600">Logistic Regression</h3>
                <ul className="space-y-2 text-foreground">
                  <li>→ Will I buy this house? <span className="font-mono">Yes/No</span></li>
                  <li>→ Will I pass the exam? <span className="font-mono">Pass/Fail</span></li>
                  <li>→ Will customer buy? <span className="font-mono">Buy/Skip</span></li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* How It Works - Relatable */}
        <Card className="border-2 border-border shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-foreground">How It Actually Works (Non-Technical)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Look at Past Examples</h4>
                  <p className="text-muted-foreground text-sm">
                    Like learning from history: "Last 100 emails with word 'WINNER' were spam"
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Find Patterns</h4>
                  <p className="text-muted-foreground text-sm">
                    Discovers: "Emails from unknown senders + urgent language = probably spam"
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Calculate Probability</h4>
                  <p className="text-muted-foreground text-sm">
                    Doesn't just say yes/no - gives you: "82% chance this is spam"
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/30">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Make Decision</h4>
                  <p className="text-muted-foreground text-sm">
                    If probability {`>`} 50%, it's a YES. Otherwise, it's a NO. Simple!
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Why This Matters */}
        <Card className="border-2 border-border shadow-xl bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-purple-500/5">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-foreground">Why Should You Care?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="text-4xl mb-2">🎯</div>
                <h3 className="font-semibold text-foreground">Super Common</h3>
                <p className="text-sm text-muted-foreground">
                  Used in thousands of apps you use daily
                </p>
              </div>

              <div className="text-center space-y-2">
                <div className="text-4xl mb-2">⚡</div>
                <h3 className="font-semibold text-foreground">Fast & Efficient</h3>
                <p className="text-sm text-muted-foreground">
                  Makes millions of decisions per second
                </p>
              </div>

              <div className="text-center space-y-2">
                <div className="text-4xl mb-2">🧠</div>
                <h3 className="font-semibold text-foreground">Easy to Understand</h3>
                <p className="text-sm text-muted-foreground">
                  One of the first ML algorithms beginners learn
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coming Soon */}
        <Card className="border-2 border-dashed border-purple-500/50">
          <CardContent className="p-8 text-center space-y-4">
            <div className="text-6xl">🚧</div>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">Interactive Module Coming Soon!</h3>
            <p className="text-foreground max-w-2xl mx-auto">
              We're building an awesome interactive experience where you'll train your own 
              spam filter, predict customer behavior, and see logistic regression in action!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/">
                <Button variant="default">Back to Home</Button>
              </Link>
              <Link href="/linear-regression">
                <Button variant="outline">Try Linear Regression</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

