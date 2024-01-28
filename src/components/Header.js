import React from "react";
import logo from "../assets/images/logo.jpg";

const Header = () => {
  return (
    <div className="w-full py-2.5 z-10 bg-transparent">
      <div className="flex flex-col items-center gap-2 md:gap-0 md:flex-row md:justify-between md:items-center">
        <div className="flex items-center gap-3 md:gap-5 md:flex-1">
          <img
            src={logo}
            alt="logo"
            className="h-10 object-contain rounded-lg md:ml-4"
          />
          <div className="flex flex-col line-height[1.5em] md:ml-5">
            <span className="text-2xl text-gray-200">HealthLife</span>
            <span className="text-gray-200">Green Generation</span>
          </div>
        </div>
        <div className="flex gap-2 md:gap-4 md:pr-4 text-base font-normal">
          <span className="text-gray-200 font-medium cursor-pointer hover:underline hover:opacity-80">
            About
          </span>
          <span className="text-gray-200 font-medium cursor-pointer hover:underline hover:opacity-80">
            Services
          </span>
          <span className="text-gray-200 font-medium cursor-pointer hover:underline hover:opacity-80">
            Inspect
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
