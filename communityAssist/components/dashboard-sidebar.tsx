"use client";

import { Button } from "@/components/ui/button";
import { WeatherStatsModal } from "@/components/weather-stats-modal";
import { motion } from "framer-motion";
import { AlertTriangle, BarChart, Droplets, Flame, Home, MapPin, Shield, Thermometer, Wind } from 'lucide-react';
import { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader
} from "@/components/ui/sidebar";
import { WeatherAnimation, type WeatherType } from "./weather-animations";

interface DashboardSidebarProps {
  currentWeather?: WeatherType;
}

export function DashboardSidebar({ currentWeather = "sunny" }: DashboardSidebarProps) {
  const [zipcode, setZipcode] = useState("10037"); // Default to NYC zipcode
  const [dashboardData, setDashboardData] = useState({
    avgPropertyValue: 450000,
    avgInsurance: 1200,
    crimeRate: "3.2%",
    temperature:
      currentWeather === "snowy"
        ? 28
        : currentWeather === "rainy"
          ? 58
          : currentWeather === "cloudy"
            ? 65
            : currentWeather === "windy"
              ? 62
              : 75,
    humidity: currentWeather === "rainy" ? 85 : currentWeather === "snowy" ? 70 : currentWeather === "cloudy" ? 60 : 45,
    windSpeed: currentWeather === "windy" ? 18 : currentWeather === "rainy" ? 12 : currentWeather === "snowy" ? 10 : 5,
    climateRisk: {
      flood: currentWeather === "rainy" ? "High" : "Low",
      wildfire: currentWeather === "sunny" ? "Moderate" : "Low",
      airQuality: currentWeather === "windy" ? "Moderate" : "Good",
    },
    nearbyAmenities: [{ name: "Trader Joe's" }, { name: "Whole Foods" }, { name: "Orange Theory" }, { name: "Macy's" }],
  });

  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [weatherStats, setWeatherStats] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchWeatherStats = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/weather/${zipcode}`);
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch weather data');
      }

      if (data.error) {
        throw new Error(data.error);
      }

      // Check if data is an array and has at least one item
      if (!Array.isArray(data) || data.length === 0) {
        throw new Error('No weather data available');
      }

      setWeatherStats(data[0]);
      setIsStatsModalOpen(true);
    } catch (error) {
      console.error('Failed to fetch weather stats:', error);
      // You might want to show this error to the user through a toast notification
    } finally {
      setIsLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between">
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Weather Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="grid grid-cols-1 gap-4">
              {/* Current Weather Card */}
              <motion.div 
                variants={cardVariants} 
                initial="hidden" 
                animate="visible" 
                custom={0}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="overflow-hidden backdrop-blur-md bg-white/30 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="p-3 flex flex-row items-center justify-between">
                    <CardTitle className="text-sm flex items-center gap-2 text-black">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Thermometer className="h-4 w-4" />
                      </motion.div>
                      Current Weather
                    </CardTitle>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Button
                        size="sm"
                        variant="ghost"
                        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                        onClick={fetchWeatherStats}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <motion.div 
                            animate={{ rotate: 360 }} 
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          >
                            <BarChart className="h-4 w-4" />
                          </motion.div>
                        ) : (
                          <BarChart className="h-4 w-4" />
                        )}
                      </Button>
                    </motion.div>
                  </CardHeader>
                  <CardContent className="p-3 relative h-32">
                    <WeatherAnimation type={currentWeather} className="absolute inset-0" />
                    <div className="relative z-10 flex flex-col justify-between h-full">
                      <div className="flex items-start justify-between">
                        <div>
                          <motion.p 
                            className="text-4xl font-bold text-black"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 200 }}
                          >
                            {dashboardData.temperature}°F
                          </motion.p>
                          <motion.p 
                            className="text-sm text-black/80 capitalize mt-1"
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                          >
                            {currentWeather}
                          </motion.p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <motion.div 
                            className="flex items-center gap-2 text-sm text-black/80"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            <Droplets className="h-4 w-4" />
                            <span>{dashboardData.humidity}%</span>
                          </motion.div>
                          <motion.div 
                            className="flex items-center gap-2 text-sm text-black/80"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                          >
                            <Wind className="h-4 w-4" />
                            <span>{dashboardData.windSpeed} mph</span>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Section 1: Avg Property Value */}
              <motion.div 
                variants={cardVariants} 
                initial="hidden" 
                animate="visible" 
                custom={1}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="backdrop-blur-md bg-white/30 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm flex items-center gap-2 text-black">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <Home className="h-4 w-4" />
                      </motion.div>
                      Avg Property Value
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="h-8 w-8 flex items-center justify-center rounded-full bg-black/10"
                      >
                        <Home className="h-5 w-5 text-black" />
                      </motion.div>
                      <div className="text-right">
                        <motion.p 
                          className="text-xs text-black/80"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          Current Estimate
                        </motion.p>
                        <motion.p 
                          className="text-2xl font-bold text-black"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          ${dashboardData.avgPropertyValue.toLocaleString()}
                        </motion.p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Section 2: Avg Insurance */}
              <motion.div 
                variants={cardVariants} 
                initial="hidden" 
                animate="visible" 
                custom={2}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="backdrop-blur-md bg-white/30 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm flex items-center gap-2 text-black">
                      <motion.div
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ type: "spring", stiffness: 200 }}
                      >
                        <Shield className="h-4 w-4" />
                      </motion.div>
                      Avg Insurance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="h-8 w-8 flex items-center justify-center rounded-full bg-black/10"
                      >
                        <Shield className="h-5 w-5 text-black" />
                      </motion.div>
                      <div className="text-right">
                        <motion.p 
                          className="text-xs text-black/80"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          Annual Premium
                        </motion.p>
                        <motion.p 
                          className="text-2xl font-bold text-black"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          ${dashboardData.avgInsurance}
                        </motion.p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Risk Assessment</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="grid grid-cols-1 gap-4">
              {/* Section 3: Crime Rate */}
              <motion.div 
                variants={cardVariants} 
                initial="hidden" 
                animate="visible" 
                custom={3}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="backdrop-blur-md bg-white/30 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm flex items-center gap-2 text-black">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <AlertTriangle className="h-4 w-4" />
                      </motion.div>
                      Crime Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="flex items-center justify-between">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="h-8 w-8 flex items-center justify-center rounded-full bg-red-500/20"
                      >
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                      </motion.div>
                      <div className="text-right">
                        <motion.p 
                          className="text-xs text-black/80"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                        >
                          Annual Rate
                        </motion.p>
                        <motion.p 
                          className="text-2xl font-bold text-black"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ type: "spring", stiffness: 200 }}
                        >
                          {dashboardData.crimeRate}
                        </motion.p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Section 4: Climate Risk */}
              <motion.div 
                variants={cardVariants} 
                initial="hidden" 
                animate="visible" 
                custom={4}
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="backdrop-blur-md bg-white/30 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardHeader className="p-3">
                    <CardTitle className="text-sm flex items-center gap-2 text-black">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Wind className="h-4 w-4" />
                      </motion.div>
                      Climate Risk
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <div className="space-y-2">
                      <motion.div 
                        className="flex justify-between items-center"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex items-center gap-2">
                          <motion.div
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            <Droplets className="h-4 w-4 text-blue-600" />
                          </motion.div>
                          <span className="text-xs text-black/80">Flood</span>
                        </div>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="text-xs font-medium px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-800"
                        >
                          {dashboardData.climateRisk.flood}
                        </motion.span>
                      </motion.div>
                      <motion.div 
                        className="flex justify-between items-center"
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <div className="flex items-center gap-2">
                          <motion.div
                            animate={{ y: [0, -2, 0] }}
                            transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                          >
                            <Flame className="h-4 w-4 text-orange-600" />
                          </motion.div>
                          <span className="text-xs text-black/80">Fire</span>
                        </div>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="text-xs font-medium px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-800"
                        >
                          {dashboardData.climateRisk.wildfire}
                        </motion.span>
                      </motion.div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Local Area</SidebarGroupLabel>
          <SidebarGroupContent>
            {/* Section 5: Nearby Amenities */}
            <motion.div 
              variants={cardVariants} 
              initial="hidden" 
              animate="visible" 
              custom={5}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Card className="backdrop-blur-md bg-white/30 border border-white/20 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="p-3">
                  <CardTitle className="text-sm flex items-center gap-2 text-black">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    >
                      <MapPin className="h-4 w-4" />
                    </motion.div>
                    Nearby Amenities
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 space-y-2">
                  {dashboardData.nearbyAmenities.map((amenity, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center justify-between text-xs text-black/80"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-black" />
                        <span>{amenity.name}</span>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <WeatherStatsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
        data={weatherStats}
      />
    </Sidebar>
  );
}
