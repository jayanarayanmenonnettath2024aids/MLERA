"use client";

import Link from "next/link";
import { ChevronLeft, Brain, Zap, Eye, MessageSquare, Palette, Smartphone, Camera, Sparkles, Music } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Breadcrumb from "@/components/layout/Breadcrumb";
import ProgressBar from "@/components/shared/ProgressBar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function NeuralNetworks() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        <div className="space-y-6">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Learning Path", href: "/learning-path" },
              { label: "Neural Networks" },
            ]}
          />

          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 md:text-5xl text-center">
            Neural Networks: AI That Thinks Like You
          </h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="w-full sm:flex-1">
              <ProgressBar current={3} total={5} />
            </div>
            <Link href="/logistic-regression">
              <Button variant="outline" size="default" className="gap-2 w-full sm:w-auto">
                <ChevronLeft className="h-4 w-4" />
                Previous Module
              </Button>
            </Link>
          </div>
        </div>

        {/* Hero Section */}
        <Card className="border-2 border-border shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="text-6xl mb-4">🧠✨</div>
              <h2 className="text-3xl font-bold text-foreground">
                The Brain Behind ChatGPT, Face ID, and Self-Driving Cars
              </h2>
              <p className="text-lg text-foreground max-w-3xl mx-auto">
                Neural Networks are like digital brains that learn from examples - 
                just like you learned to recognize faces, understand speech, and read handwriting!
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Mind-Blowing Examples */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 text-center mb-6">
            🤯 Things Neural Networks Can Do (That Feel Like Magic)
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 border-border shadow-xl hover:shadow-2xl hover:border-purple-500/50 transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <Camera className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg text-foreground">Face Recognition</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Your phone knows it's YOU, even with different hairstyles!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-foreground">
                  <p>→ Face ID on iPhone</p>
                  <p>→ Facebook auto-tagging</p>
                  <p>→ Security cameras</p>
                  <p className="text-xs pt-2 text-primary font-semibold">
                    Recognizes millions of unique faces!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-border shadow-xl hover:shadow-2xl hover:border-purple-500/50 transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg text-foreground">Language Understanding</CardTitle>
                <CardDescription className="text-muted-foreground">
                  ChatGPT, Siri, Alexa - they all use neural networks!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-foreground">
                  <p>→ ChatGPT conversations</p>
                  <p>→ Google Translate</p>
                  <p>→ Voice assistants</p>
                  <p className="text-xs pt-2 text-primary font-semibold">
                    Understands context like humans!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-border shadow-xl hover:shadow-2xl hover:border-purple-500/50 transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <Sparkles className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg text-foreground">Image Generation</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Creates art that doesn't exist - DALL-E, Midjourney, Stable Diffusion
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-foreground">
                  <p>→ AI-generated art</p>
                  <p>→ Photo editing magic</p>
                  <p>→ Style transfer</p>
                  <p className="text-xs pt-2 text-primary font-semibold">
                    Imagines things it's never seen!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-border shadow-xl hover:shadow-2xl hover:border-purple-500/50 transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <Music className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg text-foreground">Audio Processing</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Spotify recommendations, voice cloning, music generation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-foreground">
                  <p>→ Music recommendations</p>
                  <p>→ Noise cancellation</p>
                  <p>→ Voice synthesis</p>
                  <p className="text-xs pt-2 text-primary font-semibold">
                    Hears patterns we can't!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-border shadow-xl hover:shadow-2xl hover:border-purple-500/50 transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <Zap className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg text-foreground">Game AI</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Beats world champions at chess, Go, and video games!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-foreground">
                  <p>→ AlphaGo (beat world champion)</p>
                  <p>→ Game NPCs</p>
                  <p>→ Strategy optimization</p>
                  <p className="text-xs pt-2 text-primary font-semibold">
                    Learns by playing itself!
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-border shadow-xl hover:shadow-2xl hover:border-purple-500/50 transition-all duration-300 cursor-pointer group">
              <CardHeader>
                <Brain className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                <CardTitle className="text-lg text-foreground">Medical Diagnosis</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Detects diseases from X-rays better than some doctors!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-foreground">
                  <p>→ Cancer detection</p>
                  <p>→ X-ray analysis</p>
                  <p>→ Drug discovery</p>
                  <p className="text-xs pt-2 text-primary font-semibold">
                    Saves lives every day!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* How It Works - Simple Explanation */}
        <Card className="border-2 border-border shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-foreground">How Does a Neural Network "Think"?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-accent rounded-xl p-6 text-center border border-pink-500/30">
              <p className="text-lg font-medium text-foreground">
                Imagine your brain recognizing a cat. You don't think "4 legs + whiskers + meow = cat".<br />
                Your neurons just <span className="text-purple-600 font-bold">fire in a pattern</span> that means "cat!" <br />
                Neural networks work the <span className="text-pink-600 font-bold">exact same way!</span>
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-accent border border-purple-200">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent0 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Input Layer (Your Eyes) 👀</h4>
                  <p className="text-muted-foreground text-sm">
                    Receives raw data - like pixels in a photo or words in a sentence
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-accent border border-purple-200">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent0 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Hidden Layers (Your Brain Processing) 🧠</h4>
                  <p className="text-muted-foreground text-sm">
                    Millions of "neurons" light up in patterns, recognizing edges, shapes, concepts
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-accent border border-pink-500/30">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent0 text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-foreground">Output Layer (Your Decision) ✨</h4>
                  <p className="text-muted-foreground text-sm">
                    Final answer: "It's a cat!" or "Buy this stock!" or "Play this song!"
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Process */}
        <Card className="border-2 border-border shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-foreground">How Neural Networks Learn (Like You!)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-purple-600 flex items-center gap-2">
                  <span>👶</span> How You Learned as a Baby
                </h3>
                <ul className="space-y-2 text-foreground text-sm">
                  <li>→ Saw 1000s of dogs</li>
                  <li>→ Parents said "dog!" each time</li>
                  <li>→ You made mistakes (called cat a dog)</li>
                  <li>→ Got corrected, tried again</li>
                  <li>→ Eventually: Perfect at recognizing dogs!</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg text-pink-600 flex items-center gap-2">
                  <span>🤖</span> How Neural Networks Learn
                </h3>
                <ul className="space-y-2 text-foreground text-sm">
                  <li>→ Sees 1000s of dog images</li>
                  <li>→ We label them as "dog"</li>
                  <li>→ Makes mistakes (thinks cat is dog)</li>
                  <li>→ Adjusts its connections, tries again</li>
                  <li>→ Eventually: Perfect at recognizing dogs!</li>
                </ul>
              </div>
            </div>

            <div className="bg-accent rounded-xl p-6 text-center border border-pink-500/30">
              <p className="text-lg font-medium text-foreground">
                The process is called <span className="text-purple-600 font-bold">"Training"</span> - 
                and yes, it's literally teaching the AI like teaching a child! 🎓
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Why They're Revolutionary */}
        <Card className="border-2 border-border shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-foreground">Why Neural Networks Changed Everything</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center space-y-2">
                <div className="text-4xl mb-2">🚀</div>
                <h3 className="font-semibold text-foreground">Universal Problem Solver</h3>
                <p className="text-sm text-muted-foreground">
                  One approach works for images, text, audio, games, and more!
                </p>
              </div>

              <div className="text-center space-y-2">
                <div className="text-4xl mb-2">📈</div>
                <h3 className="font-semibold text-foreground">Gets Better With Data</h3>
                <p className="text-sm text-muted-foreground">
                  More data = smarter AI. That's why tech companies collect data!
                </p>
              </div>

              <div className="text-center space-y-2">
                <div className="text-4xl mb-2">💡</div>
                <h3 className="font-semibold text-foreground">Discovers Patterns We Miss</h3>
                <p className="text-sm text-muted-foreground">
                  Finds connections humans never would have thought of
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Types of Neural Networks */}
        <Card className="border-2 border-border shadow-xl hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-foreground">Different Flavors of Neural Networks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg border-2 border-purple-300 bg-accent">
                <h3 className="font-semibold text-lg mb-2 text-foreground">🖼️ Convolutional Neural Networks (CNNs)</h3>
                <p className="text-sm text-foreground mb-2">
                  Specialists in images and videos
                </p>
                <p className="text-xs text-purple-600 font-semibold">
                  Used in: Face filters, medical imaging, self-driving cars
                </p>
              </div>

              <div className="p-4 rounded-lg border-2 border-pink-300 bg-accent">
                <h3 className="font-semibold text-lg mb-2 text-foreground">💬 Recurrent Neural Networks (RNNs)</h3>
                <p className="text-sm text-foreground mb-2">
                  Great with sequences - language, time series, music
                </p>
                <p className="text-xs text-pink-600 font-semibold">
                  Used in: Text prediction, speech recognition, stock prediction
                </p>
              </div>

              <div className="p-4 rounded-lg border-2 border-purple-300 bg-accent">
                <h3 className="font-semibold text-lg mb-2 text-foreground">🤖 Transformers</h3>
                <p className="text-sm text-foreground mb-2">
                  The newest hotness - powers ChatGPT and modern AI
                </p>
                <p className="text-xs text-purple-600 font-semibold">
                  Used in: ChatGPT, GPT-4, BERT, language models
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Coming Soon */}
        <Card className="border-2 border-dashed border-pink-300 bg-accent">
          <CardContent className="p-8 text-center space-y-4">
            <div className="text-6xl">🚧</div>
            <h3 className="text-2xl font-bold text-foreground">Interactive Neural Network Playground Coming Soon!</h3>
            <p className="text-foreground max-w-2xl mx-auto">
              Build your own neural network, train it to recognize handwritten digits, 
              watch neurons light up in real-time, and understand backpropagation visually!
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/">
                <Button variant="default" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white">Back to Home</Button>
              </Link>
              <Link href="/linear-regression">
                <Button variant="outline" className="border-pink-300 text-pink-600 hover:bg-accent">Try Linear Regression</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

