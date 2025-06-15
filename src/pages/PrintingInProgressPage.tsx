
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Printer, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const PrintingInProgressPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center pt-7 px-4 pb-4">
        <button
          onClick={() => navigate(-1)}
          className="mr-3 p-1 rounded-full hover:bg-gray-100"
          aria-label="Back"
        >
          <ArrowLeft size={28} className="text-black" />
        </button>
        <h1 className="text-xl font-bold text-black flex-1 text-center" style={{ letterSpacing: -0.5 }}>
          Printing in Progress
        </h1>
        <div className="w-8" />
      </div>
      {/* Stepper */}
      <div className="flex flex-col items-center mt-2 mb-10">
        <div className="flex items-center gap-7 mb-2">
          {/* Step 1: Prepare */}
          <div className="flex flex-col items-center">
            <div className="size-12 rounded-full bg-[#4664EA]/90 flex items-center justify-center border-4 border-[#EAEFFF]">
              <div className="size-7 rounded-full border-2 border-[#4664EA] flex items-center justify-center">
                <div className="size-4 bg-[#4664EA] rounded-full" />
              </div>
            </div>
            <div className="text-sm mt-2 font-medium text-[#4664EA]">Preparing</div>
          </div>
          {/* Step bar */}
          <div style={{ width: 36, height: 4, background: "#ececff" }} />
          {/* Step 2: Printing */}
          <div className="flex flex-col items-center">
            <div className="size-12 rounded-full bg-[#f9faff] flex items-center justify-center">
              <Printer size={28} className="text-[#bfc2de]" />
            </div>
            <div className="text-sm mt-2 font-medium text-[#bfc2de]">Printing</div>
          </div>
          {/* Step bar */}
          <div style={{ width: 36, height: 4, background: "#ececff" }} />
          {/* Step 3: Done */}
          <div className="flex flex-col items-center">
            <div className="size-12 rounded-full bg-[#f9faff] flex items-center justify-center">
              <Check size={28} className="text-[#bfc2de]" />
            </div>
            <div className="text-sm mt-2 font-medium text-[#bfc2de]">Done</div>
          </div>
        </div>
      </div>
      {/* Status message */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-2xl font-semibold text-center mb-4 mt-6 text-black">
          Your document is being prepared...
        </div>
        <div className="text-base text-gray-400 text-center mb-8 max-w-xs">
          Please wait while we queue your document for printing.
        </div>
        {/* Loading spinner */}
        <svg className="animate-spin" width={46} height={46} viewBox="0 0 40 40">
          <circle
            cx="20"
            cy="20"
            r="17"
            stroke="#eaeaff"
            strokeWidth="4.5"
            fill="none"
          />
          <path
            d="M37 20A17 17 0 1 1 20 3"
            stroke="#7358c6"
            strokeWidth="4.5"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {/* Report an issue */}
      <div className="pb-7 flex justify-center">
        <Button
          variant="link"
          className="text-[#4664EA] text-base font-normal underline-offset-2"
          onClick={() => window.alert("Issue reporting not implemented yet.")}
        >
          Report an issue
        </Button>
      </div>
    </div>
  );
};

export default PrintingInProgressPage;
