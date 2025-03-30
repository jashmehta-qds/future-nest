"use client";

import { MainContent } from "@/components/chatComponent";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { LandingPage } from "@/components/landing-page";
import { RightSidebar } from "@/components/right-sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getBackgroundGradientForWeather, WeatherType } from "@/components/weather-animations";
import { AnimatePresence, motion } from "framer-motion";
import { MapPin, Menu, Search } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [userLocation, setUserLocation] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [newsFeed, setNewsFeed] = useState<{ title: string; url: string; date: string }[]>([]);
  const [isDashboardVisible, setIsDashboardVisible] = useState(false)
  const [currentWeather, setCurrentWeather] = useState<WeatherType>("sunny")
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "day" | "evening" | "night">("day")
  const backgroundGradient = getBackgroundGradientForWeather(currentWeather, timeOfDay)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handlePinCodeSubmit = async () => {
    if (!userLocation.trim()) return;

    setIsLoading(true);

    try {
      // Randomly select a weather type for demo purposes
      const weatherTypes: WeatherType[] = ["sunny", "cloudy", "rainy", "windy", "snowy"]
      const randomWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)]
      setCurrentWeather(randomWeather)

      // Show dashboard after successful API call
      setIsDashboardVisible(true)
      // const response = await fetch("/api/news", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ pinCode: userLocation }),
      // });
    
      // const data = await response.json();
      setNewsFeed([]); // Update the news feed with the AI response
    } catch (error) {
       
      console.error("Error fetching news:", error);
      setNewsFeed([])
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${backgroundGradient} transition-colors duration-1000`}>
    <AnimatePresence mode="wait">
      {!isDashboardVisible ? (
        <motion.div key="landing" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
          <LandingPage
            userLocation={userLocation}
            setUserLocation={setUserLocation}
            handlePinCodeSubmit={handlePinCodeSubmit}
            isLoading={isLoading}
          />
        </motion.div>
      ) : (
        <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
          <SidebarProvider defaultOpen={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <div className="flex h-screen w-full overflow-hidden">
              {/* Left Sidebar */}
              <DashboardSidebar currentWeather={currentWeather} />

              {/* Main Content and Right Sidebar */}
              <div className="flex flex-1 flex-col h-full">
                {/* Header Section */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center p-6 border-b backdrop-blur-md bg-white/30 border-white/20 shadow-lg"
                >
                  <div className="w-full flex items-center justify-between mb-4">
                    <h2 className="text-3xl font-bold text-black">Weather & Community Insights</h2>
                    {!isSidebarOpen && (
                      <motion.button
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 rounded-full bg-white/30 backdrop-blur-md border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <Menu className="h-6 w-6 text-black" />
                      </motion.button>
                    )}
                  </div>
                  <p className="mb-4 text-black/80">
                    Current Location: <span className="font-semibold">{userLocation}</span>
                  </p>
                  <div className="flex gap-2 w-full max-w-md relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <Input
                      type="text"
                      placeholder="Change Location or Pin Code"
                      value={userLocation}
                      onChange={(e) => setUserLocation(e.target.value)}
                      className="pl-10 bg-white/50 border-white/30 focus-visible:ring-primary/50 w-full text-black"
                    />
                    <Button
                      onClick={handlePinCodeSubmit}
                      className="bg-primary hover:bg-primary/90"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full mr-2"></div>
                      ) : (
                        <Search className="h-4 w-4 mr-2" />
                      )}
                      Update
                    </Button>
                  </div>
                </motion.div>

                {/* Main Content and Right Sidebar */}
                <div className="flex flex-1 flex-row h-full">
                  {/* Main Content */}
                  <div className="flex-1 overflow-hidden backdrop-blur-md bg-white/30 border border-white/20 shadow-lg rounded-lg m-4">
                    <MainContent />
                  </div>

                  {/* Right Sidebar contains news feed */}
                  <div className="w-80 overflow-hidden backdrop-blur-md bg-white/30 border border-white/20 shadow-lg">
                    <RightSidebar newsFeed={newsFeed} />
                  </div>
                </div>
              </div>
            </div>
          </SidebarProvider>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
  );
}

function setIsLoading(arg0: boolean) {
  throw new Error("Function not implemented.");
}
