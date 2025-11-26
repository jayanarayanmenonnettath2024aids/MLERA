"use client";

interface DataPoint {
  x: number;
  y: number;
}

interface ScatterChartProps {
  data: DataPoint[];
  title?: string;
  xLabel?: string;
  yLabel?: string;
  showLine?: boolean;
  slope?: number;
  intercept?: number;
}

export default function ScatterChart({
  data,
  title,
  xLabel = "X",
  yLabel = "Y",
  showLine = false,
  slope = 0,
  intercept = 0,
}: ScatterChartProps) {
  // Calculate chart dimensions
  const width = 600;
  const height = 400;
  const padding = 60;
  
  // Find min/max values
  const xValues = data.map(d => d.x);
  const yValues = data.map(d => d.y);
  const xMin = Math.min(...xValues);
  const xMax = Math.max(...xValues);
  const yMin = Math.min(...yValues);
  const yMax = Math.max(...yValues);
  
  // Add some padding to the ranges
  const xRange = xMax - xMin;
  const yRange = yMax - yMin;
  const xStart = xMin - xRange * 0.1;
  const xEnd = xMax + xRange * 0.1;
  const yStart = yMin - yRange * 0.1;
  const yEnd = yMax + yRange * 0.1;
  
  // Scale functions
  const scaleX = (x: number) => ((x - xStart) / (xEnd - xStart)) * (width - 2 * padding) + padding;
  const scaleY = (y: number) => height - padding - ((y - yStart) / (yEnd - yStart)) * (height - 2 * padding);
  
  // Generate regression line points
  const linePoints = showLine ? [
    { x: xStart, y: slope * xStart + intercept },
    { x: xEnd, y: slope * xEnd + intercept }
  ] : [];

  return (
    <div className="w-full">
      {title && <h3 className="text-center text-white font-bold text-lg mb-4">{title}</h3>}
      <svg width="100%" viewBox={`0 0 ${width} ${height}`} className="bg-purple-900/60 rounded-lg">
        {/* Grid lines */}
        <g opacity="0.2">
          {[0, 1, 2, 3, 4, 5].map(i => {
            const x = padding + (i * (width - 2 * padding)) / 5;
            const y = padding + (i * (height - 2 * padding)) / 5;
            return (
              <g key={i}>
                <line x1={x} y1={padding} x2={x} y2={height - padding} stroke="#8b5cf6" strokeWidth="1" />
                <line x1={padding} y1={y} x2={width - padding} y2={y} stroke="#8b5cf6" strokeWidth="1" />
              </g>
            );
          })}
        </g>
        
        {/* Axes */}
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#8b5cf6" strokeWidth="2" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#8b5cf6" strokeWidth="2" />
        
        {/* Axis labels */}
        <text x={width / 2} y={height - 20} textAnchor="middle" fill="#a78bfa" fontSize="14">{xLabel}</text>
        <text x={30} y={height / 2} textAnchor="middle" fill="#a78bfa" fontSize="14" transform={`rotate(-90 30 ${height / 2})`}>{yLabel}</text>
        
        {/* Regression line */}
        {showLine && linePoints.length === 2 && (
          <line
            x1={scaleX(linePoints[0].x)}
            y1={scaleY(linePoints[0].y)}
            x2={scaleX(linePoints[1].x)}
            y2={scaleY(linePoints[1].y)}
            stroke="#f87171"
            strokeWidth="3"
          />
        )}
        
        {/* Data points */}
        {data.map((point, i) => (
          <circle
            key={i}
            cx={scaleX(point.x)}
            cy={scaleY(point.y)}
            r="6"
            fill="#60a5fa"
            opacity="0.8"
          />
        ))}
        
        {/* Legend */}
        {showLine && (
          <g>
            <circle cx={width - 150} cy={30} r="6" fill="#60a5fa" opacity="0.8" />
            <text x={width - 135} y={35} fill="#a78bfa" fontSize="12">Student Data</text>
            
            <line x1={width - 150} y1={50} x2={width - 130} y2={50} stroke="#f87171" strokeWidth="3" />
            <text x={width - 125} y={55} fill="#a78bfa" fontSize="12">Best Fit Line</text>
          </g>
        )}
      </svg>
    </div>
  );
}
