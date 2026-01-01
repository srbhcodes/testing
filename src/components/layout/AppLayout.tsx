"use client";

import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [showDisplayDropdown, setShowDisplayDropdown] = useState(false);

  return (
    // Fixed viewport - NO page scrolling
    <div className="h-screen bg-[#0A0A0A] flex flex-col overflow-hidden">
      {/* Header - fixed height */}
      <Header 
        showDisplayDropdown={showDisplayDropdown} 
        setShowDisplayDropdown={setShowDisplayDropdown} 
      />
      
      {/* Main content - fills remaining space, children handle their own scrolling */}
      <div className="flex-1 flex flex-col min-h-0 pb-9">
        {children}
      </div>
      
      {/* Footer - fixed at bottom */}
      <Footer />
    </div>
  );
};

export default AppLayout;
