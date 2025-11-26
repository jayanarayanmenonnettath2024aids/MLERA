"use client";

import { useState, useRef } from "react";
import { Upload, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface CSVUploadProps {
  onDataLoaded: (data: Array<{ x: number; y: number }>) => void;
}

export default function CSVUpload({ onDataLoaded }: CSVUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const parseCSV = (content: string): Array<{ x: number; y: number }> => {
    const lines = content.trim().split('\n');
    const data: Array<{ x: number; y: number }> = [];

    // Skip header if present
    const startIndex = lines[0].toLowerCase().includes('x') ? 1 : 0;

    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      const values = line.split(',').map(v => v.trim());
      if (values.length >= 2) {
        const x = parseFloat(values[0]);
        const y = parseFloat(values[1]);

        if (!isNaN(x) && !isNaN(y)) {
          data.push({ x, y });
        }
      }
    }

    return data;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 1MB)
    if (file.size > 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 1MB",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    setFileName(file.name);

    try {
      const content = await file.text();
      const parsedData = parseCSV(content);

      if (parsedData.length === 0) {
        throw new Error("No valid data found in CSV");
      }

      if (parsedData.length < 3) {
        throw new Error("CSV must contain at least 3 data points");
      }

      onDataLoaded(parsedData);

      toast({
        title: "Data loaded successfully!",
        description: `Loaded ${parsedData.length} data points`,
      });
    } catch (error) {
      toast({
        title: "Error processing file",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      });
      setFileName(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClearFile = () => {
    setFileName(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
          id="csv-upload"
        />
        <label htmlFor="csv-upload" className="cursor-pointer">
          <Button
            type="button"
            variant="outline"
            size="default"
            className="gap-2"
            disabled={isProcessing}
            onClick={() => fileInputRef.current?.click()}
            asChild
          >
            <span>
              <Upload className="h-4 w-4" />
              {isProcessing ? "Processing..." : "Upload CSV"}
            </span>
          </Button>
        </label>
        
        {fileName && (
          <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-primary/10 text-sm">
            <Check className="h-4 w-4 text-green-600" />
            <span className="text-foreground">{fileName}</span>
            <button
              onClick={handleClearFile}
              className="ml-2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <p>• CSV format: x,y (two columns)</p>
        <p>• Example: 1,45 or x,y header with data rows</p>
        <p>• Maximum file size: 1MB</p>
      </div>
    </div>
  );
}
