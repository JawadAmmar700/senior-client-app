"use client";
import { useState } from "react";
import Header from "./header";
import { RootState } from "@/store/configuration";
import { useSelector } from "react-redux";

const RoomName = () => {
  const { roomName } = useSelector((state: RootState) => state.appState);
  const [open, setOpen] = useState(false);

  return (
    <div className="flex p-2 space-x-5 items-center justify-between shadow-sm rounded-lg">
      <div className="flex items-center space-x-3">
        <h1 className="lg:text-xl text-xl font-bold">{roomName}</h1>
      </div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center p-2 rounded-lg hover:bg-[#E1F3F2] cursor-pointer lg:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </button>
      <div
        className={`fixed h-full w-full z-50 left-0 top-0  ${
          open ? "block" : "hidden"
        }`}
      >
        <div
          className="fixed h-full w-full left-0 top-0 bg-black bg-opacity-50 z-[-1]"
          onClick={() => setOpen(!open)}
        ></div>

        <div className="fixed left-0 top-0 bg-white">
          <Header isDrawer={true} />
        </div>
      </div>
    </div>
  );
};

export default RoomName;
