import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

const slides = [
  {
    img: "/lovable-uploads/2bfe247f-f532-4f52-b7d0-801f29780844.png?v=" + Date.now(),
    title: "Scan to Begin",
    description: "Scan the QR code on any Kagpatra kiosk using our app to start printing.",
  },
  {
    img: "/lovable-uploads/ea5c2c4c-603e-45b8-9b56-b584821d70f8.png?v=" + Date.now(),
    title: "Upload from Anywhere",
    description: "Upload documents from your phone, Google Drive, or scan a QR from another device.",
  },
  {
    img: "/lovable-uploads/4a2d0d7a-9a59-4f64-b666-8fcff38af22b.png?v=" + Date.now(),
    title: "Customize Your Print",
    description: "Choose color, paper size, quality, and number of copies just the way you need it.",
  },
  {
    img: "/lovable-uploads/7bfdaa92-8efd-4ba8-8c86-d21b4775bbaf.png?v=" + Date.now(),
    title: "Pay & Print Instantly",
    description: "Use UPI, wallet, or card for quick and secure payments before you print.",
  },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < slides.length - 1) setStep((s) => s + 1);
    else finish();
  };

  const handleSkip = () => finish();

  const finish = () => {
    navigate("/home");
  };

  return (
    <div className="h-screen w-full flex flex-col justify-between bg-white animate-fade-in">
      <div>
        <div className="flex items-center justify-between px-4 pt-4">
          {step > 0 ? (
            <button
              className="p-1 rounded-full hover:bg-gray-100"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              aria-label="Back"
            >
              <ChevronLeft size={26} />
            </button>
          ) : (
            <div className="w-8" />
          )}
          <button className="text-gray-400 font-medium" onClick={handleSkip}>Skip</button>
        </div>
        <div className="flex flex-col items-center px-4 pt-5">
          <img
            src={slides[step].img}
            alt={slides[step].title}
            className="max-w-[330px] w-full h-[350px] object-contain mb-3"
            draggable={false}
          />
          <h1 className="text-2xl font-extrabold text-black mb-2 text-center">{slides[step].title}</h1>
          <p className="text-gray-400 font-normal text-base mb-5 text-center max-w-xs">{slides[step].description}</p>
        </div>
      </div>
      {/* Dots & Next Button */}
      <div className="flex flex-col items-center pb-9">
        <div className="flex gap-2 mb-7">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${i === step ? 'bg-black' : 'bg-gray-300'}`}
            />
          ))}
        </div>
        <Button
          className="w-[85vw] max-w-md h-12 rounded-full bg-blue-600 text-white font-medium text-lg"
          onClick={handleNext}
        >
          {step === slides.length - 1 ? "Get Started" : "Next"}
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
