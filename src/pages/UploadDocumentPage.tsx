
import { ChevronLeft, Upload, Cloud, FileStack } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UploadDocumentPage = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white flex flex-col px-0 pt-4 pb-4 relative">
      {/* Header */}
      <div className="flex items-center mb-2 px-4">
        <button
          onClick={() => navigate(-1)}
          className="mr-2 p-1 rounded hover:bg-gray-100"
          aria-label="Back"
        >
          <ChevronLeft size={28} className="text-black" />
        </button>
        <h1 className="text-xl font-bold text-black flex-1 text-center pr-8">
          Upload Your Document
        </h1>
      </div>
      {/* Subtext */}
      <p className="text-gray-400 text-base px-4 pb-0 text-center mb-5">
        Choose a source to upload your document for printing.
      </p>

      {/* Upload options */}
      <div className="flex flex-col gap-4 px-5 mt-2 mb-10">
        <button className="flex items-center w-full border border-gray-300 rounded-2xl bg-white px-5 py-4 shadow-sm hover:border-blue-400 transition focus:outline-none">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 mr-5">
            <Upload size={26} className="text-blue-500" />
          </span>
          <div className="flex flex-col items-start">
            <span className="font-semibold text-base text-black">Upload from Device</span>
            <span className="text-gray-400 text-sm mt-0.5">Select a document directly from your phone or tablet.</span>
          </div>
        </button>
        <button className="flex items-center w-full border border-gray-300 rounded-2xl bg-white px-5 py-4 shadow-sm hover:border-blue-400 transition focus:outline-none">
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 mr-5">
            <FileStack size={26} className="text-blue-500" />
          </span>
          <div className="flex flex-col items-start">
            <span className="font-semibold text-base text-black">Import from Google Drive</span>
            <span className="text-gray-400 text-sm mt-0.5">Access your documents stored in Google Drive</span>
          </div>
        </button>
      </div>
      {/* Bottom button */}
      <div className="fixed bottom-5 left-0 w-full flex justify-center pointer-events-none z-10">
        <Button className="w-[90%] max-w-md mx-auto h-12 rounded-full bg-blue-600 text-white font-medium text-lg pointer-events-auto shadow-lg">Continue</Button>
      </div>
    </div>
  );
};

export default UploadDocumentPage;
