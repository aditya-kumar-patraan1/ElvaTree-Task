import React from "react";
import { useState } from "react";
import Dashboard from "./Components/Dashboard";
import Transactionhistory from "./Components/Transactionhistory";
import Topupcredits from "./Components/Topupcredits";
import Currentraffle from "./Components/Currentraffle";
import { MdDashboard } from "react-icons/md";
import { RiHistoryLine } from "react-icons/ri";
import { HiUserAdd } from "react-icons/hi";
import { FaGift } from "react-icons/fa6";
import { GrAchievement } from "react-icons/gr";
import { IoMdSettings } from "react-icons/io";
import AlatreeVentureLogo from "./assets/AlatreeLogo.png";
import "./App.css";

const HomePage = () => {
  const [currentTab, setCurrentTab] = useState("Dashboard");

  const renderPage = {
    Dashboard: [<MdDashboard />, <Dashboard currentTab={currentTab} setCurrentTab={setCurrentTab}/>],
    "Transaction History": [<RiHistoryLine />, <Transactionhistory  currentTab={currentTab} setCurrentTab={setCurrentTab}/>],
    "Top Up Credits": [<HiUserAdd />, <Topupcredits  currentTab={currentTab} setCurrentTab={setCurrentTab}/>],
    "Current Raffle": [<FaGift />, <Currentraffle  currentTab={currentTab} setCurrentTab={setCurrentTab}/>],
  };


  const changePage = (tab) => setCurrentTab(tab);

  return (
    <>
      <div className="flex h-screen relative w-screen font-heading">
        {/* Sidebar */}
        <div className="flex flex-col justify-between bg-[var(--primary-color)] p-4 min-w-fit">
          <div className="flex flex-col gap-6 w-full">
            <div className="flex w-full justify-center">
             <p className="text-bold text-2xl text-[var(--neutral-light)]">Alatree Venture</p>
            </div>
            {Object.entries(renderPage).map(([key, [icon]]) => (
              <div
                key={key}
                onClick={() => changePage(key)}
                className={`flex items-center gap-3 rounded-sm w-full px-3 py-2 cursor-pointer ${
                  key === currentTab ? "bg-[var(--neutral-light)]" : "hover:bg-neutral-200"
                }`}
              >
                <span className="text-xl text-[var(--accent-color)]">{icon}</span>
                <span className="text-sm font-medium text-[var(--accent-color)]">{key}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 cursor-pointer rounded-sm px-3 py-2 hover:bg-neutral-300">
            <IoMdSettings className="text-2xl text-[var(--neutral-light)]" />
            <span className="text-sm font-medium text-[var(--neutral-light)]">Settings</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-[var(--neutral-light)] w-full p-4 overflow-auto">
          {renderPage[currentTab][1]}
        </div>
      </div>
    </>
  );
};

export default HomePage;
