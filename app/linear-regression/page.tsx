'use client';

import { useState } from 'react';
import { Lightbulb, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScatterChart from "@/components/ScatterChart";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTrainModel } from "@/hooks/useLinearRegression";
import { useToast } from "@/hooks/use-toast";
import type { TrainingResult } from "@shared/schema";
import { LinearRegressionChart, CostChart, ParameterChart } from "@/components/learning/Charts";
import CSVUpload from "@/components/learning/CSVUpload";
import ModelComparison from "@/components/learning/ModelComparison";
import GraphContainer from "@/components/learning/GraphContainer";
import IterationControls from "@/components/learning/IterationControls";
import SliderControl from "@/components/shared/SliderControl";
import { ExportResults } from "@/components/learning/ExportResults";

export default function LinearRegression() {
  // State for interactive Visual Representation sliders
  const [intercept, setIntercept] = useState(20);
  const [slope, setSlope] = useState(3);
  
  // State for model building
  const [learningRate, setLearningRate] = useState(0.05);
  const [iterations, setIterations] = useState(100);
  const [dataset, setDataset] = useState("sales-revenue");
  const [currentIteration, setCurrentIteration] = useState(0);
  const [modelBuilt, setModelBuilt] = useState(false);
  const [trainingResult, setTrainingResult] = useState<TrainingResult | null>(null);
  const [customData, setCustomData] = useState<Array<{ x: number; y: number }> | null>(null);
  const [useCustomData, setUseCustomData] = useState(false);
  
  const { toast } = useToast();
  const trainModel = useTrainModel();

  // Data for the interactive chart (study hours vs exam scores)
  const studyData = [
    { x: 1, y: 45 },
    { x: 2, y: 51 },
    { x: 3, y: 54 },
    { x: 4, y: 60 },
    { x: 5, y: 65 },
    { x: 6, y: 70 },
    { x: 7, y: 75 },
    { x: 8, y: 82 },
  ];

  // Calculate Mean Squared Error
  const calculateMSE = () => {
    const predictions = studyData.map(point => intercept + slope * point.x);
    const errors = studyData.map((point, i) => Math.pow(point.y - predictions[i], 2));
    const mse = errors.reduce((sum, error) => sum + error, 0) / errors.length;
    return mse.toFixed(2);
  };

  const handleBuildModel = async () => {
    try {
      const result = await trainModel.mutateAsync({
        learningRate,
        iterations,
        datasetName: useCustomData ? "custom" : dataset,
        customData: useCustomData ? customData : undefined,
      });
      
      setTrainingResult(result);
      setModelBuilt(true);
      setCurrentIteration(iterations);
      
      toast({
        title: "Model trained successfully!",
        description: `Final cost: ${result.finalCost.toFixed(4)}`,
      });
    } catch (error) {
      toast({
        title: "Training failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
    }
  };

  const handleCustomDataLoaded = (data: Array<{ x: number; y: number }>) => {
    setCustomData(data);
    setUseCustomData(true);
    setModelBuilt(false);
    setTrainingResult(null);
  };

  const handleDatasetChange = (value: string) => {
    setDataset(value);
    setUseCustomData(false);
    setModelBuilt(false);
    setTrainingResult(null);
  };

  const handleResetModel = () => {
    setModelBuilt(false);
    setCurrentIteration(0);
    setTrainingResult(null);
  };

  const handleResetIteration = () => {
    setCurrentIteration(0);
  };

  const handlePrevious = () => {
    if (currentIteration > 0) {
      setCurrentIteration((prev) => Math.max(0, prev - Math.floor(iterations / 10)));
    }
  };

  const handleNext = () => {
    if (currentIteration < iterations) {
      setCurrentIteration((prev) => Math.min(iterations, prev + Math.floor(iterations / 10)));
    }
  };
  
  // Get current state based on iteration
  const getCurrentState = () => {
    if (!trainingResult || !trainingResult.history) return null;
    return trainingResult.history[currentIteration] || trainingResult.history[trainingResult.history.length - 1];
  };
  
  const currentState = getCurrentState();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="container mx-auto px-6 pt-6">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="text-primary hover:underline">Home</Link>
          <span className="text-muted-foreground">›</span>
          <Link href="/learning-path" className="text-primary hover:underline">Learning Path</Link>
          <span className="text-muted-foreground">›</span>
          <span className="text-muted-foreground">...</span>
          <span className="text-muted-foreground">›</span>
          <span className="text-primary">Content</span>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-pink-500 to-purple-500 bg-clip-text text-transparent mb-8">
            Introduction to Linear Regression
          </h1>
          
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-foreground mb-2">Module progress: 1 / 5</p>
              <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-pink-400" style={{width: '20%'}}></div>
              </div>
            </div>
            <Link href="/learning-path">
              <button className="px-6 py-2 border-2 border-border rounded-lg text-foreground hover:bg-accent transition-colors flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" />
                Previous
              </button>
            </Link>
          </div>
        </div>

        {/* Section 1: What is Linear Regression */}
        <div className="bg-card backdrop-blur-sm rounded-2xl p-8 mb-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center text-white font-bold">
              1
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">
              What is Linear Regression?
            </h2>
          </div>
          <div className="border-t-2 border-pink-400 mb-6"></div>
          
          <p className="text-foreground leading-relaxed mb-4">
            Linear Regression is one of the most fundamental and widely used techniques in the field of machine learning and statistics. At its core, it's a method for modeling the relationship between a <span className="text-cyan-500 font-semibold">dependent variable</span> (often denoted as Y) and one or more <span className="text-cyan-500 font-semibold">independent variables</span> (X) by fitting a linear equation to the observed data.
          </p>

          {/* Definition Box */}
          <div className="bg-accent rounded-lg p-6 border-l-4 border-yellow-400 relative">
            <div className="absolute -left-3 top-6 bg-accent">
              <Lightbulb className="w-6 h-6 text-yellow-500" fill="currentColor" />
            </div>
            <h3 className="text-pink-500 font-bold text-lg mb-3 ml-6">Definition:</h3>
            <p className="text-foreground ml-6">
              Linear Regression is a <span className="text-cyan-500 font-semibold">supervised learning</span> algorithm that predicts a continuous output value based on one or more input <span className="text-cyan-500 font-semibold">features</span>, assuming a linear relationship between the inputs and the output.
            </p>
          </div>
        </div>

        {/* Section 2: Mathematical Formulation */}
        <div className="bg-card backdrop-blur-sm rounded-2xl p-8 mb-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center text-white font-bold">
              2
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">
              Mathematical Formulation
            </h2>
          </div>
          <div className="border-t-2 border-pink-400 mb-6"></div>
          
          <p className="text-foreground leading-relaxed mb-6">
            The simplest form of Linear Regression(Simple Linear Regression) can be expressed as:
          </p>

          {/* Formula Box */}
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-8 border-l-4 border-pink-500 mb-6">
            <div className="text-center text-white font-serif text-2xl italic">
              Y = β₀ + β₁X + ε
            </div>
          </div>

          <p className="text-foreground leading-relaxed mb-3">Where:</p>
          
          <p className="text-foreground leading-relaxed mb-2">
            → <strong>Y</strong> is the dependent variable (what we're trying to predict)
          </p>
          <p className="text-foreground leading-relaxed mb-2">
            → <strong>X</strong> is the independent variable (our input feature)
          </p>
          <p className="text-foreground leading-relaxed mb-2">
            → <em>β₀</em> is the y-intercept (the value of Y when X = 0)
          </p>
          <p className="text-foreground leading-relaxed mb-2">
            → <em>β₁</em> is the slope (how much Y changes when X increases by 1 unit)
          </p>
          <p className="text-foreground leading-relaxed mb-6">
            → <em>ε</em> (epsilon) represents the error term (the part of Y that can't be explained by the model)
          </p>

          {/* Goal Box */}
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6 border-l-4 border-pink-500">
            <p className="text-white leading-relaxed">
              The goal of Linear Regression is to find the values of <em>β₀</em> and <em>β₁</em> that minimize the sum of squared differences between the actual <strong>Y</strong> values and the values predicted by our model.
            </p>
          </div>
        </div>

        {/* Section 3: Intuition behind LR */}
        <div className="bg-card backdrop-blur-sm rounded-2xl p-8 mb-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center text-white font-bold">
              3
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">
              Intuition behind LR
            </h2>
          </div>
          <div className="border-t-2 border-pink-400 mb-6"></div>
          
          <p className="text-foreground leading-relaxed mb-6">
            Imagine you're trying to understand the relationship between study hours and exam scores. Intuitively, you might expect that more study hours lead to higher scores. Linear Regression formalizes this intuition by finding the straight line that best represents this relationship.
          </p>

          {/* Chart */}
          <div className="bg-gradient-to-br from-pink-500 via-purple-600 to-purple-800 rounded-2xl p-6 border-2 border-purple-400">
            <h3 className="text-white text-xl font-bold text-center mb-6">Relationship Between Study Hours and Exam Scores</h3>
            <ScatterChart
              data={[
                { x: 1, y: 45 },
                { x: 2, y: 52 },
                { x: 3, y: 58 },
                { x: 4, y: 62 },
                { x: 5, y: 68 },
                { x: 6, y: 74 },
                { x: 7, y: 78 },
                { x: 8, y: 85 },
                { x: 9, y: 88 },
                { x: 10, y: 92 }
              ]}
              xLabel="Study Hours"
              yLabel="Exam Score"
              showLine={true}
              slope={5.2}
              intercept={40}
            />
          </div>

          <p className="text-foreground leading-relaxed mt-6">
            In the visualization above, each point represents a student's study hours (x-axis) and their exam score (y-axis). The straight line is the "<span className="text-cyan-500 font-semibold">best fit</span>" line determined by Linear Regression, which minimizes the overall distance between the line and all data points.
          </p>
        </div>

        {/* Section 4: Understanding the Cost Function (MSE) */}
        <div className="bg-card backdrop-blur-sm rounded-2xl p-8 mb-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center text-white font-bold">
              4
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">
              Understanding the Cost Function (MSE)
            </h2>
          </div>
          <div className="border-t-2 border-pink-400 mb-6"></div>
          
          <p className="text-foreground leading-relaxed mb-4">
            To find the best-fitting line, we need a way to measure how "wrong" our model's predictions are compared to the actual values. In linear regression, we typically use the <span className="text-cyan-500 font-semibold">Mean Squared Error</span> (MSE) as our cost function.
          </p>

          <p className="text-foreground leading-relaxed mb-6">
            For a dataset with n observations, the MSE is calculated as:
          </p>

          {/* MSE Formula */}
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-8 border-l-4 border-pink-500 mb-6">
            <div className="text-center text-white font-serif text-2xl">
              MSE = (1/n) Σ(yᵢ - ŷᵢ)²
            </div>
          </div>

          <p className="text-foreground leading-relaxed mb-3">Where:</p>
          
          <p className="text-foreground leading-relaxed mb-2">
            → n is the number of observations
          </p>
          <p className="text-foreground leading-relaxed mb-2">
            → <em>yᵢ</em> is the actual value of the dependent variable for observation i
          </p>
          <p className="text-foreground leading-relaxed mb-6">
            → <em>ŷᵢ</em> the predicted value for observation i
          </p>

          <p className="text-foreground leading-relaxed mb-6">
            Substituting our linear regression equation into MSE formula:
          </p>

          {/* Expanded MSE Formula */}
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-8 border-l-4 border-pink-500 mb-6">
            <div className="text-center text-white font-serif text-xl">
              MSE = (1/n) Σ(yᵢ - (β₀ + β₁xᵢ))²
            </div>
          </div>

          <p className="text-foreground leading-relaxed mb-4">
            We've defined the cost function (typically Mean Squared Error), the next step in Linear Regression is to minimize this error by finding the optimal values of the parameters:
          </p>
          
          <p className="text-foreground leading-relaxed mb-2">
            →β₀ (intercept)
          </p>
          <p className="text-foreground leading-relaxed mb-6">
            →β₁ (slope)
          </p>

          <p className="text-foreground leading-relaxed mb-4">
            There are two main techniques used to find these optimal parameters:
          </p>

          <p className="text-foreground leading-relaxed font-semibold mb-2">
            1. Ordinary Least Square(OLS)
          </p>
          <p className="text-foreground leading-relaxed font-semibold">
            2. Gradient Descent
          </p>
        </div>

        {/* Section 5: Ordinary Least Square */}
        <div className="bg-card backdrop-blur-sm rounded-2xl p-8 mb-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center text-white font-bold">
              5
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">
              Ordinary Least Square (OLS)
            </h2>
          </div>
          <div className="border-t-2 border-pink-400 mb-6"></div>
          
          <p className="text-foreground leading-relaxed mb-6">
            OLS is a <span className="text-cyan-500 font-semibold">closed-form analytical solution</span> derived by differentiating the cost function and setting the derivatives to zero. It gives a direct formula to compute the best-fitting line.
          </p>

          <p className="text-foreground leading-relaxed mb-6">
            For a simple linear regression (one feature), the formulas are:
          </p>

          {/* OLS Formulas */}
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-8 border-l-4 border-pink-500 mb-4">
            <div className="text-center text-white font-serif text-xl mb-6">
              β₁ = Σ(xᵢ - x̄)(yᵢ - ȳ) / Σ(xᵢ - x̄)² = Cov(x,y) / Var(x)
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-8 border-l-4 border-pink-500 mb-6">
            <div className="text-center text-white font-serif text-xl">
              β₀ = ȳ - β₁x̄
            </div>
          </div>

          <p className="text-foreground leading-relaxed mb-6">
            where <em>x̄</em> and <em>ȳ</em> are the means of the x and y values respectively.
          </p>

          {/* Pros and Cons */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pros */}
            <div className="bg-accent rounded-lg p-6 border-l-4 border-green-400">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-500" fill="currentColor" />
                <h3 className="text-lg font-bold text-foreground">Pros:</h3>
              </div>
              <div className="space-y-2">
                <p className="text-foreground flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Fast and exact</span>
                </p>
                <p className="text-foreground flex items-start gap-2">
                  <span className="text-green-500 font-bold">✓</span>
                  <span>Best for small to medium datasets</span>
                </p>
              </div>
            </div>

            {/* Cons */}
            <div className="bg-accent rounded-lg p-6 border-l-4 border-red-400">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-red-500 text-xl">⚠</span>
                <h3 className="text-lg font-bold text-foreground">Cons:</h3>
              </div>
              <div className="space-y-2">
                <p className="text-foreground flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Not ideal for high-dimensional data</span>
                </p>
                <p className="text-foreground flex items-start gap-2">
                  <span className="text-red-500 font-bold">✗</span>
                  <span>Becomes computationally expensive when data is very large</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 6: Gradient Descent */}
        <div className="bg-card backdrop-blur-sm rounded-2xl p-8 mb-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center text-white font-bold">
              6
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">
              Gradient Descent
            </h2>
          </div>
          <div className="border-t-2 border-pink-400 mb-6"></div>
          
          <p className="text-foreground leading-relaxed mb-6">
            Gradient Descent is an <span className="text-cyan-500 font-semibold">iterative optimization algorithm</span>. It starts with random initial values for <em>β₀</em> and <em>β₁</em>, and gradually updates them to minimize the cost.
          </p>

          <p className="text-foreground leading-relaxed mb-6">
            The update rules are:
          </p>

          {/* Gradient Descent Formulas */}
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-8 border-l-4 border-pink-500 mb-4">
            <div className="text-center text-white font-serif text-xl">
              β₁ := β₁ - α(∂J/∂β₁) = β₁ - α(1/m)Σ(ŷᵢ - yᵢ) · xᵢ
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-8 border-l-4 border-pink-500 mb-6">
            <div className="text-center text-white font-serif text-xl">
              β₀ := β₀ - α(∂J/∂β₀) = β₀ - α(1/m)Σ(ŷᵢ - yᵢ)
            </div>
          </div>

          <p className="text-foreground leading-relaxed mb-3">Where:</p>
          
          <p className="text-foreground leading-relaxed mb-2">
            → <strong>α</strong> is the learning rate (step size)
          </p>
          <p className="text-foreground leading-relaxed mb-2">
            → <strong>m</strong> is the number of training examples
          </p>
          <p className="text-foreground leading-relaxed mb-2">
            → <em>ŷᵢ</em> is the predicted value for the i-th example
          </p>
          <p className="text-foreground leading-relaxed mb-2">
            → <em>yᵢ</em> is the actual value for the i-th example
          </p>
          <p className="text-foreground leading-relaxed mb-6">
            → <em>xᵢ</em> is the feature value for the i-th example
          </p>

          {/* Intuitive Explanation */}
          <div className="bg-yellow-500/10 rounded-lg p-6 border-l-4 border-yellow-400">
            <h3 className="text-yellow-500 font-bold text-lg mb-3">Intuitive Explanation</h3>
            <p className="text-foreground leading-relaxed mb-3">
              Think of gradient descent as descending a hill to find the lowest point (minimum). At each step:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-foreground">
              <li>Look around to find the steepest downward direction (gradient)</li>
              <li>Take a step in that direction (parameter update)</li>
              <li>Repeat until you reach the bottom (convergence)</li>
            </ol>
          </div>
        </div>

        {/* Section 7: Visual Representation */}
        <div className="bg-card backdrop-blur-sm rounded-2xl p-8 mb-6 border border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 flex items-center justify-center text-white font-bold">
              7
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-pink-500 bg-clip-text text-transparent">
              Visual Representation
            </h2>
          </div>
          <div className="border-t-2 border-pink-400 mb-6"></div>
          
          <p className="text-foreground leading-relaxed mb-6">
            Let's explore how changing the intercept and slope affects our regression line:
          </p>

          {/* Interactive Chart */}
          <div className="bg-gradient-to-br from-purple-600 to-purple-900 rounded-2xl p-6 border-2 border-purple-400 mb-6">
            <h3 className="text-white text-xl font-bold text-center mb-6">Adjust the Intercept and Slope to Fit the Data</h3>
            <div className="bg-purple-900/60 rounded-lg p-8">
              <ScatterChart
                data={studyData}
                xLabel="Study Hours"
                yLabel="Exam Score"
                showLine={true}
                slope={slope}
                intercept={intercept}
              />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-6 text-white">
              <div>
                <p className="text-sm mb-2">Intercept (β₀): <span className="text-pink-400 font-bold">{intercept}</span></p>
                <input
                  type="range"
                  min="0"
                  max="50"
                  step="1"
                  value={intercept}
                  onChange={(e) => setIntercept(Number(e.target.value))}
                  className="w-full h-2 bg-purple-900/60 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-400 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-pink-400 [&::-moz-range-thumb]:border-0"
                />
              </div>
              <div>
                <p className="text-sm mb-2">Slope (β₁): <span className="text-pink-400 font-bold">{slope}</span></p>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="0.1"
                  value={slope}
                  onChange={(e) => setSlope(Number(e.target.value))}
                  className="w-full h-2 bg-purple-900/60 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-pink-400 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-pink-400 [&::-moz-range-thumb]:border-0"
                />
              </div>
              <div>
                <p className="text-sm mb-2">Mean Squared Error: <span className="text-yellow-400 font-bold">{calculateMSE()}</span></p>
              </div>
            </div>
          </div>

          <p className="text-foreground leading-relaxed mb-4">
            As you adjust the sliders, observe how the regression line changes:
          </p>

          <ul className="space-y-2 mb-6">
            <li className="text-foreground leading-relaxed">
              • The intercept moves the line up or down (where it crosses the y-axis)
            </li>
            <li className="text-foreground leading-relaxed">
              • The slope changes how steep the line is (positive slopes go up, negative slopes go down)
            </li>
          </ul>

          {/* Notice Box */}
          <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6 border-l-4 border-pink-500">
            <p className="text-white leading-relaxed">
              Notice that some lines fit the data better than others. The best line is the one that minimizes the total error between the line and the actual data points.
            </p>
          </div>
        </div>

        {/* Coming Up Next: Build Model Section */}
        <div className="bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-2xl p-8 border-2 border-pink-500/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-full blur-2xl"></div>
          <div className="relative z-10 space-y-6">
            <div className="inline-block px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30">
              <span className="text-sm font-semibold text-pink-500">Coming Up Next</span>
            </div>
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
              Build a Linear Regression Model
            </h2>
            <p className="text-lg text-foreground leading-relaxed">
              Now that the theory is clear, build an interactive model. Upload your own data, tune hyperparameters, and watch your model learn in real-time!
            </p>
            <Link href="/build">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-lg px-8 py-6 gap-2"
              >
                Continue →
              </Button>
            </Link>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}
