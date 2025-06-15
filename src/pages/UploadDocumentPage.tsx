
import { useRef, useState } from "react";
import { ChevronLeft, Upload, FileStack } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

type UploadOption = "device" | "google" | null;

const UploadDocumentPage = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<UploadOption>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle selection and trigger file picker for device
  const handleCardClick = (option: UploadOption) => {
    setSelected(option);
    setUploadedFile(null); // Clear previous file
    if (option === "device" && fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
    // For Google, do nothing on click (show toast on Continue)
  };

  // On file selected
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFile(e.target.files[0]);
      toast({
        title: "File selected",
        description: `Selected: ${e.target.files[0].name}`
      });
    }
  };

  // Handle Continue logic
  const handleContinue = () => {
    if (selected === "device") {
      if (uploadedFile) {
        toast({
          title: "Success!",
          description: `File "${uploadedFile.name}" is ready for printing.`,
        });
        // Navigate or process as needed (placeholder: remain on page)
      } else {
        toast({
          title: "No file selected",
          description: "Please select a document from your device first.",
          variant: "destructive"
        });
      }
    } else if (selected === "google") {
      toast({
        title: "Google Drive integration coming soon!",
        description: "This feature isn't available yet.",
        variant: "default"
      });
      // Placeholder for Google Drive logic.
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
      <p className="text-gray-400 text-base px-4 pb-0 text-center mb-5">
        Choose a source to upload your document for printing.
      </p>

      {/* Upload options */}
      <div className="flex flex-col gap-4 px-5 mt-2 mb-10">
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
              {uploadedFile && selected === "device" && (
                <span className="ml-1 text-blue-500 font-medium">
                  {uploadedFile.name}
                </span>
              )}
            </span>
          </div>
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.txt,.jpg,.png"
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
      {/* Bottom button */}
      <div className="fixed bottom-5 left-0 w-full flex justify-center pointer-events-none z-10">
        <Button
          className="w-[90%] max-w-md mx-auto h-12 rounded-full bg-blue-600 text-white font-medium text-lg pointer-events-auto shadow-lg"
          onClick={handleContinue}
          disabled={!selected}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};
export default UploadDocumentPage;
