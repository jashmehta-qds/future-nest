"use client"

import { useState } from "react"
import { Send, Home, Shield, Droplets, Wind, Flame } from "lucide-react"
import { SidebarProvider } from "@/components/ui/sidebar"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardSidebar } from "@/components/dashboard-sidebar"

interface ChatMessage {
  id: string
  content: string
  sender: "user" | "system"
  timestamp: Date
}

export default function Dashboard() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "system",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate system response
    setTimeout(() => {
      const systemMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your message. I'm processing your request.",
        sender: "system",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, systemMessage])
    }, 1000)
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full overflow-hidden">
        {/* Left side - Four sections */}
        <DashboardSidebar />

        {/* Right side - Split into two sections */}
        <div className="flex flex-1 flex-col h-full">
          {/* Top half - Three sections */}
          <div className="h-1/2 overflow-auto border-b">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
              {/* News Feeds Section */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>News Feeds</CardTitle>
                  <CardDescription>Latest updates and news</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ScrollArea className="h-[300px]">
                    <div className="space-y-4">
                      <div className="border-b pb-2">
                        <h3 className="font-medium">New Housing Policy Announced</h3>
                        <p className="text-sm text-muted-foreground">
                          Government announces new affordable housing initiative targeting first-time buyers.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                      </div>
                      <div className="border-b pb-2">
                        <h3 className="font-medium">Insurance Rates Expected to Rise</h3>
                        <p className="text-sm text-muted-foreground">
                          Analysts predict 5-8% increase in home insurance rates due to recent climate events.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                      </div>
                      <div className="border-b pb-2">
                        <h3 className="font-medium">Flood Warning System Upgraded</h3>
                        <p className="text-sm text-muted-foreground">
                          Local authorities implement new early warning system for flood-prone areas.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Yesterday</p>
                      </div>
                      <div className="border-b pb-2">
                        <h3 className="font-medium">Property Market Analysis</h3>
                        <p className="text-sm text-muted-foreground">
                          Housing prices stabilize after months of volatility, experts suggest good time to buy.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">2 days ago</p>
                      </div>
                      <div>
                        <h3 className="font-medium">Air Quality Improvement Initiative</h3>
                        <p className="text-sm text-muted-foreground">
                          City launches new program to reduce air pollution in residential areas.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">3 days ago</p>
                      </div>
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Housing & Insurance Details */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Housing & Insurance</CardTitle>
                  <CardDescription>Property and coverage details</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="housing">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="housing">Housing</TabsTrigger>
                      <TabsTrigger value="insurance">Insurance</TabsTrigger>
                    </TabsList>
                    <TabsContent value="housing" className="space-y-4 mt-4">
                      <div className="flex items-center gap-3 border-b pb-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Home className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Property Details</h3>
                          <p className="text-sm text-muted-foreground">123 Main Street, Anytown</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Property Type:</span>
                          <span className="font-medium">Single Family Home</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Year Built:</span>
                          <span className="font-medium">2005</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Square Footage:</span>
                          <span className="font-medium">2,450 sq ft</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Last Assessment:</span>
                          <span className="font-medium">$425,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Flood Zone:</span>
                          <span className="font-medium">Zone X (Low Risk)</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Wildfire Risk:</span>
                          <span className="font-medium">Moderate</span>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="insurance" className="space-y-4 mt-4">
                      <div className="flex items-center gap-3 border-b pb-3">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Shield className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium">Insurance Coverage</h3>
                          <p className="text-sm text-muted-foreground">Policy #HD-12345678</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Provider:</span>
                          <span className="font-medium">SafeGuard Insurance</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Coverage Type:</span>
                          <span className="font-medium">Comprehensive</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Dwelling Coverage:</span>
                          <span className="font-medium">$450,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Personal Property:</span>
                          <span className="font-medium">$225,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Liability:</span>
                          <span className="font-medium">$300,000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Deductible:</span>
                          <span className="font-medium">$2,500</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Annual Premium:</span>
                          <span className="font-medium">$1,850</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Renewal Date:</span>
                          <span className="font-medium">June 15, 2025</span>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Climate Details with Graphs */}
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Climate Risk Analysis</CardTitle>
                  <CardDescription>Environmental risk factors</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="flood">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="flood">Flood</TabsTrigger>
                      <TabsTrigger value="fire">Wildfire</TabsTrigger>
                      <TabsTrigger value="air">Air Quality</TabsTrigger>
                    </TabsList>
                    <TabsContent value="flood" className="space-y-4 mt-4">
                      <div className="flex items-center gap-3 border-b pb-3">
                        <div className="bg-blue-100 p-2 rounded-full">
                          <Droplets className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Flood Risk: Low</h3>
                          <p className="text-sm text-muted-foreground">Historical data analysis</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>5-Year Risk</span>
                            <span>15%</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full">
                            <div className="h-full bg-blue-500 w-[15%] rounded-full"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>10-Year Risk</span>
                            <span>22%</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full">
                            <div className="h-full bg-blue-500 w-[22%] rounded-full"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>30-Year Risk</span>
                            <span>35%</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full">
                            <div className="h-full bg-blue-500 w-[35%] rounded-full"></div>
                          </div>
                        </div>
                        <div className="pt-2 text-xs text-muted-foreground">
                          <p>Last major flood event: 2012</p>
                          <p>Elevation: 125 ft above sea level</p>
                          <p>Distance to water body: 1.2 miles</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="fire" className="space-y-4 mt-4">
                      <div className="flex items-center gap-3 border-b pb-3">
                        <div className="bg-amber-100 p-2 rounded-full">
                          <Flame className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Wildfire Risk: Moderate</h3>
                          <p className="text-sm text-muted-foreground">Based on vegetation and climate</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>5-Year Risk</span>
                            <span>28%</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full">
                            <div className="h-full bg-amber-500 w-[28%] rounded-full"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>10-Year Risk</span>
                            <span>42%</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full">
                            <div className="h-full bg-amber-500 w-[42%] rounded-full"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>30-Year Risk</span>
                            <span>65%</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full">
                            <div className="h-full bg-amber-500 w-[65%] rounded-full"></div>
                          </div>
                        </div>
                        <div className="pt-2 text-xs text-muted-foreground">
                          <p>Nearest wildfire: 8.5 miles (2020)</p>
                          <p>Vegetation density: Medium</p>
                          <p>Defensible space rating: Good</p>
                        </div>
                      </div>
                    </TabsContent>
                    <TabsContent value="air" className="space-y-4 mt-4">
                      <div className="flex items-center gap-3 border-b pb-3">
                        <div className="bg-green-100 p-2 rounded-full">
                          <Wind className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Air Quality: Good</h3>
                          <p className="text-sm text-muted-foreground">Current AQI: 42</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Particulate Matter (PM2.5)</span>
                            <span>18 µg/m³</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full">
                            <div className="h-full bg-green-500 w-[18%] rounded-full"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Ozone (O₃)</span>
                            <span>32 ppb</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full">
                            <div className="h-full bg-green-500 w-[32%] rounded-full"></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between text-xs mb-1">
                            <span>Nitrogen Dioxide (NO₂)</span>
                            <span>25 ppb</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full">
                            <div className="h-full bg-green-500 w-[25%] rounded-full"></div>
                          </div>
                        </div>
                        <div className="pt-2 text-xs text-muted-foreground">
                          <p>Annual average AQI: 48 (Good)</p>
                          <p>Days above 100 AQI last year: 12</p>
                          <p>Trend: Improving (↓5% year over year)</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Bottom half - Chat window */}
          <div className="h-1/2">
            <Card className="flex flex-col h-full border-0 rounded-none">
              <CardHeader className="border-b">
                <CardTitle>Chat Support</CardTitle>
                <CardDescription>Ask questions about your property or insurance</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 p-0 flex flex-col">
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[80%] rounded-lg px-4 py-2 ${
                            message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                          }`}
                        >
                          {message.content}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-4 border-t">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      handleSendMessage()
                    }}
                    className="flex gap-2"
                  >
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Ask about your property or insurance..."
                      className="flex-1"
                    />
                    <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </SidebarProvider>
  )
}

