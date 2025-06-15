
import { FileText } from "lucide-react";

interface PrintJob {
  filename: string;
  datetime: string;
  status: "Completed" | "Pending";
  receiptUrl?: string;
}

const PrintJobCard = ({ job }: { job: PrintJob }) => (
  <div className="flex items-center bg-white border border-gray-200 rounded-2xl px-4 py-4 mb-4 shadow-sm">
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
          job.status === "Completed"
            ? "bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-0.5"
            : "bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full mb-0.5"
        }
      >
        {job.status}
      </span>
      <a
        href={job.receiptUrl || "#"}
        className="text-blue-500 bg-blue-50 hover:bg-blue-100 transition px-3 py-1 rounded-full text-xs font-medium inline-block"
      >
        View Receipt
      </a>
    </div>
  </div>
);

export default PrintJobCard;

