"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { MainContent } from "@/components/chatComponent";
import { RightSidebar } from "@/components/rightsidebar";
import { useState } from "react";

export default function Dashboard() {
  const [userLocation, setUserLocation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [newsFeed, setNewsFeed] = useState<{ title: string; url: string; date: string }[]>([]);
  

  const handlePinCodeSubmit = async () => {
    if (!userLocation.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pinCode: userLocation }),
      });
      console.log("Response:", response);
      if (!response.ok) {
        throw new Error("Failed to fetch news");
      }

      const data = await response.json();
      setNewsFeed(data.news); // Update the news feed with the AI response
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Left Sidebar */}
        <DashboardSidebar />

        {/* Main Content and Right Sidebar */}
        <div className="flex flex-1 flex-col h-full">
          {/* Header Section */}
          <div className="flex flex-col items-center justify-center p-4 border-b">
            <h2 className="text-2xl font-semibold mb-4">Community Assist</h2>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter Pin Code"
                value={userLocation}
                onChange={(e) => setUserLocation(e.target.value)}
                className="p-2 border rounded"
              />
              <button
                onClick={handlePinCodeSubmit}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Enter
              </button>
            </div>
          </div>

          {/* Main Content and Right Sidebar */}
          <div className="flex flex-1 flex-row h-full">
            {/* Main Content */}
            <MainContent />

            {/* Right Sidebar contains news feed */}
            <RightSidebar newsFeed={newsFeed} />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

function setIsLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
