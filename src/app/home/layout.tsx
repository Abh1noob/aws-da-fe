"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  // Handle tab change
  const handleTabChange = (value: string) => {
    if (value === "feed") {
      router.push("/home/feed"); // Navigate to /home/feed when 'account' tab is selected
    } else if (value === "upload") {
      router.push("/home/upload"); // Navigate to /home/upload when 'password' tab is selected
    }
  };

  return (
    <div>
      <Tabs
        defaultValue="feed"
        className="w-full"
        onValueChange={handleTabChange} // Set the tab change handler
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="feed">Home</TabsTrigger>
          <TabsTrigger value="upload">Upload</TabsTrigger>
        </TabsList>
        <TabsContent value="feed">{children}</TabsContent>
        <TabsContent value="upload">{children}</TabsContent>
      </Tabs>
    </div>
  );
};

export default Layout;
