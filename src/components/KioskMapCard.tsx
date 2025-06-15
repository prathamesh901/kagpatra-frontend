
import React from "react";
import { Button } from "@/components/ui/button";

interface KioskMapCardProps {
  onNavigate?: () => void;
}

// Static map image placeholder for reference styling.
// In a real app, you would use a real map. Here, we use a neutral background.
const KioskMapCard: React.FC<KioskMapCardProps> = ({ onNavigate }) => (
  <div className="rounded-2xl border border-gray-200 bg-white flex flex-col items-center shadow-sm overflow-hidden">
    <div className="w-full h-48 bg-gray-100 overflow-hidden rounded-t-[16px]">
      {/* Cropped Map Image */}
      <img
        src="/lovable-uploads/b88d8866-61c1-4f70-9ed5-8144360dcf40.png"
        alt="Map preview"
        className="object-cover w-full"
        style={{
          height: 'calc(100% + 50px)', // Increase image height to pull up extra part
          marginBottom: '-50px'        // Crop ~50px from the bottom
        }}
      />
    </div>
    <div className="w-full px-4 py-4">
      <Button
        className="w-full bg-blue-600 text-white font-semibold text-base shadow-none hover:bg-blue-700 transition"
        onClick={onNavigate}
        type="button"
      >
        Navigate with Maps
      </Button>
    </div>
  </div>
);

export default KioskMapCard;
