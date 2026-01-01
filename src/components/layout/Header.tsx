"use client";

import React from "react";
import LogoBrand from "./LogoBrand";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";
import DepositButton from "./DepositButton";
import IconCluster from "./IconCluster";
import ControlBar from "./ControlBar";

interface HeaderProps {
  showDisplayDropdown: boolean;
  setShowDisplayDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ showDisplayDropdown, setShowDisplayDropdown }) => {
  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-black border-b border-gray-800">
        <div className="flex items-center justify-between py-2 pl-3 pr-2 sm:px-4 lg:px-6 min-h-[60px] max-h-[80px]">
          {/* ===== LEFT: LOGO + NAV ===== */}
          <div className="flex items-center min-w-0 flex-1">
            <LogoBrand />
            <NavBar />
          </div>
          {/* ===== RIGHT: SEARCH + CONTROLS ===== */}
          <div className="flex items-center flex-shrink-0 space-x-2 sm:space-x-3 lg:space-x-4 min-w-0">
            <SearchBar />
            <DepositButton />
            <IconCluster />
          </div>
        </div>
      </header>
      <ControlBar showDisplayDropdown={showDisplayDropdown} setShowDisplayDropdown={setShowDisplayDropdown} />
    </>
  );
};

export default Header;


