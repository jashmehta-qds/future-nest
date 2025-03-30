"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "system";
  timestamp: Date;
}

export function MainContent() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hello! How can I help you today?",
      sender: "system",
      timestamp: new Date(),
    },
  ]);
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight
      }
    }
  }, [messages])
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Send the prompt to the backend
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch AI response");
      }

      const data = await response.json();

      // Add AI response to the chat
      const systemMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: data.response, // AI response from the backend
        sender: "system",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, systemMessage]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: "Sorry, something went wrong. Please try again later.",
        sender: "system",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 h-full overflow-hidden border-r">
      <Card className="flex flex-col h-full border-0 rounded-none backdrop-blur-md bg-white/20">
        <CardHeader className="border-b backdrop-blur-md bg-white/30">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
            >
              <Bot className="h-5 w-5 text-primary" />
            </motion.div>
            <CardTitle>Weather Assistant</CardTitle>
          </div>
          <CardDescription>Ask questions about weather, property, and climate risks</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 p-0 flex flex-col">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 flex items-start gap-2 ${
                        message.sender === "user"
                          ? "bg-primary/80 text-primary-foreground backdrop-blur-sm"
                          : "bg-white/30 backdrop-blur-sm border border-white/20"
                      }`}
                    >
                      {message.sender === "system" && <Bot className="h-4 w-4 mt-1 flex-shrink-0" />}
                      <div>
                        {message.content}
                        <div className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                      {message.sender === "user" && <User className="h-4 w-4 mt-1 flex-shrink-0" />}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </ScrollArea>
          <div className="p-4 border-t backdrop-blur-md bg-white/30">
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
                placeholder="Ask about weather, property values, or climate risks..."
                className="flex-1 bg-white/50 border-white/30 focus-visible:ring-primary/50"
              />
              <Button type="submit" size="icon" disabled={isLoading} className="bg-primary/80 hover:bg-primary">
                {isLoading ? (
                  <div className="animate-spin h-4 w-4 border-2 border-t-transparent rounded-full"></div>
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}