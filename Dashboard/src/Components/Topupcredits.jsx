import React, { useEffect, useState } from "react";
import { BsCoin } from "react-icons/bs";
import { GrAchievement } from "react-icons/gr";
import { MdProductionQuantityLimits } from "react-icons/md";
import StripeTopUpForm from "./StripeTopUpForm";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import MyCurrentRaffles from "./MyCurrentRaffles";
import CreditsLineChart from "./CreditsLineChart";
import { FiChevronRight } from "react-icons/fi";
import Spinner from "./Spinner";
import toast, { Toaster } from "react-hot-toast";
import "../App.css";

const StripePromise = loadStripe(
  "pk_test_51Rd852H0xY9alvXlhtLKvMsZXoO1KYnxXgzPmrFeUDypXOXyai5USc1O1owQgMey6UAFQBQl4Ng1UguNTYQC6FJv00iDJlxjXk"
);

const Topupcredits = ({ currentTab, setCurrentTab }) => {
  const [Credits, SetCredits] = useState(() => {
    const saved = localStorage.getItem("Credits");
    return saved ? parseInt(saved, 10) : 7500;
  });

  const [ShowStripeForm, setShowStripeForm] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const [IsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("Credits", Credits.toString());
  }, [Credits]);

  const StartLoad = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsOpen(true);
    }, 2000);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsLoading(false);
  };

  const [topUpTransactions, setTopUpTransactions] = useState([
    {
      title: "Top-Up via Card",
      date: "June 22, 2025",
      time: "11:00 AM",
      changes: "+1000 credits",
    },
    {
      title: "Top-Up via UPI",
      date: "June 21, 2025",
      time: "05:30 PM",
      changes: "+500 credits",
    },
    {
      title: "Top-Up via Wallet",
      date: "June 20, 2025",
      time: "09:45 AM",
      changes: "+750 credits",
    },
    {
      title: "Top-Up via Net Banking",
      date: "June 18, 2025",
      time: "04:15 PM",
      changes: "+1200 credits",
    },
    {
      title: "Top-Up via Credit Card",
      date: "June 16, 2025",
      time: "02:00 PM",
      changes: "+800 credits",
    },
    {
      title: "Top-Up via Debit Card",
      date: "June 14, 2025",
      time: "10:30 AM",
      changes: "+1500 credits",
    },
  ]);

  function handleTopUp(amount) {
    const current = parseInt(localStorage.getItem("Credits") || "0", 10);
    const updated = current + amount;

    localStorage.setItem("Credits", updated.toString());

    SetCredits((prev) => prev + parseInt(amount));

    setTopUpTransactions((prev) => [
      {
        title: "Top-up via Stripe",
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        changes: `+${amount} credits`,
      },
      ...prev,
    ]);
    setShowStripeForm(false);
    alert(`Dummy top-up successful: +${amount} credits added!`);
    toast.success("Top-up done 🎉");
  }

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-neutral-100 p-4 sm:p-6 flex flex-col gap-6">
        {IsOpen && (
  <div className="absolute top-0 left-0 inset-0 bg-opacity-30 text-black flex justify-center items-center backdrop-blur-sm z-50 px-4">
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full flex flex-col gap-4 max-h-[80vh] overflow-y-auto">
      <h2 className="font-bold text-xl text-center font-heading">
        Top-up History
      </h2>
      <ul className="flex flex-col gap-3 overflow-y-auto pr-2 font-body">
        {topUpTransactions.map((item, i) => (
          <li
            key={i}
            className="flex justify-between items-center border-b pb-1"
          >
            <div>
              <p className="font-medium text-gray-700">{item.title}</p>
              <p className="text-xs text-gray-400">
                {item.date}, {item.time}
              </p>
            </div>
            <p className="font-semibold text-green-600">{item.changes}</p>
          </li>
        ))}
      </ul>
      <div className="flex justify-center gap-4 mt-4">
        <button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded-lg shadow">
          Confirm
        </button>
        <button
          className="bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded-lg shadow"
          onClick={handleClose}
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


        {/* TOP STATS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="overflow-hidden w-full bg-white rounded-xl shadow-md p-4">
            <CreditsLineChart />
          </div>
          <div className="flex w-full gap-10 bg-transparent">
            <div className="bg-white rounded-xl flex flex-col justify-center w-1/4 shadow-md p-4 items-center gap-4">
              <BsCoin className="text-4xl text-primary" />
              <div>
                <p className="text-2xl font-bold text-gray-800">{Credits}</p>
                <p className="text-sm text-gray-500 uppercase tracking-wide font-body">
                  Credits
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md w-full p-4 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <MdProductionQuantityLimits className="text-4xl text-primary" />
                <div>
                  <p className="text-2xl font-bold text-gray-800">15</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wide font-body">
                    Collectibles
                  </p>
                </div>
                <GrAchievement className="text-4xl text-primary ml-auto" />
              </div>
              {/* <div className="flex flex-wrap gap-2">
                {[200, 300, 500, 1000].map((amt) => (
                  <span
                    key={amt}
                    className="border rounded-full px-3 py-1 text-sm text-gray-700 hover:bg-primary hover:text-white cursor-pointer transition"
                  >
                    {amt}
                  </span>
                ))}
              </div> */}
              <button
                className="bg-primary text-white py-2 font-heading rounded-md bg-[var(--primary-color)] hover:bg-teal-700 transition"
                onClick={() => setShowStripeForm(true)}
              >
                Add Custom Credits
              </button>
            </div>
          </div>
        </div>

        {/* form */}
        {ShowStripeForm && (
          <div className="absolute top-0 left-0 inset-0  bg-opacity-30 text-black flex justify-center items-center backdrop-blur-sm z-50 px-4">
            <div className="bg-white p-6 rounded-xl shadow-lg  w-1/2 flex flex-col gap-4">
              <Elements stripe={StripePromise}>
                <StripeTopUpForm
                  onTopUp={handleTopUp}
                  closeForm={() => setShowStripeForm(false)}
                />
              </Elements>
            </div>
          </div>
        )}

        {/* BOTTOM CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl flex flex-col gap-7 items-center shadow-md p-4">
            <p className="text-lg font-semibold mb-3 text-gray-800 font-heading">
              Transaction History
            </p>
            <ul className="w-full ">
              {[0, 1, 2].map((idx, i) => (
                <li key={i} className="flex justify-between items-center p-2">
                  <p className="font-medium text-gray-700 font-heading">
                    {topUpTransactions[idx].title}
                  </p>
                  <p className="text-xs text-gray-400 font-body">
                    {topUpTransactions[idx].date} {topUpTransactions[idx].time}
                  </p>
                  <p className="font-semibold text-[var(--primary-color)] font-body">
                    {topUpTransactions[idx].changes}
                  </p>
                </li>
              ))}
            </ul>
            <button
              className="text-white font-light px-6 w-fit h-fit py-2 hover:bg-gray-950 transition-all duration-300 hover:cursor-pointer  text-sm"
              onClick={() => StartLoad()}
            >
              {IsLoading ? (
                <div className="flex gap-3 bg-[var(--primary-color)] items-center">
                  <p className="font-heading">Loading..</p> <Spinner />
                </div>
              ) : (
                <p className="font-heading ">Load More</p>
              )}
            </button>
          </div>
          <div className="bg-white rounded-xl flex flex-col items-center gap-5 shadow-md p-4 w-full">
            <p className="text-lg font-semibold mb-3 text-gray-800 font-heading">
              Current Raffles
            </p>
            <div className="text-sm text-gray-500 w-full">
              <MyCurrentRaffles
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topupcredits;
