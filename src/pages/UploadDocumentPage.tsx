import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Upload, FileStack, Trash, Shield, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { countPdfPages, getFileTypeDisplayName } from "@/utils/pdfUtils";
import { BACKEND_URL } from "@/config";

const ACCEPTED_FORMATS = ".pdf,.doc,.docx,.txt,.jpg,.png";

type UploadOption = "device" | "google" | null;

const UploadDocumentPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<UploadOption>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const backendFilePathRef = useRef<string | null>(null);

  // Handle selection and trigger file picker for device
  const handleCardClick = (option: UploadOption) => {
    setSelected(option);
    setUploadedFile(null);
    setNumPages(1);
    if (option === "device" && fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
    // For Google, do nothing on click (show toast on Continue)
  };

  // Handle Continue logic
  const handleContinue = async () => {
    if (selected === "device") {
      if (uploadedFile && !isProcessing) {
        if (!backendFilePathRef.current) {
          toast({
            title: "Upload Error",
            description: "File upload failed. Please re-upload your document.",
            variant: "destructive",
          });
          return;
        }
        // Send file info to SetPrintPreferencesPage
        navigate("/set-print-preferences", {
          state: {
            uploadedFileName: uploadedFile.name,
            numPages: numPages,
            backendFilePath: backendFilePathRef.current,
          },
        });
      } else if (isProcessing) {
        toast({
          title: "Please wait",
          description: "Still analyzing your document...",
          variant: "default",
        });
      } else {
        toast({
          title: "No file selected",
          description: "Please select a document from your device first.",
          variant: "destructive",
        });
      }
    } else if (selected === "google") {
      toast({
        title: "Google Drive integration coming soon!",
        description: "This feature isn't available yet.",
        variant: "default",
      });
    }
  };

  // On file selected: count pages and set uploaded file
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFile(file);
    setIsProcessing(true);

    try {
      // Count PDF pages
      const pageCount = await countPdfPages(file);
      setNumPages(pageCount);

      const fileTypeDisplay = getFileTypeDisplayName(file);

      // Upload to backend (returns fileUrl and jobId)
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`${BACKEND_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        const data = await response.json();
        backendFilePathRef.current = data.fileUrl; // Use fileUrl for direct access
        // Save jobId for later steps (preferences, pay)
        window.sessionStorage.setItem("jobId", data.jobId);
        console.log("Backend upload response:", data);
      } else {
        backendFilePathRef.current = null;
        console.error("Upload failed or response not JSON", response);
        toast({
          title: "Upload failed",
          description: "Could not upload file. Please try again.",
          variant: "destructive",
        });
        setIsProcessing(false);
        return;
      }

      toast({
        title: "File selected",
        description: `Selected: ${file.name} (${fileTypeDisplay}${pageCount > 1 ? `, ${pageCount} pages` : ""})`,
      });
    } catch (error) {
      console.error("Error processing file:", error);
      setNumPages(1);
      toast({
        title: "File selected",
        description: `Selected: ${file.name} (1 page)`,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Handler to remove file
  const handleDeleteFile = () => {
    setUploadedFile(null);
    setNumPages(1);
    toast({
      title: "Removed",
      description: "The uploaded file has been removed",
    });
  };

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
      <p className="text-gray-400 text-base px-4 pb-0 text-center mb-2">
        Choose a source to upload your document for printing.
      </p>

      {/* Privacy Notice */}
      <div className="mx-4 mb-4 mt-2 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
        <div className="flex items-start gap-3">
          <Shield size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-green-800 font-medium text-sm mb-1">
              🔒 Your Privacy is Protected
            </p>
            <p className="text-green-700 text-xs leading-relaxed">
              Your document will be automatically deleted from our servers
              immediately after printing for your security and privacy. We never
              store your files permanently.
            </p>
          </div>
        </div>
      </div>

      {/* Upload options */}
      <div className="flex flex-col gap-4 px-5 mt-2 mb-6">
        <button
          className={`flex items-center w-full border rounded-2xl bg-white px-5 py-4 shadow-sm transition focus:outline-none ${
            selected === "device"
              ? "border-blue-500 ring-2 ring-blue-200"
              : "border-gray-300 hover:border-blue-400"
          }`}
          onClick={() => handleCardClick("device")}
          type="button"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 mr-5">
            <Upload size={26} className="text-blue-500" />
          </span>
          <div className="flex flex-col items-start">
            <span className="font-semibold text-base text-black">
              Upload from Device
            </span>
            <span className="text-gray-400 text-sm mt-0.5 text-left">
              Select a document directly from your phone or tablet.
            </span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_FORMATS}
            className="hidden"
            onChange={handleFileChange}
            tabIndex={-1}
          />
        </button>
        <button
          className={`flex items-center w-full border rounded-2xl bg-white px-5 py-4 shadow-sm transition focus:outline-none ${
            selected === "google"
              ? "border-blue-500 ring-2 ring-blue-200"
              : "border-gray-300 hover:border-blue-400"
          }`}
          onClick={() => handleCardClick("google")}
          type="button"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 mr-5">
            <FileStack size={26} className="text-blue-500" />
          </span>
          <div className="flex flex-col items-start">
            <span className="font-semibold text-base text-black">
              Import from Google Drive
            </span>
            <span className="text-gray-400 text-sm mt-0.5 text-left">
              Access your documents stored in Google Drive
            </span>
          </div>
        </button>
      </div>

      {/* Processing indicator */}
      {isProcessing && (
        <div className="flex items-center justify-center bg-blue-50 border border-blue-200 w-[90%] max-w-md mx-auto rounded-xl px-4 py-3 mb-4">
          <Loader2 size={20} className="animate-spin text-blue-600 mr-3" />
          <span className="text-blue-800 font-medium">Analyzing document...</span>
        </div>
      )}

      {/* Uploaded file display */}
      {selected === "device" && uploadedFile && !isProcessing && (
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 w-[90%] max-w-md mx-auto rounded-xl px-4 py-3 mb-4 text-black">
          <div>
            <span className="block font-medium text-sm mb-1 text-gray-500">
              Your uploaded file
            </span>
            <span className="text-base font-semibold">{uploadedFile.name}</span>
            <span className="block text-xs text-gray-400 mt-0.5">
              {numPages} page{numPages !== 1 ? "s" : ""} •{" "}
              {getFileTypeDisplayName(uploadedFile)}
            </span>
          </div>
          <button
            type="button"
            onClick={handleDeleteFile}
            className="ml-4 text-red-500 hover:text-red-700 transition-colors rounded-full p-2"
            aria-label="Delete file"
          >
            <Trash size={22} />
          </button>
        </div>
      )}

      {/* Bottom button */}
      <div className="fixed bottom-5 left-0 w-full flex justify-center pointer-events-none z-10">
        <Button
          className="w-[90%] max-w-md mx-auto h-12 rounded-full bg-blue-600 text-white font-medium text-lg pointer-events-auto shadow-lg"
          onClick={handleContinue}
          disabled={!selected || (selected === "device" && (!uploadedFile || isProcessing))}
        >
          {isProcessing ? "Processing..." : "Continue"}
        </Button>
      </div>
    </div>
  );
};

export default UploadDocumentPage;
