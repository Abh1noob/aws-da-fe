"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState("home");

  const router = useRouter();

  const handleTabChange = (tab: string, route: string) => {
    setActiveTab(tab);
    router.push(route);
  };

  return (
    <div className="flex flex-col items-center space-y-4 h-screen">
      <div className="flex-1 px-4 pt-4 ">{children}</div>
      <div className="grid grid-cols-2 w-full gap-2 border py-2 fixed bottom-0 bg-white shadow-md">
        <Button
          onClick={() => handleTabChange("home", "/home/feed")}
          className={`w-full py-2 ${
            activeTab === "home" ? "" : "bg-gray-200 text-black"
          }`}
        >
          Home
        </Button>
        <Button
          onClick={() => handleTabChange("upload", "/home/upload")}
          className={`w-full py-2 ${
            activeTab === "upload" ? "" : "bg-gray-200 text-black"
          }`}
        >
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Layout;
