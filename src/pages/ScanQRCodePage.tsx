import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader";
import { ChevronLeft } from "lucide-react";
import { useState } from "react";

const ScanQRCodePage = () => {
  const navigate = useNavigate();
  const [hasScanned, setHasScanned] = useState(false);

  // When a QR code is scanned, navigate to the URL encoded in the QR (if present), otherwise fallback to /upload
  const handleQrResult = (result: any, error: any) => {
    if (!!result && !hasScanned) {
      setHasScanned(true);
      // If the QR code contains a URL, navigate to it
      const text = result?.text || "";
      if (text.startsWith("http://") || text.startsWith("https://")) {
        window.location.href = text;
      } else {
        navigate("/upload");
      }
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-0 pt-4 pb-4 relative">
      {/* Header */}
      <div className="flex items-center mb-4 px-4">
        <button
          onClick={() => navigate(-1)}
          className="mr-2 p-1 rounded hover:bg-gray-100"
          aria-label="Back"
        >
          <ChevronLeft size={28} className="text-black" />
        </button>
        <h1 className="text-xl font-bold text-black flex-1 text-center pr-8">
          Scan Kiosk QR Code
        </h1>
      </div>

      {/* Scanner Container */}
      <div className="flex-1 flex flex-col items-center justify-start mt-2">
        <div className="w-[260px] h-[260px] rounded-[24px] border-4 border-[#4877F7] flex items-center justify-center bg-white my-4 relative overflow-hidden">
          {/* QR code scanner video */}
          {!hasScanned && (
            <QrReader
              constraints={{ facingMode: "environment" }}
              onResult={handleQrResult}
              containerStyle={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                borderRadius: '24px',
                overflow: 'hidden'
              }}
              videoStyle={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "24px"
              }}
            />
          )}
          {/* Scan icon overlay */}
          <svg
            width={54}
            height={54}
            viewBox="0 0 54 54"
            fill="none"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          >
            <rect
              x={2}
              y={2}
              width={50}
              height={50}
              rx={12}
              stroke="#4877F7"
              strokeWidth={3}
              fill="none"
            />
            <path
              d="M19 27c0-4.418 3.582-8 8-8m0 0c4.418 0 8 3.582 8 8m-8-8v16m8-8H11"
              stroke="#4877F7"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity={0}
            />
            <g>
              <rect x="20" y="20" width="14" height="14" rx="3" stroke="#4877F7" strokeWidth={2} fill="none" />
              <rect x="26" y="26" width="2" height="2" rx="1" fill="#4877F7" />
              {/* 4 corners marks */}
              <path d="M20 24v-1a3 3 0 013-3h1" stroke="#4877F7" strokeWidth="2" strokeLinecap="round"/>
              <path d="M34 24v-1a3 3 0 00-3-3h-1" stroke="#4877F7" strokeWidth="2" strokeLinecap="round"/>
              <path d="M20 30v1a3 3 0 003 3h1" stroke="#4877F7" strokeWidth="2" strokeLinecap="round"/>
              <path d="M34 30v1a3 3 0 01-3 3h-1" stroke="#4877F7" strokeWidth="2" strokeLinecap="round"/>
            </g>
          </svg>
        </div>
        {/* Instruction */}
        <div className="font-medium text-center text-black text-base px-4 mb-6 mt-2" style={{ maxWidth: 330 }}>
          Align the QR code within the frame to connect to the kiosk or open the upload page
        </div>
        {/* Need Help */}
        <button
          type="button"
          className="mt-auto mb-2 text-blue-600 font-medium"
          onClick={() => alert("Please ask staff for help at the kiosk.")}
        >
          Need Help?
        </button>
      </div>
    </div>
  );
};

export default ScanQRCodePage;
