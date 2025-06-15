
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";

const minPages = 1;
const maxPages = 100;
const minCopies = 1;
const maxCopies = 100;

// Simple dummy cost logic
function getEstimatedCost({ pages, color, copies, doubleSided }: { pages: number; color: "bw" | "color"; copies: number; doubleSided: boolean; }) {
  let base = color === "color" ? 5 : 2;
  let sidesAdj = doubleSided ? 0.8 : 1;
  return Math.round(base * pages * copies * sidesAdj * 100) / 100;
}

const EstimateCostPage = () => {
  const navigate = useNavigate();
  // Form state
  const [pages, setPages] = useState(1);
  const [color, setColor] = useState<"bw" | "color">("bw");
  const [copies, setCopies] = useState(1);
  const [doubleSided, setDoubleSided] = useState(false);
  const [showEstimate, setShowEstimate] = useState(false);
  const [cost, setCost] = useState<number | null>(null);

  const handleCalculate = () => {
    const estimated = getEstimatedCost({ pages, color, copies, doubleSided });
    setCost(estimated);
    setShowEstimate(true);
  };

  const handleReset = () => {
    setPages(1);
    setColor("bw");
    setCopies(1);
    setDoubleSided(false);
    setShowEstimate(false);
    setCost(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center pt-7 px-4 pb-7">
        <button onClick={() => navigate(-1)} className="mr-3 p-1 rounded-full hover:bg-gray-100">
          {/* Arrow Left Icon */}
          <svg width={26} height={26} viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="#191D23" strokeWidth={2.0} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <h1 className="text-xl font-bold text-black flex-1 text-center" style={{ letterSpacing: -0.5 }}>
          Estimate Printing Cost
        </h1>
        <div className="w-7" /> {/* Spacer for centering */}
      </div>
      {/* Card/Form */}
      <div className="flex-1 w-full max-w-md mx-auto px-3 pb-5">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 divide-y divide-gray-100 mb-7">
          {/* Number of pages */}
          <div className="flex items-center justify-between px-5 py-5">
            <div className="font-medium text-base">Select Number of pages</div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-9 h-9 text-xl"
                onClick={() => setPages(p => Math.max(minPages, p - 1))}
                aria-label="decrease pages"
              >-</Button>
              <div className="w-6 text-center text-lg font-semibold">{pages}</div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-9 h-9 text-xl"
                onClick={() => setPages(p => Math.min(maxPages, p + 1))}
                aria-label="increase pages"
              >+</Button>
            </div>
          </div>
          {/* Color Mode */}
          <div className="flex items-center justify-between px-5 py-5">
            <div className="font-medium text-base">Color Mode</div>
            <div className="flex bg-gray-100 rounded-full">
              <button
                className={cn(
                  "px-4 py-1 font-semibold rounded-full transition",
                  color === "bw"
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-400"
                )}
                onClick={() => setColor("bw")}
                type="button"
              >
                B/W
              </button>
              <button
                className={cn(
                  "px-4 py-1 font-semibold rounded-full transition",
                  color === "color"
                    ? "bg-blue-600 text-white shadow"
                    : "text-gray-400"
                )}
                onClick={() => setColor("color")}
                type="button"
              >
                Color
              </button>
            </div>
          </div>
          {/* Copies */}
          <div className="flex items-center justify-between px-5 py-5">
            <div className="font-medium text-base">Copies</div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-9 h-9 text-xl"
                onClick={() => setCopies(c => Math.max(minCopies, c - 1))}
                aria-label="decrease copies"
              >-</Button>
              <div className="w-6 text-center text-lg font-semibold">{copies}</div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-9 h-9 text-xl"
                onClick={() => setCopies(c => Math.min(maxCopies, c + 1))}
                aria-label="increase copies"
              >+</Button>
            </div>
          </div>
          {/* Double-sided */}
          <div className="flex items-center justify-between px-5 py-5">
            <div className="font-medium text-base">Double-sided</div>
            <Switch checked={doubleSided} onCheckedChange={setDoubleSided} />
          </div>
        </div>
        {/* Buttons */}
        <div className="flex gap-4 w-full mb-6 px-2">
          <Button
            variant="outline"
            className="flex-1 h-12 rounded-full text-base font-semibold shadow-sm bg-gray-100"
            onClick={handleReset}
            type="button"
          >
            Reset
          </Button>
          <Button
            className="flex-1 h-12 rounded-full text-base font-semibold shadow-md bg-blue-600 hover:bg-blue-700"
            style={{ color: "#fff" }}
            onClick={handleCalculate}
            type="button"
          >
            Calculate
          </Button>
        </div>
        {/* Estimate Result */}
        {showEstimate && cost !== null && (
          <div className="mt-2 mb-3 px-1 py-2 rounded-2xl border shadow-sm border-gray-300 max-w-md bg-white flex flex-col items-center animate-in fade-in zoom-in-95">
            <div className="flex items-center text-blue-500 font-semibold mb-0.5">
              <FileText size={20} className="mr-2" />
              Estimated Cost
            </div>
            <div className="font-extrabold text-4xl text-blue-400 mb-1 flex items-end">
              <span className="text-2xl mr-1" style={{ fontFamily: "monospace" }}>₹</span>
              {cost.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400 text-center mb-1">
              *Final cost may vary based on exact print details.
            </div>
          </div>
        )}
      </div>
      {/* The Tab Bar */}
      <div className="fixed bottom-0 left-0 w-full">
        <TabBar selected={1} />
      </div>
    </div>
  );
};

export default EstimateCostPage;
