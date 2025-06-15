
import { FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Add optional 'variant' prop
interface PrintJob {
  filename: string;
  datetime: string;
  status: "Completed" | "Pending";
  receiptUrl?: string;
  totalPaid?: number;
  printTime?: string;
}
interface PrintJobCardProps {
  job: PrintJob;
  variant?: "profile";
}

const PrintJobCard = ({ job, variant }: PrintJobCardProps) => {
  const navigate = useNavigate();

  const handleViewReceipt = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate("/view-receipt", {
      state: {
        filename: job.filename,
        datetime: job.datetime,
        status: job.status,
        totalPaid: job.totalPaid || 35.0,
        printTime: job.printTime || "2 min",
      }
    });
  };

  return (
    <div
      className={
        variant === "profile"
          ? "flex items-center bg-white border border-gray-200 rounded-2xl px-4 py-4 shadow-sm"
          : "flex items-center bg-white border border-gray-200 rounded-2xl px-4 py-4 mb-4 shadow-sm"
      }
      style={variant === "profile" ? { borderColor: "#ECECEC", marginBottom: 0 } : undefined}
    >
      <div className="text-blue-500 mr-3">
        <FileText size={28} strokeWidth={2.3} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium truncate text-base text-black">{job.filename}</div>
        <div className="text-xs text-gray-400">{job.datetime}</div>
      </div>
      <div className="flex flex-col items-end ml-2 space-y-1 min-w-[110px]">
        <span
          className={
            variant === "profile"
              ? "bg-green-100/70 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-0.5"
              : job.status === "Completed"
              ? "bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-0.5"
              : "bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full mb-0.5"
          }
        >
          {job.status}
        </span>
        <button
          type="button"
          onClick={handleViewReceipt}
          className={
            variant === "profile"
              ? "text-blue-500 bg-blue-50/60 hover:bg-blue-100 transition px-3 py-1 rounded-full text-xs font-medium inline-block"
              : "text-blue-500 bg-blue-50 hover:bg-blue-100 transition px-3 py-1 rounded-full text-xs font-medium inline-block"
          }
        >
          View Receipt
        </button>
      </div>
    </div>
  );
};

export default PrintJobCard;
