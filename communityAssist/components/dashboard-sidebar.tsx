// dashboard sidebar left side
"use client";

import React, { useState } from "react";
import { Calendar, Home, Shield, Droplets, Wind, Flame, MapPin, AlertTriangle } from "lucide-react";

import { Sidebar, SidebarContent, SidebarHeader, SidebarTrigger } from "@/components/ui/sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DashboardSidebar() {
  const [userLocation, setUserLocation] = useState<string>(""); // State for user input location
  const [isLoading, setIsLoading] = useState(false);
  const [newsFeed, setNewsFeed] = useState<{ title: string; url: string; date: string }[]>([]);

  const [dashboardData, setDashboardData] = useState({
    avgPropertyValue: 0.0,
    avgInsurance: 0.0,
    crimeRate: "0%",
    climateRisk: {
      flood: "Low",
      wildfire: "Moderate",
      airQuality: "Good",
    },
    nearbyAmenities: [
      { name: "Trader Joe's" },
      { name: "Whole Foods"},
      { name: "Orange Theory"},
      { name: "Macy's"},
    ],
    newsFeed: [],
    housingInsurance: 0.0,
    climateRiskAnalysis: "",
  });



  



  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between">
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <div className="grid grid-cols-1 gap-4 p-2">
          {/* Section 1: Avg Property Value */}
          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-sm">Avg Property Value</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <Home className="h-8 w-8 text-primary" />
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Current Estimate</p>
                  <p className="text-2xl font-bold">
                    ${dashboardData.avgPropertyValue.toLocaleString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2: Avg Insurance */}
          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-sm">Avg Insurance</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <Shield className="h-8 w-8 text-primary" />
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Annual Premium</p>
                  <p className="text-2xl font-bold">${dashboardData.avgInsurance}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3: Crime Rate */}
          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-sm">Crime Rate</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="flex items-center justify-between">
                <AlertTriangle className="h-8 w-8 text-red-500" />
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Annual Rate</p>
                  <p className="text-2xl font-bold">{dashboardData.crimeRate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4: Climate Risk */}
          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-sm">Climate Risk</CardTitle>
            </CardHeader>
            <CardContent className="p-3">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span className="text-xs">Flood</span>
                  </div>
                  <span className="text-xs font-medium">{dashboardData.climateRisk.flood}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-amber-500" />
                    <span className="text-xs">Wildfire</span>
                  </div>
                  <span className="text-xs font-medium">{dashboardData.climateRisk.wildfire}</span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-green-500" />
                    <span className="text-xs">Air Quality</span>
                  </div>
                  <span className="text-xs font-medium">{dashboardData.climateRisk.airQuality}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 5: Nearby Amenities */}
          <Card>
            <CardHeader className="p-3">
              <CardTitle className="text-sm">Nearby Amenities</CardTitle>
            </CardHeader>
            <CardContent className="p-3 space-y-2">
              {dashboardData.nearbyAmenities.map((amenity, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>{amenity.name}</span>
                  </div>
          
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}