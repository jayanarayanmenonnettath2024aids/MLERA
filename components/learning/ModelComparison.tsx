"use client";

import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { TrainingResult } from "@shared/schema";

interface ComparisonEntry {
  id: string;
  learningRate: number;
  iterations: number;
  dataset: string;
  finalCost: number;
  theta0: number;
  theta1: number;
  timestamp: Date;
}

interface ModelComparisonProps {
  currentResult: TrainingResult | null;
  learningRate: number;
  iterations: number;
  dataset: string;
}

export default function ModelComparison({
  currentResult,
  learningRate,
  iterations,
  dataset,
}: ModelComparisonProps) {
  const [comparisons, setComparisons] = useState<ComparisonEntry[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    // Load from localStorage
    const saved = localStorage.getItem("mlera-model-comparisons");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setComparisons(parsed.map((c: any) => ({
          ...c,
          timestamp: new Date(c.timestamp),
        })));
      } catch (e) {
        console.error("Failed to load comparisons", e);
      }
    }
  }, []);

  const saveComparison = () => {
    if (!currentResult) return;

    const newEntry: ComparisonEntry = {
      id: Date.now().toString(),
      learningRate,
      iterations,
      dataset,
      finalCost: currentResult.finalCost,
      theta0: currentResult.theta0,
      theta1: currentResult.theta1,
      timestamp: new Date(),
    };

    const updated = [...comparisons, newEntry].slice(-5); // Keep last 5
    setComparisons(updated);
    localStorage.setItem("mlera-model-comparisons", JSON.stringify(updated));
    setShowComparison(true);
  };

  const clearComparisons = () => {
    setComparisons([]);
    localStorage.removeItem("mlera-model-comparisons");
    setShowComparison(false);
  };

  const getBestModel = () => {
    if (comparisons.length === 0) return null;
    return comparisons.reduce((best, current) =>
      current.finalCost < best.finalCost ? current : best
    );
  };

  const getPerformanceIndicator = (cost: number) => {
    const best = getBestModel();
    if (!best || cost === best.finalCost) {
      return <Minus className="h-4 w-4 text-muted-foreground inline" />;
    }
    return cost < best.finalCost ? (
      <TrendingUp className="h-4 w-4 text-green-600 inline" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600 inline" />
    );
  };

  const bestModel = getBestModel();

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        <Button
          onClick={saveComparison}
          variant="secondary"
          size="default"
          disabled={!currentResult}
        >
          Save Configuration
        </Button>
        <Button
          onClick={() => setShowComparison(!showComparison)}
          variant="outline"
          size="default"
          disabled={comparisons.length === 0}
        >
          {showComparison ? "Hide" : "Show"} Comparison ({comparisons.length})
        </Button>
        {comparisons.length > 0 && (
          <Button onClick={clearComparisons} variant="destructive" size="default">
            Clear All
          </Button>
        )}
      </div>

      {showComparison && comparisons.length > 0 && (
        <div className="rounded-lg border border-border bg-card p-4 space-y-4">
          <h3 className="font-semibold text-lg text-foreground">
            Model Performance Comparison
          </h3>

          {bestModel && (
            <div className="rounded-md bg-green-500/10 border border-green-500/20 p-3">
              <p className="text-sm font-medium text-green-700 dark:text-green-400">
                🏆 Best Model: α={bestModel.learningRate.toFixed(3)}, Iterations=
                {bestModel.iterations}, Cost={bestModel.finalCost.toFixed(4)}
              </p>
            </div>
          )}

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 font-medium text-muted-foreground">Dataset</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Learning Rate</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Iterations</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Final Cost</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">θ₀</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">θ₁</th>
                  <th className="text-left p-2 font-medium text-muted-foreground">Time</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className={`border-b border-border ${
                      entry.id === bestModel?.id ? "bg-green-500/5" : ""
                    }`}
                  >
                    <td className="p-2 text-foreground">{entry.dataset}</td>
                    <td className="p-2 text-foreground">{entry.learningRate.toFixed(3)}</td>
                    <td className="p-2 text-foreground">{entry.iterations}</td>
                    <td className="p-2 text-foreground">
                      {getPerformanceIndicator(entry.finalCost)}{" "}
                      {entry.finalCost.toFixed(4)}
                    </td>
                    <td className="p-2 text-foreground">{entry.theta0.toFixed(4)}</td>
                    <td className="p-2 text-foreground">{entry.theta1.toFixed(4)}</td>
                    <td className="p-2 text-muted-foreground text-xs">
                      {entry.timestamp.toLocaleTimeString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>• Lower cost indicates better model performance</p>
            <p>• Compare different hyperparameter configurations side-by-side</p>
            <p>• Maximum 5 comparisons stored (most recent)</p>
          </div>
        </div>
      )}
    </div>
  );
}
