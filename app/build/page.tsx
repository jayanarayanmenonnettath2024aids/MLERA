'use client';

import { useState } from 'react';
import { ChevronLeft } from "lucide-react";
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

export default function Build() {
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

  // Sample data for visualization before training
  const sampleDatasets = {
    "sales-revenue": [
      { x: 25, y: 120 },
      { x: 30, y: 130 },
      { x: 35, y: 160 },
      { x: 40, y: 180 },
      { x: 28, y: 130 },
      { x: 45, y: 195 },
      { x: 50, y: 210 },
      { x: 32, y: 145 },
      { x: 38, y: 175 },
      { x: 42, y: 190 },
    ],
    "salary-experience": [
      { x: 1, y: 40000 },
      { x: 2, y: 45000 },
      { x: 3, y: 48000 },
      { x: 4, y: 50000 },
      { x: 5, y: 55000 },
      { x: 6, y: 58000 },
      { x: 7, y: 62000 },
      { x: 8, y: 68000 },
      { x: 9, y: 72000 },
      { x: 10, y: 75000 },
    ],
    "house-prices": [
      { x: 500, y: 25 },
      { x: 800, y: 32 },
      { x: 1000, y: 38 },
      { x: 1200, y: 45 },
      { x: 1500, y: 52 },
      { x: 1800, y: 60 },
      { x: 2000, y: 68 },
      { x: 2200, y: 75 },
      { x: 2500, y: 85 },
      { x: 2800, y: 95 },
    ],
  };

  const getDatasetLabels = () => {
    switch (dataset) {
      case "sales-revenue":
        return { xLabel: "Marketing Budget (thousands $)", yLabel: "Sales Revenue (thousands $)" };
      case "salary-experience":
        return { xLabel: "Years of Experience", yLabel: "Salary ($)" };
      case "house-prices":
        return { xLabel: "House Size (sq meters)", yLabel: "Price (thousands $)" };
      default:
        return { xLabel: "X Values", yLabel: "Y Values" };
    }
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
    setTrainingResult(null);
    setCurrentIteration(0);
  };

  const handleResetIteration = () => {
    setCurrentIteration(0);
  };

  const handlePrevious = () => {
    if (currentIteration > 0) {
      setCurrentIteration(currentIteration - 1);
    }
  };

  const handleNext = () => {
    if (currentIteration < iterations) {
      setCurrentIteration(currentIteration + 1);
    }
  };

  const currentState = trainingResult?.history?.[currentIteration];

  return (
    <div className="min-h-screen bg-background" suppressHydrationWarning>
      <Navbar />

      <main className="container mx-auto max-w-6xl px-6 lg:px-8 py-12 space-y-8">
        {/* Header */}
        <div className="space-y-6">
          <Link href="/linear-regression">
            <Button variant="outline" size="default" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Learning
            </Button>
          </Link>

          <div className="text-center space-y-4">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 md:text-6xl">
              Build A Linear Regression Model
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Configure hyperparameters, upload custom data, and train your model in real-time
            </p>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-xs">
              <p className="text-sm text-foreground mb-2">Module progress: 3 / 5</p>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-pink-500 to-purple-600" style={{width: '60%'}}></div>
              </div>
            </div>
            <Link href="/neural-networks">
              <Button variant="outline" className="gap-2">
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
            </Link>
          </div>
        </div>

        {/* Section 1: Let's Build The Model */}
        <div className="bg-card backdrop-blur-sm rounded-2xl p-8 border-2 border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-red-600 flex items-center justify-center text-white font-bold text-lg">
              1
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
              Lets Build The Model
            </h2>
          </div>
          <div className="border-t-2 border-pink-400/50 mb-6"></div>
          
          <p className="text-foreground leading-relaxed text-lg">
            In this interactive module, you'll build a linear regression model using different datasets. Select a dataset, adjust the learning rate and number of iterations, then click "Build" to train your model. Watch how the model converges as you navigate through the training process.
          </p>
        </div>

        {/* Section 2: Visualizing the Relationship */}
        <div className="bg-card backdrop-blur-sm rounded-2xl p-8 border-2 border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-red-600 flex items-center justify-center text-white font-bold text-lg">
              2
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
              Visualizing the Relationship
            </h2>
          </div>
          <div className="border-t-2 border-pink-400/50 mb-6"></div>
          
          <p className="text-foreground leading-relaxed mb-6 text-lg">
            Choose a dataset to see its scatter plot. This will help you understand the relationship between variables before building the model.
          </p>

          <p className="text-sm text-muted-foreground mb-4">
            Select a Dataset:
          </p>

          <Select value={dataset} onValueChange={handleDatasetChange}>
            <SelectTrigger className="mb-6">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sales-revenue">Sales Revenue</SelectItem>
              <SelectItem value="salary-experience">Salary vs Experience</SelectItem>
              <SelectItem value="house-prices">Housing Prices</SelectItem>
            </SelectContent>
          </Select>

          {/* Dataset Description */}
          <div className="bg-purple-500/10 border-l-4 border-purple-500 rounded-lg p-6 mb-6">
            <h3 className="font-semibold text-foreground text-lg mb-3">
              {dataset === "sales-revenue" && "Sales Revenue Dataset"}
              {dataset === "salary-experience" && "Salary vs Experience Dataset"}
              {dataset === "house-prices" && "Housing Prices Dataset"}
            </h3>
            <p className="text-foreground leading-relaxed">
              {dataset === "sales-revenue" && "This dataset shows the relationship between marketing budget (in thousands of dollars) and sales revenue (in thousands of dollars). It demonstrates how increased marketing investment typically leads to higher sales revenue, making it ideal for understanding positive linear correlation in business contexts."}
              {dataset === "salary-experience" && "This dataset illustrates the relationship between years of professional experience and annual salary (in dollars). It shows how career progression and accumulated experience typically result in higher compensation, making it excellent for understanding career growth patterns."}
              {dataset === "house-prices" && "This dataset contains information about house sizes (in square meters) and their corresponding prices (in thousands of dollars). It's perfect for understanding how property size affects market value and demonstrates real estate pricing patterns through linear regression."}
            </p>
          </div>

          {/* Placeholder for chart - will be populated when dataset API is ready */}
          <div className="bg-purple-900/20 rounded-lg p-8">
            <p className="text-muted-foreground mb-4 text-center font-semibold">
              {dataset === "sales-revenue" && "Market Dataset Preview"}
              {dataset === "salary-experience" && "Salary Dataset Preview"}
              {dataset === "house-prices" && "Housing Dataset Preview"}
            </p>
            <ScatterChart
              data={sampleDatasets[dataset as keyof typeof sampleDatasets]}
              xLabel={getDatasetLabels().xLabel}
              yLabel={getDatasetLabels().yLabel}
              showLine={false}
            />
          </div>
        </div>

        {/* Section 3: Choose the Hyperparameters */}
        <div className="bg-card backdrop-blur-sm rounded-2xl p-8 border-2 border-border">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-red-600 flex items-center justify-center text-white font-bold text-lg">
              3
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
              Choose the Hyperparameters
            </h2>
          </div>
          <div className="border-t-2 border-pink-400/50 mb-6"></div>

          {/* Hyperparameter Guide Table */}
          <div className="bg-purple-500/10 border-l-4 border-purple-500 rounded-lg p-6 mb-8">
            <div className="flex items-start gap-2 mb-4">
              <span className="text-2xl">🎯</span>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground text-lg mb-4">
                  Experiment with different hyperparameter combinations to see how they affect model training:
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-purple-600/20">
                        <th className="text-left p-3 text-foreground font-semibold">Learning Rate (α)</th>
                        <th className="text-left p-3 text-foreground font-semibold">Iterations</th>
                        <th className="text-left p-3 text-foreground font-semibold">Effect</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="p-3 text-foreground">0.001 - 0.005</td>
                        <td className="p-3 text-foreground">300 - 500</td>
                        <td className="p-3 text-foreground">Slow, stable convergence (good for complex datasets)</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-foreground">0.01 - 0.05</td>
                        <td className="p-3 text-foreground">100 - 300</td>
                        <td className="p-3 text-foreground">Balanced convergence (recommended starting point)</td>
                      </tr>
                      <tr>
                        <td className="p-3 text-foreground">0.05 - 0.1</td>
                        <td className="p-3 text-foreground">50 - 100</td>
                        <td className="p-3 text-foreground">Fast convergence, potential instability (for simple datasets)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-sm text-foreground mt-4">
                  <strong>Tip:</strong> If the cost function plot oscillates or increases, try reducing the learning rate.
                </p>
              </div>
            </div>
          </div>

          {/* Hyperparameter Controls */}
          <div className="grid gap-6 md:grid-cols-3 mb-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">
                Dataset for Model:
              </label>
              <Select value={dataset} onValueChange={handleDatasetChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sales-revenue">Sales Revenue</SelectItem>
                  <SelectItem value="salary-experience">Salary vs Experience</SelectItem>
                  <SelectItem value="house-prices">Housing Prices</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <SliderControl
              label={`Learning Rate (α): ${learningRate.toFixed(3)}`}
              value={learningRate}
              min={0.001}
              max={0.1}
              step={0.001}
              onChange={setLearningRate}
              displayValue={learningRate.toFixed(3)}
            />

            <SliderControl
              label={`Iterations: ${iterations}`}
              value={iterations}
              min={50}
              max={500}
              step={10}
              onChange={setIterations}
              displayValue={iterations.toString()}
            />
          </div>

          <div className="flex flex-wrap gap-4 justify-end items-center">
            <Button
              onClick={handleBuildModel}
              size="lg"
              className="bg-gradient-to-r from-pink-500 to-red-600 hover:from-pink-600 hover:to-red-700"
              disabled={trainModel.isPending}
            >
              {trainModel.isPending ? "Training..." : "Build Model"}
            </Button>
            <Button
              onClick={handleResetModel}
              variant="destructive"
              size="lg"
              disabled={trainModel.isPending}
            >
              Reset
            </Button>
          </div>
        </div>

        {/* Section 4: Model's Growth - Shows after building */}
        {modelBuilt && trainingResult && (
          <div className="bg-card backdrop-blur-sm rounded-2xl p-8 border-2 border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-red-600 flex items-center justify-center text-white font-bold text-lg">
                4
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-red-500 bg-clip-text text-transparent">
                Model's Growth
              </h2>
            </div>
            <div className="border-t-2 border-pink-400/50 mb-8"></div>
            
            <p className="text-foreground text-center mb-8 text-lg">
              Model built successfully. Use the controls to navigate through {iterations} steps of training.
            </p>

            <IterationControls
              currentIteration={currentIteration}
              maxIterations={iterations}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onReset={handleResetIteration}
              onIterationChange={setCurrentIteration}
            />

            <div className="grid gap-6 md:grid-cols-2 mt-8">
              <GraphContainer
                title={`Linear Regression Model (Iteration ${currentIteration})`}
              >
                {currentState && trainingResult.dataset && (
                  <LinearRegressionChart
                    data={trainingResult.dataset}
                    predictionLine={
                      currentState.theta0 !== undefined && currentState.theta1 !== undefined
                        ? Array.from({ length: 100 }, (_, i) => {
                            const x = Math.min(...trainingResult.dataset.map(p => p.x)) + 
                                     i * (Math.max(...trainingResult.dataset.map(p => p.x)) - 
                                          Math.min(...trainingResult.dataset.map(p => p.x))) / 99;
                            return {
                              x,
                              y: currentState.theta0 + currentState.theta1 * x,
                            };
                          })
                        : undefined
                    }
                  />
                )}
              </GraphContainer>
              <GraphContainer
                title={`Parameter (θ) vs Cost (Iteration ${currentIteration})`}
              >
                {trainingResult.history && (
                  <CostChart
                    data={trainingResult.history.slice(0, currentIteration + 1).map((state) => ({
                      x: state.iteration,
                      y: state.cost,
                    }))}
                  />
                )}
              </GraphContainer>
            </div>
          </div>
        )}

        {/* Advanced Features - Always visible */}
        <div className="bg-card backdrop-blur-sm rounded-2xl p-8 border-2 border-border">
          <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
            Advanced Features
          </h3>
          
          {/* CSV Upload Feature */}
          <div className="rounded-lg border-2 border-cyan-500/30 bg-cyan-500/5 p-6 space-y-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">
                ✨ ADVANCED FEATURE
              </span>
              <span className="text-xs bg-cyan-600 text-white px-2 py-1 rounded">Custom Data Upload</span>
            </div>
            <h3 className="font-semibold text-foreground text-lg">Upload Your Own Dataset (CSV)</h3>
            <p className="text-sm text-muted-foreground">
              Train the model on your own data! Upload a CSV file with x,y coordinates.
            </p>
            <CSVUpload onDataLoaded={handleCustomDataLoaded} />
            {useCustomData && (
              <p className="text-xs text-green-600 dark:text-green-400">
                ✓ Using custom uploaded data
              </p>
            )}
          </div>

          {/* Model Comparison Feature */}
          <div className="rounded-lg border-2 border-blue-500/30 bg-blue-500/5 p-6 space-y-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                ✨ ADVANCED FEATURE
              </span>
              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">Performance Comparison</span>
            </div>
            <h3 className="font-semibold text-foreground text-lg">Compare Model Configurations</h3>
            <p className="text-sm text-muted-foreground">
              Save and compare different hyperparameter combinations to find the best performing model.
            </p>
            <ModelComparison
              currentResult={trainingResult}
              learningRate={learningRate}
              iterations={iterations}
              dataset={useCustomData ? "Custom Data" : dataset}
            />
          </div>

          {/* Export Results */}
          <div>
            <ExportResults
              trainingResult={trainingResult}
              learningRate={learningRate}
              iterations={iterations}
              dataset={dataset}
            />
          </div>
        </div>

        {/* Model Results with detailed stats - Shows after building */}
        {modelBuilt && trainingResult && (
          <div className="bg-card backdrop-blur-sm rounded-2xl p-8 border-2 border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                📊
              </div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
                Model Results
              </h2>
            </div>
            <div className="border-t-2 border-green-400/50 mb-8"></div>
            
            <div className="rounded-lg bg-primary/10 p-6 mb-8">
              <p className="text-sm font-medium text-foreground text-center mb-6 text-lg">
                Model built successfully! Use the controls to navigate through{" "}
                {iterations} iterations of training.
              </p>
              {currentState && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-2">Iteration</p>
                    <p className="text-2xl font-bold text-primary">{currentState.iteration}</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-2">θ₀ (Intercept)</p>
                    <p className="text-2xl font-bold text-primary">{currentState.theta0.toFixed(4)}</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-2">θ₁ (Slope)</p>
                    <p className="text-2xl font-bold text-primary">{currentState.theta1.toFixed(4)}</p>
                  </div>
                  <div className="bg-background/50 rounded-lg p-4">
                    <p className="text-xs text-muted-foreground mb-2">Cost</p>
                    <p className="text-2xl font-bold text-primary">{currentState.cost.toFixed(4)}</p>
                  </div>
                </div>
              )}
            </div>

            <IterationControls
              currentIteration={currentIteration}
              maxIterations={iterations}
              onPrevious={handlePrevious}
              onNext={handleNext}
              onReset={handleResetIteration}
              onIterationChange={setCurrentIteration}
            />

            <div className="grid gap-6 md:grid-cols-2 mt-8">
              <GraphContainer
                title={`Linear Regression Model (Iteration ${currentIteration})`}
              >
                {currentState && trainingResult.dataset && (
                  <LinearRegressionChart
                    data={trainingResult.dataset}
                    predictionLine={
                      currentState.theta0 !== undefined && currentState.theta1 !== undefined
                        ? Array.from({ length: 100 }, (_, i) => {
                            const x = Math.min(...trainingResult.dataset.map(p => p.x)) + 
                                     i * (Math.max(...trainingResult.dataset.map(p => p.x)) - 
                                          Math.min(...trainingResult.dataset.map(p => p.x))) / 99;
                            return {
                              x,
                              y: currentState.theta0 + currentState.theta1 * x,
                            };
                          })
                        : undefined
                    }
                  />
                )}
              </GraphContainer>
              <GraphContainer
                title="Cost Function over Iterations"
              >
                {trainingResult.history && (
                  <CostChart
                    data={trainingResult.history.slice(0, currentIteration + 1).map((state) => ({
                      x: state.iteration,
                      y: state.cost,
                    }))}
                  />
                )}
              </GraphContainer>
            </div>
            
            <GraphContainer
              title="Parameter Evolution over Iterations"
            >
              {trainingResult.history && (
                <ParameterChart
                  theta0Data={trainingResult.history.slice(0, currentIteration + 1).map((state) => ({
                    x: state.iteration,
                    y: state.theta0,
                  }))}
                  theta1Data={trainingResult.history.slice(0, currentIteration + 1).map((state) => ({
                    x: state.iteration,
                    y: state.theta1,
                  }))}
                />
              )}
            </GraphContainer>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
