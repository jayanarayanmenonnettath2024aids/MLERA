import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, Rocket, Code2, LineChart, GraduationCap, Lightbulb, ChevronRight, PlayCircle } from "lucide-react";

export default function Home() {
  const courses = [
    {
      title: "Linear Regression",
      description: "Master the fundamentals of prediction and trend analysis",
      difficulty: "Beginner",
      duration: "45 min",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Logistic Regression", 
      description: "Learn classification and probability-based decisions",
      difficulty: "Intermediate",
      duration: "60 min",
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Neural Networks",
      description: "Dive into deep learning and artificial intelligence",
      difficulty: "Advanced",
      duration: "90 min",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section with Gradient Background */}
        <section className="py-20 md:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative z-10 text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30">
              <Sparkles className="h-4 w-4 text-pink-500" />
              <span className="text-sm font-medium text-foreground">Your AI Learning Journey Starts Here</span>
            </div>
            
            <h1 className="text-6xl font-extrabold md:text-7xl lg:text-8xl leading-tight" data-testid="heading-hero">
              Build. Learn.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
                Master AI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-testid="text-hero-description">
              Experience machine learning like never before. Interactive tutorials, 
              real-time visualizations, and hands-on model building—all in one place.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap pt-4">
              <Link href="/learning-path" data-testid="link-learn">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white border-0 text-lg px-8 py-6 gap-2"
                  data-testid="button-learn"
                >
                  <GraduationCap className="h-5 w-5" />
                  Learn Concepts
                </Button>
              </Link>
              <Link href="/build" data-testid="link-get-started">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white border-0 text-lg px-8 py-6 gap-2"
                  data-testid="button-get-started"
                >
                  <PlayCircle className="h-5 w-5" />
                  Build Models
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Courses */}
        <section className="py-16 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold text-foreground">Popular Learning Paths</h2>
            <p className="text-lg text-muted-foreground">Choose your adventure in machine learning</p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-3">
            {courses.map((course, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-purple-500/50 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${course.color}`}></div>
                <CardHeader className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400">
                      {course.difficulty}
                    </span>
                    <span className="text-xs text-muted-foreground">{course.duration}</span>
                  </div>
                  <CardTitle className="text-2xl group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-600 transition-all">
                    {course.title}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    <Link href="/learn">
                      <Button variant="outline" className="w-full gap-1 text-sm border-cyan-500/50 hover:bg-cyan-500/10">
                        <GraduationCap className="h-3 w-3" />
                        Learn
                      </Button>
                    </Link>
                    <Link href={`/${course.title.toLowerCase().replace(/ /g, '-')}`}>
                      <Button className="w-full gap-1 text-sm bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700">
                        <PlayCircle className="h-3 w-3" />
                        Build
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why MLera Section with Different Layout */}
        <section className="py-16 space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-4xl font-bold text-foreground">Why MLera is Different</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Not just another learning platform. We make AI education interactive, visual, and fun.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <Card className="relative border-2 hover:border-pink-500/50 transition-all h-full">
                <CardHeader className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                    <Code2 className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">Interactive Code Playground</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Experiment with real ML algorithms in your browser. Tweak parameters, see instant results. No setup required.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <Card className="relative border-2 hover:border-cyan-500/50 transition-all h-full">
                <CardHeader className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                    <LineChart className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">Live Visualizations</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Watch your models learn in real-time with beautiful, animated charts and graphs. See the math come alive.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <Card className="relative border-2 hover:border-purple-500/50 transition-all h-full">
                <CardHeader className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center">
                    <Lightbulb className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">Concept to Reality</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Theory meets practice. Every formula is paired with interactive examples you can touch and modify.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <Card className="relative border-2 hover:border-orange-500/50 transition-all h-full">
                <CardHeader className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                    <GraduationCap className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">Beginner Friendly</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    No PhD required. Start with zero knowledge, build confidence with guided tutorials and clear explanations.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <Card className="relative border-2 hover:border-green-500/50 transition-all h-full">
                <CardHeader className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <Rocket className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">Self-Paced Learning</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Learn at your speed. Pause, replay, experiment. Your journey, your timeline. Progress saved automatically.
                  </p>
                </CardContent>
              </Card>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity"></div>
              <Card className="relative border-2 hover:border-violet-500/50 transition-all h-full">
                <CardHeader className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <Sparkles className="h-7 w-7 text-white" />
                  </div>
                  <CardTitle className="text-xl">Custom Datasets</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Upload your own data and train models on problems you care about. Make learning personal and relevant.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 mb-16">
          <Card className="border-2 border-purple-500/30 bg-gradient-to-br from-pink-500/5 via-purple-500/5 to-cyan-500/5 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl"></div>
            <CardContent className="relative z-10 py-16 px-8 text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                Ready to Master Machine Learning?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Join thousands of learners building real ML models. Start your journey today—completely free.
              </p>
              <div className="flex gap-4 justify-center flex-wrap pt-4">
                <Link href="/learn">
                  <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white text-lg px-10 py-6 gap-2">
                    <GraduationCap className="h-5 w-5" />
                    Learn Theory
                  </Button>
                </Link>
                <Link href="/linear-regression">
                  <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-lg px-10 py-6 gap-2">
                    <PlayCircle className="h-5 w-5" />
                    Build Models
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
