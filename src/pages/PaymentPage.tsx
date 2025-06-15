
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type PaymentLocationState = {
  uploadedFileName?: string;
  numPages?: number;
  estimatedCost?: number;
};

const paymentMethods = [
  {
    id: "upi",
    label: "UPI",
    description: "Linked to GPay",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="18" height="10" rx="2" stroke="#222" strokeWidth={1.5}/><circle cx="7.5" cy="12" r="1" fill="#222"/><circle cx="16.5" cy="12" r="1" fill="#222"/></svg>
    ),
  },
  {
    id: "wallet",
    label: "Digital Wallet",
    description: "Paytm, PhonePe, MobiKwik",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="4" y="7" width="16" height="10" rx="2" stroke="#777" strokeWidth={1.5}/><rect x="8" y="9" width="8" height="6" rx="1" stroke="#777" strokeWidth={1.2}/></svg>
    ),
  },
  {
    id: "card",
    label: "Credit / Debit Card",
    description: "**** 4567 (Visa)",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none"><rect x="3" y="6" width="18" height="12" rx="2" stroke="#777" strokeWidth={1.5}/><rect x="3" y="10" width="18" height="2" fill="#777"/></svg>
    ),
  },
];

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    uploadedFileName = "Document.pdf",
    numPages = 1,
    estimatedCost = 0,
  } = (location.state || {}) as PaymentLocationState;

  // Payment method state
  const [selected, setSelected] = React.useState("upi");

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center pt-7 px-4 pb-4">
        <button onClick={() => navigate(-1)} className="mr-3 p-1 rounded-full hover:bg-gray-100">
          <svg width={28} height={28} viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#191D23" strokeWidth={2.0} strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
        <h1 className="text-xl font-bold text-black flex-1 text-center" style={{ letterSpacing: -0.5 }}>
          Payment
        </h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 w-full max-w-md mx-auto px-2 pb-4">
        {/* Print Summary Card */}
        <div className="rounded-2xl border border-gray-300 px-5 py-4 mb-5 bg-white min-w-[90%] shadow-sm">
          <div className="text-lg font-semibold text-gray-500 mb-2">Print Summary</div>
          <div className="text-base mb-1">Document: <span className="font-semibold text-gray-700">{uploadedFileName}</span></div>
          <div className="text-base text-gray-700 mb-2">Pages: <span className="font-semibold">{numPages}</span></div>
          <div className="mt-3 border-t pt-3 flex flex-col items-center">
            <div className="text-base text-gray-400 mb-1">Total Amount</div>
            <div className="text-4xl font-bold text-blue-500">
              <span className="text-2xl mr-1" style={{ fontFamily: "monospace" }}>₹</span>
              {(estimatedCost ?? 0).toFixed(2)}
            </div>
          </div>
        </div>
        {/* Payment Method Selector */}
        <div className="text-lg font-bold text-center mb-3">Choose Payment Method</div>
        <div className="flex flex-col gap-3">
          {paymentMethods.map((pm) => (
            <button
              key={pm.id}
              className={cn(
                "flex items-center w-full px-4 py-3 rounded-xl border text-left shadow-sm transition focus:outline-none",
                selected === pm.id
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-white hover:bg-gray-50"
              )}
              onClick={() => setSelected(pm.id)}
              type="button"
            >
              <span className="mr-3">{pm.icon}</span>
              <div className="flex-1">
                <div className={selected === pm.id ? "text-blue-700 font-semibold" : "text-gray-800 font-semibold"}>
                  {pm.label}
                </div>
                <div className="text-gray-400 text-sm">{pm.description}</div>
              </div>
              <span className="ml-3">
                {selected === pm.id ? (
                  <span className="border-2 border-blue-600 rounded-full w-5 h-5 flex items-center justify-center bg-white">
                    <span className="w-3 h-3 bg-blue-600 rounded-full block" />
                  </span>
                ) : (
                  <span className="border-2 border-gray-300 rounded-full w-5 h-5 block" />
                )}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Pay Now button */}
      <div className="fixed bottom-4 left-0 w-full flex justify-center z-10 pointer-events-none select-none">
        <Button
          className="w-[90%] max-w-md mx-auto h-12 rounded-full bg-blue-600 text-white font-medium text-lg pointer-events-auto shadow-lg"
          style={{ fontFamily: "inherit" }}
          onClick={() => {
            // Redirect to printing in progress page (now using client-side navigation)
            navigate("/printing");
          }}
        >
          <Check className="mr-2" />Pay Now
        </Button>
      </div>
    </div>
  );
};

export default PaymentPage;
