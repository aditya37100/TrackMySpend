import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { TypeAnimation } from 'react-type-animation';

export default function InputForMonthlyReport({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);
  const [month, setMonth] = useState("");

  const handleManualReport = () => {
    if (month) {
      navigate("/repanalysis", { state: { month } });
    }
  };

  const handleCurrentMonthReport = () => {
    const currentMonth = new Date().toISOString().slice(0, 7);
    navigate("/repanalysis", { state: { month: currentMonth } });
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
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-customLavender">MONTHLY REPORT</h2>
        <div className="h-px w-80 mx-auto bg-[#8e8e8e] mb-6" />

        <div className="flex justify-start pb-4">
          <TypeAnimation
            sequence={['Select a month to view your monthly report!']}
            wrapper="p"
            cursor={true}
            repeat={0}
            className="text-base font-segoe text-gray-700 dark:text-gray-300"
          />
        </div>

        <div className="flex justify-start gap-2 items-center">
          <p className="pb-2 font-bold text-lg text-segoe">Month:</p>
          <input
            type="month"
            placeholder="which month?.."
            className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
            required
            onChange={(e) => setMonth(e.target.value)}
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
          sequence={['Or get the report for the current month!', () => setShowButton(true)]}
          wrapper="p"
          cursor={true}
          repeat={0}
          className="text-base font-segoe text-gray-700 dark:text-gray-300 pb-2"
        />

        {showButton && (
          <button
            onClick={handleCurrentMonthReport}
            className="dark:bg-customLavender bg-[#8e8e8e] text-white px-4 py-2 rounded hover:bg-[#737373] hover:dark:bg-[#825ec9]"
          >
            Get Current Month Report
          </button>
        )}
      </motion.div>
    </div>
  );
}
