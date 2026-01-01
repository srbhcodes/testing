import React from "react";
import { Star, Bell, MessageSquare, User } from "lucide-react";

const IconCluster: React.FC = () => (
  <div className="flex items-center space-x-2 sm:space-x-2.5 lg:space-x-3 flex-shrink-0">
    {/* Star */}
    <button className="p-1 rounded hover:bg-gray-800 text-gray-400 hover:text-white transition-colors flex-shrink-0">
      <Star className="w-5 h-5" />
    </button>
    {/* Bell */}
    <button className="p-1 rounded hover:bg-gray-800 text-gray-400 hover:text-white transition-colors flex-shrink-0">
      <Bell className="w-5 h-5" />
    </button>
    {/* Message (with badge) */}
    <button className="relative p-1 rounded hover:bg-gray-800 text-gray-400 hover:text-white transition-colors flex-shrink-0">
      <MessageSquare className="w-5 h-5" />
      <span className="absolute -top-1 -right-1 bg-gray-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold leading-none">0</span>
    </button>
    {/* Portfolio (gray circle with 0) */}
    <button className="relative p-0.5 flex items-center justify-center text-gray-400 hover:text-white transition-colors flex-shrink-0">
      <div className="w-5 h-5 bg-gray-600 rounded-full flex items-center justify-center">
        <span className="text-[10px] leading-none font-semibold text-white">0</span>
      </div>
    </button>
    {/* User */}
    <button className="p-1 rounded hover:bg-gray-800 text-gray-400 hover:text-white transition-colors flex-shrink-0">
      <User className="w-5 h-5" />
    </button>
  </div>
);

export default IconCluster;


