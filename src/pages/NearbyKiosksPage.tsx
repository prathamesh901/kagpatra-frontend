
import React, { useState } from "react";
import { Map, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import TabBar from "@/components/TabBar";

// Dummy data for list view
const kiosks = [
  { name: "Uni Print Kiosk", address: "Main Hall, University", distance: "0.2 km" },
  { name: "Campus West Print", address: "West Building Entry", distance: "0.6 km" },
  { name: "Library Print Spot", address: "Ground Floor, Library", distance: "0.8 km" },
];

const NearbyKiosksPage = () => {
  const [view, setView] = useState<"map" | "list">("map");

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header and Toggle */}
      <div className="flex flex-col items-center w-full pt-7 px-4 pb-4">
        <div className="flex items-center w-full mb-2">
          <h1 className="text-xl font-bold flex-1 text-center text-black" style={{ letterSpacing: -0.5 }}>
            Find Nearby Kiosks
          </h1>
        </div>
        {/* Toggle */}
        <div className="flex justify-center w-full">
          <div className="bg-gray-100 rounded-full flex space-x-1 p-1 shadow-sm w-52">
            <Button
              type="button"
              variant={view === "map" ? "default" : "ghost"}
              className={`flex-1 rounded-full px-3 py-1 font-semibold text-base transition ${view === "map" ? "bg-blue-600 text-white shadow" : "text-gray-400"} `}
              onClick={() => setView("map")}
            >
              <Map size={18} className="mr-2" />
              Map View
            </Button>
            <Button
              type="button"
              variant={view === "list" ? "default" : "ghost"}
              className={`flex-1 rounded-full px-3 py-1 font-semibold text-base transition ${view === "list" ? "bg-blue-600 text-white shadow" : "text-gray-400"}`}
              onClick={() => setView("list")}
            >
              <List size={18} className="mr-2" />
              List View
            </Button>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 w-full max-w-md mx-auto px-4 pb-7">
        {view === "map" ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-4 py-6 flex flex-col items-center justify-center shadow-sm min-h-[320px]">
            <div className="w-full h-48 bg-blue-50 border border-blue-100 rounded-xl flex items-center justify-center text-blue-400">
              {/* Placeholder for map */}
              <Map size={56} strokeWidth={1.7} className="mb-2" />
            </div>
            <div className="mt-4 text-gray-500 text-center">
              Map view coming soon! Here you'll see kiosks on a map.
            </div>
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm divide-y divide-gray-100">
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
