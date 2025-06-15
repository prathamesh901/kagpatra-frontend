
import { Printer, DollarSign } from "lucide-react";
import ActionCard from "@/components/ActionCard";
import PrintJobCard from "@/components/PrintJobCard";
import TabBar from "@/components/TabBar";
import { useNavigate } from "react-router-dom";

const mockPrintJobs = [
  {
    filename: "Project Proposal.pdf",
    datetime: "2025-06-15 10:30 AM",
    status: "Completed" as const,
    receiptUrl: "#",
  },
  {
    filename: "Project Proposal.pdf",
    datetime: "2025-06-15 10:30 AM",
    status: "Completed" as const,
    receiptUrl: "#",
  },
];

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-5 pb-[64px] sm:pb-0">
      {/* Main content container */}
      <main className="flex-1 w-full max-w-md mx-auto px-3">
        {/* Greeting */}
        <div className="flex items-center gap-3 mt-1 mb-1.5">
          <div className="inline-flex items-center justify-center rounded-full bg-blue-50 p-2">
            <svg width={32} height={32} viewBox="0 0 32 32" fill="none">
              <circle cx={16} cy={16} r={14} stroke="#4581F4" strokeWidth={2} fill="#EDF2FE" />
              <path d="M9 20c2.5-3.5 12-8.5 10.5 2" stroke="#4581F4" strokeWidth={2} strokeLinecap="round" />
            </svg>
          </div>
          <h1 className="font-extrabold text-3xl text-black tracking-tight">Hi, Prathamesh!</h1>
        </div>
        <p className="text-gray-400 font-normal text-base mb-4">
          Welcome back to Kagpatra. Ready to print?
        </p>
        {/* Start Printing Card */}
        <div className="rounded-2xl border border-gray-200 bg-white px-5 py-7 flex flex-col items-center justify-center mb-6 shadow-sm">
          <div className="flex justify-center items-center mb-2">
            <svg width={36} height={36} viewBox="0 0 36 36" fill="none">
              <rect x={7} y={7} width={22} height={22} rx={4} stroke="#4581F4" strokeWidth={2} strokeDasharray="3 3" />
              <rect x={16} y={16} width={4} height={4} rx={1} fill="#4581F4" />
            </svg>
          </div>
          <div className="mb-1 font-semibold text-lg text-black">Start Printing</div>
          <div className="text-gray-400 text-base font-normal">Scan kiosk QR to begin</div>
        </div>
        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3 mb-7">
          <ActionCard
            icon={<DollarSign size={28} strokeWidth={2.3} />}
            title="Estimate Cost"
            description="Get an estimate for your print job."
            onClick={() => navigate("/estimate")}
          />
          <ActionCard
            icon={<Printer size={27} strokeWidth={2.3} />}
            title="Find Nearby Kiosk"
            description="Locate available printing kiosks."
          />
        </div>
        {/* Recent Print Jobs */}
        <div>
          <div className="font-bold text-lg text-black mb-3">Recent Print Jobs</div>
          <div>
            {mockPrintJobs.map((job, idx) => (
              <PrintJobCard key={idx} job={job} />
            ))}
          </div>
        </div>
      </main>
      {/* Bottom Tab Bar */}
      <TabBar selected={0} />
    </div>
  );
};

export default Index;
