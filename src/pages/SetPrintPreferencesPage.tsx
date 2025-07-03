import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { ArrowLeft, Minus, Plus, FileText } from "lucide-react";
import { BACKEND_URL } from "@/config";

type LocationState = {
  uploadedFileName: string;
  numPages: number;
  backendFilePath: string;
};

type PageSelection = "all" | "odd" | "even" | "custom";

const parseCustomPageRange = (range: string, totalPages: number): number => {
  if (!range.trim()) return 0;
  let count = 0;
  const parts = range.split(",");
  for (let part of parts) {
    part = part.trim();
    if (/^\d+$/.test(part)) {
      const page = parseInt(part, 10);
      if (page >= 1 && page <= totalPages) count++;
    } else if (/^(\d+)-(\d+)$/.test(part)) {
      const [, start, end] = part.match(/(\d+)-(\d+)/) || [];
      if (start && end) {
        const s = Math.max(1, parseInt(start, 10));
        const e = Math.min(totalPages, parseInt(end, 10));
        if (s <= e) count += e - s + 1;
      }
    }
  }
  return count;
};

const getEstimatedCost = ({
  pages,
  color,
  copies,
  doubleSided,
  pageSelection,
  customPageRange,
}: {
  pages: number;
  color: "bw" | "color";
  copies: number;
  doubleSided: boolean;
  pageSelection: PageSelection;
  customPageRange?: string;
}) => {
  let pricePerPage = color === "color" ? 10 : 5;
  let sidesAdj = doubleSided ? 2 : 1;
  let effectivePages = pages;
  if (pageSelection === "odd" || pageSelection === "even") {
    effectivePages = Math.ceil(pages / 2);
  } else if (pageSelection === "custom" && customPageRange) {
    effectivePages = parseCustomPageRange(customPageRange, pages);
    if (effectivePages === 0) effectivePages = 1;
  }
  return Math.round(pricePerPage * effectivePages * copies * sidesAdj * 100) / 100;
};

const SetPrintPreferencesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { uploadedFileName, numPages, backendFilePath } = location.state as LocationState;

  const [color, setColor] = useState<"bw" | "color">("bw");
  const [copies, setCopies] = useState(1);
  const [doubleSided, setDoubleSided] = useState(false);
  const [direction, setDirection] = useState<"portrait" | "landscape">("portrait");
  const [pageSelection, setPageSelection] = useState<PageSelection>("all");
  const [customPageRange, setCustomPageRange] = useState("");

  const estimatedCost = getEstimatedCost({
    pages: numPages,
    color,
    copies,
    doubleSided,
    pageSelection,
    customPageRange,
  });

  const handleProceedToPayment = async () => {
    if (!backendFilePath) {
      toast({ title: "Error", description: "No file path found. Please go back and re-upload your document." });
      return;
    }

    // Generate proper pageRanges for backend CUPS
    let pageRanges = "1";
    if (pageSelection === "odd") {
      pageRanges = Array.from({ length: numPages }, (_, i) => i + 1)
        .filter((p) => p % 2 === 1)
        .join(",");
    } else if (pageSelection === "even") {
      pageRanges = Array.from({ length: numPages }, (_, i) => i + 1)
        .filter((p) => p % 2 === 0)
        .join(",");
    } else if (pageSelection === "custom") {
      pageRanges = customPageRange || "1";
    } else {
      pageRanges = `1-${numPages}`;
    }

    const preferences = {
      color: color === "color" ? "Color" : "Grayscale",
      copies,
      pageSize: "A4",
      pageRanges,
      doubleSided,
      direction,
    };

    // Send preferences to backend
    const jobId = window.sessionStorage.getItem("jobId");
    if (jobId) {
      await fetch(`${BACKEND_URL}/api/preferences`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId, preferences }),
      });
    }

    navigate("/payment", {
      state: {
        uploadedFileName,
        numPages,
        estimatedCost,
        backendFilePath, // pass file path to payment page
        preferences, // pass preferences if needed
      },
    });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 pt-4 pb-16">
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate(-1)}
          className="mr-2 p-1 rounded hover:bg-gray-100"
        >
          <ArrowLeft size={24} className="text-black" />
        </button>
        <h1 className="text-xl font-bold text-black flex-1 text-center pr-8">
          Set Print Preferences
        </h1>
      </div>

      <div className="text-center mb-4">
        <strong>{uploadedFileName}</strong>
        <div className="text-gray-500 text-sm">{numPages} page(s)</div>
      </div>

      {/* Color Selection */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Color</span>
          <div className="flex gap-2">
            <Button
              variant={color === "bw" ? "default" : "outline"}
              onClick={() => setColor("bw")}
            >
              B/W
            </Button>
            <Button
              variant={color === "color" ? "default" : "outline"}
              onClick={() => setColor("color")}
            >
              Color
            </Button>
          </div>
        </div>
      </div>

      {/* Copies */}
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Copies</span>
          <div className="flex items-center gap-2">
            <Button onClick={() => setCopies((c) => Math.max(1, c - 1))}>
              <Minus size={18} />
            </Button>
            <span className="text-lg">{copies}</span>
            <Button onClick={() => setCopies((c) => c + 1)}>
              <Plus size={18} />
            </Button>
          </div>
        </div>
      </div>

      {/* Page Selection */}
      <div className="mb-4">
        <span className="font-semibold block mb-1">Pages</span>
        <Select value={pageSelection} onValueChange={(v: PageSelection) => setPageSelection(v)}>
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="odd">Odd</SelectItem>
            <SelectItem value="even">Even</SelectItem>
            <SelectItem value="custom">Custom</SelectItem>
          </SelectContent>
        </Select>
        {pageSelection === "custom" && (
          <Input
            placeholder="e.g. 1,3,5-7"
            className="mt-2"
            value={customPageRange}
            onChange={(e) => setCustomPageRange(e.target.value)}
          />
        )}
      </div>

      {/* Double-sided */}
      <div className="mb-4 flex items-center justify-between">
        <span className="font-semibold">Double-sided</span>
        <Switch checked={doubleSided} onCheckedChange={setDoubleSided} />
      </div>

      {/* Cost */}
      <div className="mb-6 text-center border p-4 rounded-xl shadow bg-gray-50">
        <div className="text-sm text-gray-500 mb-1">Estimated Cost</div>
        <div className="text-blue-600 font-bold text-2xl">₹{estimatedCost.toFixed(2)}</div>
      </div>

      {/* Continue */}
      <div className="fixed bottom-5 w-full left-0 flex justify-center">
        <Button className="w-[90%] max-w-md" onClick={handleProceedToPayment}>
          Proceed to Payment
        </Button>
      </div>
    </div>
  );
};

export default SetPrintPreferencesPage;
