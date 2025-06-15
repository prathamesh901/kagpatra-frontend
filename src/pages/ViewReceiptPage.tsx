
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Download } from "lucide-react";

const ViewReceiptPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Job details fallback (in real app, replace/mock as needed)
  const {
    filename = "Project Proposal.pdf",
    datetime = "2025-06-15 10:30 AM",
    status = "Completed",
    totalPaid = 35.00,
    printTime = "2 min",
  } = (location.state || {}) as {
    filename?: string;
    datetime?: string;
    status?: string;
    totalPaid?: number;
    printTime?: string;
  };

  // Print the page (user can "Save as PDF")
  const handleDownload = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center py-10 px-2 print:px-0">
      <div className="max-w-md w-full bg-white border border-gray-300 rounded-2xl shadow-sm px-6 py-7 print:shadow-none print:border print:rounded-none print:max-w-full">
        <h1 className="text-2xl font-bold text-center mb-6">Print Receipt</h1>
        <div className="space-y-4 text-base text-gray-700">
          <div>
            <span className="text-gray-400">File Name: </span>
            <span>{filename}</span>
          </div>
          <div>
            <span className="text-gray-400">Date & Time: </span>
            <span>{datetime}</span>
          </div>
          <div>
            <span className="text-gray-400">Status: </span>
            <span
              className={
                status === "Completed"
                  ? "bg-green-100 text-green-700 font-semibold rounded px-2"
                  : "bg-gray-100 text-gray-600 font-semibold rounded px-2"
              }
            >
              {status}
            </span>
          </div>
          <div>
            <span className="text-gray-400">Print Time: </span>
            <span>{printTime}</span>
          </div>
          <div>
            <span className="text-gray-400">Total Paid: </span>
            <span className="font-medium">₹{Number(totalPaid).toFixed(2)}</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-8 print:hidden">
          <button
            className="flex items-center justify-center w-full gap-2 rounded-full bg-[#2853de] hover:bg-[#4664ea] text-white text-lg font-medium px-6 py-3 shadow transition"
            onClick={handleDownload}
          >
            <Download size={22} /> Download Receipt
          </button>
          <button
            className="w-full rounded-full border border-[#2853de] bg-gray-100 hover:bg-gray-200 text-[#2853de] text-lg font-medium px-6 py-3"
            onClick={() => navigate("/home")}
            type="button"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewReceiptPage;
