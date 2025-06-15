import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ArrowLeft, Minus, Plus, FileText } from "lucide-react";

type LocationState = {
  uploadedFileName: string;
  numPages: number;
};

const getEstimatedCost = ({
  pages,
  color,
  copies,
  doubleSided
}: {
  pages: number;
  color: "bw" | "color";
  copies: number;
  doubleSided: boolean;
}) => {
  let pricePerPage = color === "color" ? 0.75 : 0.25;
  let sidesAdj = doubleSided ? 0.5 : 1;
  // For demonstration: (e.g. double-sided is 50% cheaper)
  return Math.round(pricePerPage * pages * copies * sidesAdj * 100) / 100;
};

const SetPrintPreferencesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { uploadedFileName, numPages } = location.state as LocationState;

  // State
  const [color, setColor] = useState<"bw" | "color">("bw");
  const [copies, setCopies] = useState(1);
  const [doubleSided, setDoubleSided] = useState(false);
  const [direction, setDirection] = useState<"portrait" | "landscape">("portrait");

  const minCopies = 1;
  const maxCopies = 100;

  const estimatedCost = getEstimatedCost({
    pages: numPages,
    color,
    copies,
    doubleSided,
  });

  return (
    <div className="min-h-screen bg-white flex flex-col px-0 pt-4 pb-4 relative">
      {/* Header */}
      <div className="flex items-center mb-2 px-4">
        <button
          onClick={() => navigate(-1)}
          className="mr-2 p-1 rounded hover:bg-gray-100"
          aria-label="Back"
        >
          <ArrowLeft size={28} className="text-black" />
        </button>
        <h1 className="text-xl font-bold text-black flex-1 text-center pr-8">
          Set Print Preferences
        </h1>
      </div>
      {/* File info on top */}
      <div className="flex flex-col items-center mt-2 mb-4">
        <span className="font-semibold text-base text-black">{uploadedFileName}</span>
        <span className="text-xs text-gray-400">{numPages} page{numPages !== 1 ? "s" : ""}</span>
      </div>
      {/* Card/form */}
      <div className="mx-auto w-full max-w-md px-2 pt-1">
        {/* Color mode */}
        <div className="flex items-center justify-between rounded-2xl bg-white border border-gray-200 px-5 py-4 mb-3">
          <div className="font-semibold text-base">Color Mode</div>
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
        {/* Direction */}
        <div className="flex items-center justify-between rounded-2xl bg-white border border-gray-200 px-5 py-4 mb-3">
          <div className="font-semibold text-base">Direction</div>
          <div className="flex bg-gray-100 rounded-full">
            <button
              className={cn(
                "px-4 py-1 font-semibold rounded-full transition",
                direction === "portrait"
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-400"
              )}
              onClick={() => setDirection("portrait")}
              type="button"
            >
              Portrait
            </button>
            <button
              className={cn(
                "px-4 py-1 font-semibold rounded-full transition",
                direction === "landscape"
                  ? "bg-blue-600 text-white shadow"
                  : "text-gray-400"
              )}
              onClick={() => setDirection("landscape")}
              type="button"
            >
              Landscape
            </button>
          </div>
        </div>
        {/* Copies */}
        <div className="flex items-center justify-between rounded-2xl bg-white border border-gray-200 px-5 py-4 mb-3">
          <div className="font-semibold text-base">Copies</div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9 h-9 text-xl"
              onClick={() => setCopies(c => Math.max(minCopies, c - 1))}
              aria-label="decrease copies"
              type="button"
            >
              <Minus size={18} />
            </Button>
            <div className="w-6 text-center text-lg font-semibold">{copies}</div>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full w-9 h-9 text-xl"
              onClick={() => setCopies(c => Math.min(maxCopies, c + 1))}
              aria-label="increase copies"
              type="button"
            >
              <Plus size={18} />
            </Button>
          </div>
        </div>
        {/* Double-sided */}
        <div className="flex items-center justify-between rounded-2xl bg-white border border-gray-200 px-5 py-4 mb-5">
          <div className="font-semibold text-base">Double-sided</div>
          <Switch checked={doubleSided} onCheckedChange={setDoubleSided} />
        </div>
        {/* Estimated Cost */}
        <div className="mb-7 px-1 py-3 rounded-2xl border shadow-sm border-gray-300 max-w-md bg-white flex flex-col items-center animate-in fade-in zoom-in-95">
          <div className="flex items-center text-blue-500 font-semibold mb-0.5">
            <FileText size={20} className="mr-2" />
            Estimated Cost
          </div>
          <div className="font-extrabold text-4xl text-blue-400 mb-1 flex items-end">
            <span className="text-2xl mr-1" style={{ fontFamily: "monospace" }}>₹</span>
            {estimatedCost.toFixed(2)}
          </div>
          <div className="text-xs text-gray-400 text-center mb-1">
            *Final cost may vary based on exact print details.
          </div>
        </div>
      </div>
      {/* Bottom button */}
      <div className="fixed bottom-5 left-0 w-full flex justify-center pointer-events-none z-10">
        <Button
          className="w-[90%] max-w-md mx-auto h-12 rounded-full bg-blue-600 text-white font-medium text-lg pointer-events-auto shadow-lg"
          onClick={() => {
            // You might handle order submit here
            toast({
              title: "Order not implemented",
              description: "This is just a demo.",
            });
          }}
        >
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default SetPrintPreferencesPage;
