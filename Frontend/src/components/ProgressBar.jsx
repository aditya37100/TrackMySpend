// src/components/ProgressBar.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProgressBar({ capAmount }) {
  const [expense, setExpense] = useState(null);

  useEffect(() => {
    axios
      .get("https://trackmyspendapi-3.onrender.com/expense/monthlytotalexpense")
      .then((res) => setExpense(res.data.totalmonthlyExpense))
      .catch((err) => console.error("Error fetching expense:", err));
  }, []);

  // still waiting on data?
  if (expense === null) return <p>Loading progress…</p>;

  // calculate percent of cap used
  const ratio = capAmount > 0 ? (expense / capAmount) * 100 : 0;
  const filled = Math.min(Math.round(ratio), 100);

  // choose color + message
  let fillColor, message;
  if (filled < 50) {
    fillColor = "#22c55e";
    message = "Nice — you’re well under your budget cap!";
  } else if (filled < 70) {
    fillColor = "#f97316";
    message = "Spend cautiously — you’re nearing your cap.";
  } else {
    fillColor = "#ef4444";
    message = "Caution—overspending your cap!";
  }

  return (
    <div className="w-[700px] mx-auto">
      {/* bar */}
      <div className="w-full h-4 bg-gray-200 rounded overflow-hidden">
        <div
          className="h-full transition-[width] duration-300"
          style={{ width: `${filled}%`, backgroundColor: fillColor }}
        />
      </div>

      {/* label */}
      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
        {filled}% of your ₹{capAmount} budget used ({expense} spent)
      </p>

      {/* message */}
      <p className="mt-2 text-md font-medium" style={{ color: fillColor }}>
        {message}
      </p>
    </div>
  );
}
