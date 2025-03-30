"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

interface RightSidebarProps {
    newsFeed: { title: string; url: string; date: string }[];
  }

  export function RightSidebar({ newsFeed }: RightSidebarProps) {
  return (
    <div className="w-[30%] h-full overflow-auto">
      <Card className="h-full">
        <CardHeader>
          <CardTitle>News Feeds</CardTitle>
          <CardDescription>Latest updates and news from the area</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea className="h-[calc(100%-50px)]">
            <div className="space-y-4">
              {newsFeed.length > 0 ? (
                newsFeed.map((news, index) => (
                  <div key={index} className="border-b pb-2">
                    <a
                      href={news.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 font-medium"
                    >
                      {news.title}
                    </a>
                    <p className="text-xs text-muted-foreground mt-1">{news.date}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  No news available. Enter a pin code to fetch news.
                </p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      
    </div>
  );
}