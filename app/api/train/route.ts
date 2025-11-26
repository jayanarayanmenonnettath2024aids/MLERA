import { NextResponse } from "next/server";
import { trainLinearRegression, datasets } from "@/lib/linearRegression";
import type { TrainingParams } from "@shared/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json() as TrainingParams & { customData?: Array<{ x: number; y: number }> };
    const { learningRate, iterations, datasetName, customData } = body;

    // Validate inputs
    if (
      typeof learningRate !== "number" ||
      typeof iterations !== "number" ||
      typeof datasetName !== "string"
    ) {
      return NextResponse.json(
        { message: "Invalid parameters" },
        { status: 400 }
      );
    }

    if (learningRate <= 0 || learningRate > 1) {
      return NextResponse.json(
        { message: "Learning rate must be between 0 and 1" },
        { status: 400 }
      );
    }

    if (iterations < 1 || iterations > 10000) {
      return NextResponse.json(
        { message: "Iterations must be between 1 and 10000" },
        { status: 400 }
      );
    }

    // Support custom data or predefined datasets
    if (datasetName === "custom" && customData) {
      if (!Array.isArray(customData) || customData.length < 3) {
        return NextResponse.json(
          { message: "Custom data must have at least 3 points" },
          { status: 400 }
        );
      }
      const result = trainLinearRegression("custom", learningRate, iterations, customData);
      return NextResponse.json(result);
    } else if (!datasets[datasetName]) {
      return NextResponse.json(
        { message: "Dataset not found" },
        { status: 404 }
      );
    }

    const result = trainLinearRegression(datasetName, learningRate, iterations);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Training error:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Training failed" },
      { status: 500 }
    );
  }
}
