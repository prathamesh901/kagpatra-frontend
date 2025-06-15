
import { Edit } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import PrintJobCard from "@/components/PrintJobCard";
import TabBar from "@/components/TabBar";

// Match status types as required
type PrintJob = {
  filename: string;
  datetime: string;
  status: "Completed" | "Pending";
  receiptUrl?: string;
};

const user = {
  name: "Jane Doe",
  email: "janedoe@example.com",
  avatar:
    "https://randomuser.me/api/portraits/women/44.jpg"
};

// Explicitly annotate as PrintJob[]
const printJobs: PrintJob[] = [
  {
    filename: "Project Proposal.pdf",
    datetime: "2025-06-15 10:30 AM",
    status: "Completed",
    receiptUrl: "#"
  },
  {
    filename: "Project Proposal.pdf",
    datetime: "2025-06-15 10:30 AM",
    status: "Completed",
    receiptUrl: "#"
  },
  {
    filename: "Project Proposal.pdf",
    datetime: "2025-06-15 10:30 AM",
    status: "Completed",
    receiptUrl: "#"
  },
  {
    filename: "Project Proposal.pdf",
    datetime: "2025-06-15 10:30 AM",
    status: "Completed",
    receiptUrl: "#"
  }
];

const ProfilePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white pt-8 pb-2">
      <main className="flex-1 w-full max-w-md mx-auto px-4">
        {/* Title */}
        <h1 className="font-bold text-3xl text-black mb-5">My Profile</h1>
        {/* Profile card */}
        <div className="flex items-center rounded-2xl border border-gray-200 bg-white shadow-sm px-5 py-4 mb-7">
          <Avatar className="w-14 h-14 mr-4 shrink-0">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="text-lg font-semibold text-black leading-tight">{user.name}</div>
            <div className="text-gray-400 text-base font-normal truncate">{user.email}</div>
          </div>
          <button className="ml-2 p-1 rounded-md hover:bg-gray-100 transition" aria-label="Edit profile">
            <Edit size={28} className="text-gray-400" />
          </button>
        </div>
        {/* Print History header */}
        <h2 className="font-semibold text-xl text-black mb-4 mt-2">Print History</h2>
        {/* Print job cards */}
        <div className="flex flex-col gap-4 pb-8">
          {printJobs.map((job, idx) => (
            <PrintJobCard key={idx} job={job} variant="profile" />
          ))}
        </div>
      </main>
      <div className="fixed bottom-0 left-0 w-full">
        <TabBar selected={2} />
      </div>
    </div>
  );
};

export default ProfilePage;
