
import React, { useState } from "react";
import { Map, List, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import TabBar from "@/components/TabBar";
import KioskMapCard from "@/components/KioskMapCard";

// Dummy data for list view
const kiosks = [
  { name: "Uni Print Kiosk", address: "Main Hall, University", distance: "0.2 km" },
  { name: "Campus West Print", address: "West Building Entry", distance: "0.6 km" },
  { name: "Library Print Spot", address: "Ground Floor, Library", distance: "0.8 km" },
];

const NearbyKiosksPage = () => {
  const [view, setView] = useState<"map" | "list">("map");
  const navigate = useNavigate();

  const handleNavigateWithMaps = () => {
    // Implement navigation logic here, e.g., open Google Maps with kiosk coordinates
    window.open("https://www.google.com/maps", "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="relative flex flex-col items-center w-full pt-6 px-3 pb-3">
        <div className="flex items-center w-full mb-0.5">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="absolute left-2 flex items-center p-1 rounded-full hover:bg-gray-100 transition"
            aria-label="Go back"
          >
            <ChevronLeft size={26} className="text-gray-600" />
          </button>
          <h1 className="flex-1 text-xl font-bold text-center text-black" style={{ letterSpacing: -0.5 }}>
            Find Nearby Kiosks
          </h1>
        </div>
        {/* Toggle */}
        <div className="flex justify-center w-full mt-3">
          <div className="bg-gray-100 rounded-full flex flex-row p-1 gap-2 shadow w-fit mx-auto">
            <Button
              type="button"
              variant={view === "map" ? "default" : "ghost"}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 font-semibold text-base transition ${
                view === "map" ? "bg-blue-600 text-white shadow" : "text-gray-400 bg-transparent"
              }`}
              onClick={() => setView("map")}
            >
              <Map size={20} className="mr-1" />
              Map View
            </Button>
            <Button
              type="button"
              variant={view === "list" ? "default" : "ghost"}
              className={`flex items-center gap-2 rounded-full px-4 py-1.5 font-semibold text-base transition ${
                view === "list" ? "bg-blue-600 text-white shadow" : "text-gray-400 bg-transparent"
              }`}
              onClick={() => setView("list")}
            >
              <List size={20} className="mr-1" />
              List View
            </Button>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 w-full max-w-md mx-auto px-4 pb-7 pt-4">
        {view === "map" ? (
          <KioskMapCard onNavigate={handleNavigateWithMaps} />
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm divide-y divide-gray-100 mt-2">
            {kiosks.map((kiosk, idx) => (
              <div key={idx} className="px-5 py-4 flex flex-col">
                <span className="font-semibold text-base text-black mb-0.5">{kiosk.name}</span>
                <span className="text-gray-400 text-sm">{kiosk.address}</span>
                <span className="text-blue-500 text-xs font-medium">{kiosk.distance} away</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* TabBar */}
      <div className="fixed bottom-0 left-0 w-full">
        <TabBar selected={3} />
      </div>
    </div>
  );
};
export default NearbyKiosksPage;
