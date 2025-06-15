
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Check } from "lucide-react";

const PrintConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Get previous print details if available
  const {
    uploadedFileName = "Resume.pdf", // fallback name
    totalPaid = 16,
    printTime = "2 mins ago",
  } = (location.state || {}) as {
    uploadedFileName?: string;
    totalPaid?: number | string;
    printTime?: string;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white justify-center items-center pt-6">
      <div className="mb-5 mt-8">
        <div className="flex justify-center">
          <span className="inline-flex rounded-full border-4 border-green-100 p-4">
            <Check size={80} className="text-green-500" />
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mt-7 mb-7 text-black">
          Your Document is Ready!
        </h2>

        {/* Print Details Box */}
        <div className="mx-auto w-[90vw] max-w-sm rounded-2xl border border-gray-300 bg-white px-6 py-5 shadow-sm">
          <div className="text-lg font-bold text-center mb-2">Print Details</div>
          <div className="flex flex-col gap-2 text-base">
            <div className="flex items-center gap-3">
              {/* File Icon */}
              <svg width="23" height="23" fill="none" viewBox="0 0 24 24">
                <rect x="6" y="3" width="12" height="18" rx="2.3" stroke="#4664ea" strokeWidth="1.6"/>
                <path d="M8 7h8M8 11h8M8 15h5" stroke="#4664ea" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <span className="text-gray-400">File Name: <span className="text-gray-700">{uploadedFileName}</span></span>
            </div>
            <div className="flex items-center gap-3">
              {/* Clock Icon */}
              <svg width="23" height="23" fill="none" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="9.3" stroke="#4664ea" strokeWidth="1.6"/>
                <path d="M12 7v5h4" stroke="#4664ea" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              <span className="text-gray-400">Print time: <span className="text-gray-700">{printTime}</span></span>
            </div>
            <div className="flex items-center gap-3">
              {/* Wallet Icon */}
              <svg width="23" height="23" fill="none" viewBox="0 0 24 24">
                <rect x="4" y="7.9" width="16" height="8.2" rx="2" stroke="#4664ea" strokeWidth="1.6"/>
                <rect x="14.5" y="11" width="2.5" height="2" rx="1" fill="#4664ea"/>
              </svg>
              <span className="text-gray-400">
                Total Paid: <span className="text-gray-700 font-medium">₹{Number(totalPaid).toFixed(2)}</span>
              </span>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="block w-full max-w-md mx-auto mt-10 rounded-full bg-[#2853de] hover:bg-[#4664ea] text-white text-lg font-medium px-6 py-4 shadow transition"
          style={{
            boxShadow: "0px 2px 7px 1px rgba(65,100,232,0.05)",
          }}
          onClick={() => navigate("/upload")}
        >
          Print Another Document
        </button>
        <button
          type="button"
          className="block w-full max-w-md mx-auto mt-4 rounded-full bg-gray-100 hover:bg-gray-200 text-[#2853de] border border-[#2853de] text-lg font-medium px-6 py-4 shadow-none transition"
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    </div>
  );
};

export default PrintConfirmationPage;

