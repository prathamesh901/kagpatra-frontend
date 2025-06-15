
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ActionCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}
const ActionCard = ({ icon, title, description, onClick, className }: ActionCardProps) => (
  <button
    className={cn(
      "flex flex-col items-start w-full h-full rounded-2xl bg-white border border-gray-200 shadow-sm px-4 py-5 transition hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/30",
      className
    )}
    onClick={onClick}
    type="button"
  >
    <div className="text-blue-500 mb-3">{icon}</div>
    <div className="font-semibold text-lg text-black mb-0.5">{title}</div>
    <div className="text-gray-400 text-sm leading-relaxed text-left">{description}</div>
  </button>
);

export default ActionCard;

