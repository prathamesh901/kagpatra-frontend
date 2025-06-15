
import { useRef, useState } from "react";
import { ChevronLeft, Upload, FileStack, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import * as pdfjsLib from "pdfjs-dist";

// PDF.js worker setup (try CDN, then fallback to local)
const setupPdfWorker = () => {
  const CDN = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  const LOCAL = '/pdf.worker.js';

  // Try to use CDN worker first
  try {
    pdfjsLib.GlobalWorkerOptions.workerSrc = CDN;
    // We'll verify the worker loads later via parsing
  } catch (e) {
    // If it fails (rare), try local fallback
    try {
      pdfjsLib.GlobalWorkerOptions.workerSrc = LOCAL;
      // Could add a fetch to test LOCAL, but PDF.js will error if it fails
    } catch (err) {
      // Silent: pdf parsing will fail and show error toast
    }
  }
};
setupPdfWorker();

type UploadOption = "device" | "google" | null;

const ACCEPTED_FORMATS = ".pdf,.doc,.docx,.txt,.jpg,.png";

const UploadDocumentPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<UploadOption>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [loadingPages, setLoadingPages] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper: robust PDF file detection
  const isPdf = (file: File) => {
    return (
      file.type === "application/pdf" ||
      file.name.toLowerCase().endsWith(".pdf")
    );
  };

  // Parse PDF to get page count with enhanced error logging
  async function getPdfPageCount(file: File): Promise<number | null> {
    const buffer = await file.arrayBuffer();
    try {
      const pdf = await pdfjsLib.getDocument({ data: buffer }).promise;
      return pdf.numPages;
    } catch (e: any) {
      // Log error for debugging
      console.error("PDF.js failed to parse PDF:", e?.message ?? e);
      setPdfError("Could not read PDF: " + (e?.message || "Unknown error"));
      return null;
    }
  }

  // Handle selection and trigger file picker for device
  const handleCardClick = (option: UploadOption) => {
    setSelected(option);
    setUploadedFile(null);
    setNumPages(null);
    setPdfError(null);
    if (option === "device" && fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
    // For Google, do nothing on click (show toast on Continue)
  };

  // On file selected
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadedFile(file);
    setNumPages(null);
    setPdfError(null);
    setLoadingPages(true);

    if (isPdf(file)) {
      // Try to count pdf pages
      const pages = await getPdfPageCount(file);
      setNumPages(pages ?? null);
      setLoadingPages(false);

      if (pages) {
        toast({
          title: "File selected",
          description: `Selected: ${file.name} (${pages} page${pages > 1 ? "s" : ""})`,
        });
      } else {
        toast({
          title: "Could not read PDF",
          description: "PDF parsing failed. Please try another file.",
          variant: "destructive",
        });
      }
    } else {
      // Default to 1 page for non-pdfs
      setNumPages(1);
      setLoadingPages(false);
      toast({
        title: "File selected",
        description: `Selected: ${file.name}`,
      });
    }
  };

  // Handler to remove file
  const handleDeleteFile = () => {
    setUploadedFile(null);
    setNumPages(null);
    setPdfError(null);
    toast({
      title: "Removed",
      description: "The uploaded file has been removed",
    });
  };

  // Handle Continue logic
  const handleContinue = () => {
    if (selected === "device") {
      if (uploadedFile && numPages != null && !pdfError) {
        // Send file info to SetPrintPreferencesPage
        navigate("/set-print-preferences", {
          state: {
            uploadedFileName: uploadedFile.name,
            numPages: numPages,
          },
        });
      } else if (pdfError) {
        toast({
          title: "PDF parsing error",
          description: pdfError,
          variant: "destructive",
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

  return (
    <div className="min-h-screen bg-white flex flex-col px-0 pt-4 pb-4 relative">
      {/* Header */}
      <div className="flex items-center mb-2 px-4">
        <button onClick={() => navigate(-1)} className="mr-2 p-1 rounded hover:bg-gray-100" aria-label="Back">
          <ChevronLeft size={28} className="text-black" />
        </button>
        <h1 className="text-xl font-bold text-black flex-1 text-center pr-8">
          Upload Your Document
        </h1>
      </div>
      {/* Subtext */}
      <p className="text-gray-400 text-base px-4 pb-0 text-center mb-2">
        Choose a source to upload your document for printing.
      </p>
      {/* File info above cards if available */}
      {(uploadedFile && (selected === "device")) && (
        <div className="w-full flex flex-col items-center mb-2">
          <span className="text-base font-semibold text-black">{uploadedFile.name}</span>
          <span className="text-xs text-gray-400">
            {loadingPages
              ? "Detecting pages..."
              : numPages != null
                ? `${numPages} page${numPages !== 1 ? "s" : ""}`
                : pdfError
                ? pdfError
                : null}
          </span>
        </div>
      )}

      {/* Error debug log output for devs (remove for prod) */}
      {pdfError && (
        <div className="text-xs text-red-500 text-center mb-2">
          <strong>PDF error:</strong> {pdfError}
        </div>
      )}

      {/* Upload options */}
      <div className="flex flex-col gap-4 px-5 mt-2 mb-6">
        {/* Upload from Device */}
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
            <span className="font-semibold text-base text-black">Upload from Device</span>
            <span className="text-gray-400 text-sm mt-0.5 text-left">
              Select a document directly from your phone or tablet.
            </span>
          </div>
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept={ACCEPTED_FORMATS}
            className="hidden"
            onChange={handleFileChange}
            tabIndex={-1}
          />
        </button>
        {/* Import from Google Drive */}
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
            <span className="font-semibold text-base text-black">Import from Google Drive</span>
            <span className="text-gray-400 text-sm mt-0.5 text-left">
              Access your documents stored in Google Drive
            </span>
          </div>
        </button>
      </div>
      {/* Uploaded file display (below cards, for delete option) */}
      {selected === "device" && uploadedFile && (
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 w-[90%] max-w-md mx-auto rounded-xl px-4 py-3 mb-4 text-black">
          <div>
            <span className="block font-medium text-sm mb-1 text-gray-500">Your uploaded file</span>
            <span className="text-base font-semibold">{uploadedFile.name}</span>
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
          disabled={!selected || (selected === "device" && (!uploadedFile || !numPages || !!pdfError))}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default UploadDocumentPage;

