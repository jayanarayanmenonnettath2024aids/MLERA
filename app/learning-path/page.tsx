"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Lock, Sparkles, TrendingUp, Award, BookOpen, Zap, Target, GraduationCap, PlayCircle } from "lucide-react";

export default function LearningPath() {
  const modules = [
    {
      id: 1,
      title: "Linear Regression",
      description: "Predicting numbers - How much? How many?",
      status: "completed",
      link: "/linear-regression",
      topics: ["Gradient Descent", "Cost Function", "Hyperparameters"],
      realWorld: "House prices, Sales forecasting, Stock predictions",
      difficulty: "Beginner",
      duration: "30 min",
      color: "from-blue-500 to-cyan-500",
      icon: TrendingUp,
    },
    {
      id: 2,
      title: "Logistic Regression", 
      description: "Making decisions - Yes or No?",
      status: "available",
      link: "/logistic-regression",
      topics: ["Classification", "Probability", "Decision Boundary"],
      realWorld: "Spam detection, Fraud detection, Customer churn",
      difficulty: "Beginner",
      duration: "25 min",
      color: "from-purple-500 to-pink-500",
      icon: Target,
    },
    {
      id: 3,
      title: "Neural Networks",
      description: "The brain of AI - Pattern recognition",
      status: "available",
      link: "/neural-networks",
      topics: ["Layers", "Activation Functions", "Backpropagation"],
      realWorld: "Image recognition, Voice assistants, Game AI",
      difficulty: "Intermediate",
      duration: "45 min",
      color: "from-orange-500 to-red-500",
      icon: Sparkles,
    },
    {
      id: 4,
      title: "Decision Trees",
      description: "Making choices step by step",
      status: "locked",
      link: "#",
      topics: ["Tree Structure", "Splitting", "Pruning"],
      realWorld: "Medical diagnosis, Credit scoring, Recommendations",
      difficulty: "Intermediate",
      duration: "35 min",
      color: "from-green-500 to-emerald-500",
      icon: BookOpen,
    },
    {
      id: 5,
      title: "Reinforcement Learning",
      description: "Learning by trial and error",
      status: "locked",
      link: "#",
      topics: ["Rewards", "Policies", "Q-Learning"],
      realWorld: "Game playing, Robotics, Self-driving cars",
      difficulty: "Advanced",
      duration: "60 min",
      color: "from-violet-500 to-purple-500",
      icon: Zap,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case "available":
        return <Circle className="h-5 w-5 text-cyan-500" />;
      case "locked":
        return <Lock className="h-5 w-5 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30";
      case "Intermediate":
        return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border border-yellow-500/30";
      case "Advanced":
        return "bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/30";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto max-w-7xl px-6 lg:px-8 py-12 space-y-16">
        {/* Hero Header */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-cyan-500/10 rounded-3xl blur-3xl"></div>
          <div className="relative text-center space-y-6 py-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30">
              <GraduationCap className="h-4 w-4 text-pink-500" />
              <span className="text-sm font-medium text-foreground">Your Personalized Journey</span>
            </div>
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 md:text-7xl">
              Learning Path
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              Master machine learning step-by-step. From beginner to expert, we've got you covered.
            </p>
          </div>
        </div>

        {/* Progress Stats */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-2 border-border hover:border-pink-500/50 transition-all">
            <CardContent className="p-6 text-center space-y-2">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">1/5</div>
              <div className="text-sm text-muted-foreground font-medium">Modules Completed</div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-to-r from-pink-500 to-purple-600 h-2 rounded-full" style={{width: '20%'}}></div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-border hover:border-cyan-500/50 transition-all">
            <CardContent className="p-6 text-center space-y-2">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">3</div>
              <div className="text-sm text-muted-foreground font-medium">Available Now</div>
              <div className="inline-flex items-center gap-1 text-xs text-cyan-600 dark:text-cyan-400">
                <Sparkles className="h-3 w-3" />
                Ready to learn
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border hover:border-purple-500/50 transition-all">
            <CardContent className="p-6 text-center space-y-2">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600">~3h</div>
              <div className="text-sm text-muted-foreground font-medium">Total Duration</div>
              <div className="text-xs text-muted-foreground">Learn at your pace</div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border hover:border-green-500/50 transition-all">
            <CardContent className="p-6 text-center space-y-2">
              <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">20%</div>
              <div className="text-sm text-muted-foreground font-medium">Overall Progress</div>
              <div className="inline-flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                <Award className="h-3 w-3" />
                Keep going!
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Learning Modules - Card Grid */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground text-center mb-8">Course Modules</h2>
          <div className="grid gap-6 lg:grid-cols-2">
            {modules.map((module) => {
              const IconComponent = module.icon;
              return (
                <Card
                  key={module.id}
                  className={`border-2 border-border hover:shadow-2xl transition-all duration-300 overflow-hidden ${
                    module.status === "locked" ? "opacity-60" : "hover:border-purple-500/50 hover:-translate-y-1"
                  }`}
                >
                  {/* Color Strip */}
                  <div className={`h-2 bg-gradient-to-r ${module.color}`}></div>
                  
                  <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center`}>
                          <IconComponent className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            {getStatusIcon(module.status)}
                            <span className="text-xs text-muted-foreground">Module {module.id}</span>
                          </div>
                          <CardTitle className="text-2xl">{module.title}</CardTitle>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className={getDifficultyColor(module.difficulty)}>
                        {module.difficulty}
                      </Badge>
                      <Badge variant="outline" className="border-purple-500/30">
                        {module.duration}
                      </Badge>
                      {module.status === "completed" && (
                        <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/30">
                          ✓ Completed
                        </Badge>
                      )}
                    </div>

                    <CardDescription className="text-base leading-relaxed">
                      {module.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-5">
                    {/* Topics */}
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-foreground">Key Topics:</div>
                      <div className="flex flex-wrap gap-2">
                        {module.topics.map((topic) => (
                          <span key={topic} className="text-xs px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20">
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Real World */}
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-foreground">Real-World Uses:</div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{module.realWorld}</p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2">
                      {module.status === "completed" ? (
                        <Link href={module.link}>
                          <Button variant="outline" className="w-full gap-2 border-cyan-500/50 hover:bg-cyan-500/10">
                            <BookOpen className="h-4 w-4" />
                            Review Module
                          </Button>
                        </Link>
                      ) : module.status === "available" ? (
                        <Link href={module.link}>
                          <Button className="w-full gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
                            <GraduationCap className="h-4 w-4" />
                            Start Learning
                          </Button>
                        </Link>
                      ) : (
                        <Button variant="ghost" disabled className="w-full text-muted-foreground">
                          <Lock className="h-4 w-4 mr-2" />
                          Complete previous modules to unlock
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Certificate Section */}
        <Card className="border-2 border-dashed border-purple-500/50 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-purple-500/5 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
          <CardContent className="relative z-10 p-8 text-center space-y-6">
            <div className="text-7xl">🏆</div>
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              Earn Your Certificate
            </h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Complete all modules, master the concepts, and receive your Machine Learning Fundamentals certificate. 
              Show the world what you've learned!
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Button variant="outline" size="lg" className="border-2 border-purple-500/50">
                View Requirements
              </Button>
              <Button size="lg" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700" disabled>
                <Award className="h-5 w-5 mr-2" />
                Get Certificate
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}

