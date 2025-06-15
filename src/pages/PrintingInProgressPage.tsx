
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Printer, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const stepInfo = [
  {
    label: "Preparing",
    color: "#4664EA",
    icon: null,
    message: "Your document is being prepared...",
    subtext: "Please wait while we queue your document for printing.",
    spinner: true,
  },
  {
    label: "Printing",
    color: "#3b82f6",
    icon: <Printer size={28} className="text-blue-400" />,
    message: "Your document is printing...",
    subtext: "Hang tight, your document is being printed right now!",
    spinner: true,
  },
  {
    label: "Done",
    color: "#22c55e",
    icon: <Check size={28} className="text-green-500" />,
    message: "Print complete!",
    subtext: "You may now collect your document.",
    spinner: false,
  }
];

const PrintingInProgressPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 2000);
      return () => clearTimeout(timer);
    } else if (step === 1) {
      const timer = setTimeout(() => setStep(2), 3000);
      return () => clearTimeout(timer);
    }
    // if step 2 (Done) do nothing.
  }, [step]);

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
          <div className="flex flex-col items-center transition-all duration-500">
            <div className={
              `size-12 rounded-full flex items-center justify-center border-4 ${
                step >= 0 ? "bg-[#4664EA]/90 border-[#EAEFFF]" : "bg-[#f9faff] border-[#ececff]"
              } transition-all duration-500`
            }>
              <div className={`size-7 rounded-full border-2 flex items-center justify-center ${
                step >= 0 ? "border-[#4664EA]" : "border-[#bfc2de]"
              } transition-all`}>
                <div className={`size-4 rounded-full ${
                  step >= 0 ? "bg-[#4664EA]" : "bg-[#bfc2de]"
                }`} />
              </div>
            </div>
            <div className={`text-sm mt-2 font-medium ${
              step === 0 ? "text-[#4664EA]" : "text-[#bfc2de]"
            } transition-all`}>Preparing</div>
          </div>
          {/* Step bar */}
          <div style={{ width: 36, height: 4, background: step > 0 ? "#4664EA" : "#ececff" }} className="transition-all duration-700" />
          {/* Step 2: Printing */}
          <div className="flex flex-col items-center transition-all duration-500">
            <div className={
              `size-12 rounded-full flex items-center justify-center border-4 ${
                step >= 1 ? "bg-blue-100 border-blue-200" : "bg-[#f9faff] border-[#ececff]"
              } transition-all duration-500`
            }>
              {step >= 1
                ? <Printer size={28} className="text-blue-400" />
                : <Printer size={28} className="text-[#bfc2de]" />
              }
            </div>
            <div className={`text-sm mt-2 font-medium ${
              step === 1 ? "text-blue-500" : "text-[#bfc2de]"
            } transition-all`}>Printing</div>
          </div>
          {/* Step bar */}
          <div style={{ width: 36, height: 4, background: step === 2 ? "#22c55e" : "#ececff" }} className="transition-all duration-700" />
          {/* Step 3: Done */}
          <div className="flex flex-col items-center transition-all duration-500">
            <div className={
              `size-12 rounded-full flex items-center justify-center border-4 ${
                step === 2 ? "bg-green-100 border-green-200" : "bg-[#f9faff] border-[#ececff]"
              } transition-all duration-500`
            }>
              {step === 2
                ? <Check size={28} className="text-green-500" />
                : <Check size={28} className="text-[#bfc2de]" />
              }
            </div>
            <div className={`text-sm mt-2 font-medium ${
              step === 2 ? "text-green-600" : "text-[#bfc2de]"
            } transition-all`}>Done</div>
          </div>
        </div>
      </div>
      {/* Status message */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="text-2xl font-semibold text-center mb-4 mt-6 text-black animate-fade-in" key={step}>
          {stepInfo[step].message}
        </div>
        <div className="text-base text-gray-400 text-center mb-8 max-w-xs animate-fade-in" key={step + '_desc'}>
          {stepInfo[step].subtext}
        </div>
        {/* Loading spinner or success indicator */}
        {stepInfo[step].spinner ? (
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
              stroke={step === 0 ? "#7358c6" : "#0066ff"}
              strokeWidth="4.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <div className="flex flex-col items-center gap-2 animate-fade-in">
            <Check size={56} className="text-green-500" />
          </div>
        )}
      </div>
      {/* Report an issue or Done action */}
      <div className="pb-7 flex justify-center">
        {step !== 2 ? (
          <Button
            variant="link"
            className="text-[#4664EA] text-base font-normal underline-offset-2"
            onClick={() => window.alert("Issue reporting not implemented yet.")}
          >
            Report an issue
          </Button>
        ) : (
          <Button
            className="px-8 py-2 rounded-full bg-green-600 text-white font-medium text-base pointer-events-auto shadow-lg hover:bg-green-700 transition"
            onClick={() => navigate("/")}
          >
            Go Home
          </Button>
        )}
      </div>
    </div>
  );
};

export default PrintingInProgressPage;
