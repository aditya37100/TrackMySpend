import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { TypeAnimation } from 'react-type-animation';

export default function InputForTotalReport({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [showButton, setShowButton] = useState(false);

  const handleTotalReport = () => {
    navigate("/repanalysis", { state: {} });
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
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-customLavender">TOTAL REPORT</h2>
        <div className="h-px w-80 mx-auto bg-[#8e8e8e] mb-6" />

        <TypeAnimation
          sequence={['Get a report for all your transactions!', () => setShowButton(true)]}
          wrapper="p"
          cursor={true}
          repeat={0}
          className="text-base font-segoe text-gray-700 dark:text-gray-300 pb-2"
        />

        {showButton && (
          <div className="flex justify-center gap-3 pt-4">
            <button
              onClick={handleTotalReport}
              className="dark:bg-customLavender bg-[#8e8e8e] text-white px-4 py-2 rounded hover:bg-[#737373] hover:dark:bg-[#825ec9]"
            >
              Get Total Report
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
