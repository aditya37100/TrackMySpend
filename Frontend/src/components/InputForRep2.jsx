import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { TypeAnimation } from 'react-type-animation';

export default function InputForWeeklyReport({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");

  const handleManualReport = () => {
    if (year && month && week) {
      navigate("/repanalysis", { state: { year, month, week } });
    }
  };

  const handleCurrentWeekReport = () => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate();
    // Calculate week number in month (1-5)
    const weekNo = Math.ceil(day / 7);
    navigate("/repanalysis", { state: { year: currentYear.toString(), month: currentMonth, week: weekNo.toString() } });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white dark:bg-customBlack p-6 rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-customLavender">WEEKLY REPORT</h2>
        <div className="h-px w-80 mx-auto bg-[#8e8e8e] mb-6" />

        <div className="flex justify-start pb-4">
          <TypeAnimation
            sequence={['Select a year, month, and week (1-5) to view your weekly report!']}
            wrapper="p"
            cursor={true}
            repeat={0}
            className="text-base font-segoe text-gray-700 dark:text-gray-300"
          />
        </div>

        <div className="flex flex-col gap-2 items-start mb-3">
          <label className="pb-2 font-bold text-lg text-segoe">Year:</label>
          <input
            type="number"
            placeholder="Year (e.g. 2024)"
            className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
            required
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
          <label className="pb-2 font-bold text-lg text-segoe">Month:</label>
          <input
            type="number"
            placeholder="Month (1-12)"
            className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
            required
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            min={1}
            max={12}
          />
          <label className="pb-2 font-bold text-lg text-segoe">Week Number:</label>
          <input
            type="number"
            placeholder="Week (1-5)"
            className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
            required
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            min={1}
            max={5}
          />
        </div>

        <div className="flex justify-center gap-3 pt-4">
          <button
            className="dark:bg-customLavender bg-[#8e8e8e] text-white px-4 py-2 rounded hover:bg-[#737373] hover:dark:bg-[#825ec9]"
            onClick={handleManualReport}
          >
            Get Report
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>

        <div className="flex items-center gap-4 my-4">
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
          <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600" />
        </div>

        <TypeAnimation
          sequence={['Or get the report for the current week!', () => setShowButton(true)]}
          wrapper="p"
          cursor={true}
          repeat={0}
          className="text-base font-segoe text-gray-700 dark:text-gray-300 pb-2"
        />

        {showButton && (
          <button
            onClick={handleCurrentWeekReport}
            className="dark:bg-customLavender bg-[#8e8e8e] text-white px-4 py-2 rounded hover:bg-[#737373] hover:dark:bg-[#825ec9]"
          >
            Get Current Week Report
          </button>
        )}
      </motion.div>
    </div>
  );
}
