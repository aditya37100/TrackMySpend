import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PercentageSlider({ value, setValue }) {
  // still fetch monthlyIncome inside here if you like:
  const [monthlyIncome, setMonthlyIncome] = useState(null);

  useEffect(() => {
    axios
      .get("https://trackmyspendapi-3.onrender.com/income/monthlytotalincome")
      .then((res) => setMonthlyIncome(res.data.totalMonthlyIncome))
      .catch(console.error);
  }, []);

  const handleChange = (e) => setValue(Number(e.target.value));

  const getTrackColor = (v) =>
    v <= 50 ? "#22c55e" : v <= 70 ? "#f97316" : "#ef4444";

  const marks = Array.from({ length: 11 }, (_, i) => i * 10);

  // you can still calculate the budgetAmount here if you want to show it in the slider:
  const budgetAmount = monthlyIncome
    ? Math.round((value / 100) * monthlyIncome)
    : 0;

  return (
    <div className="w-full pr-6 py-10 flex flex-col items-center bg-white dark:bg-[#121c23] text-black dark:text-white">
      <div className="w-[700px] relative">
        <input
          type="range"
          min="0"
          max="100"
          step="10"
          value={value}             // ← controlled by parent
          onChange={handleChange}   // ← updates parent
          className="w-full appearance-none bg-transparent focus:outline-none focus:ring-0"
          style={{
            background: `linear-gradient(to right, ${getTrackColor(
              value
            )} 0%, ${getTrackColor(value)} ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`,
            height: "12px",
            borderRadius: "6px",
          }}
        />
        <div className="flex justify-between mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
          {marks.map((mark) => (
            <span key={mark} className="w-[1px] text-center -ml-[8px]">
              {mark}%
            </span>
          ))}
        </div>
      </div>

      {/* Optional: show live preview in the slider itself */}
      {monthlyIncome !== null && (
          <p className="mt-6 text-lg font-semibold text-center">
            You have chosen <span className="text-blue-600">{value}%</span>, which
            means your budget cap is{" "}
            <span className="text-green-600">₹{budgetAmount}</span> out of{" "}
            <span className="text-purple-600">₹{monthlyIncome}</span>.
          </p>
      )}

      <style type="text/css">{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          height: 28px;
          width: 14px;
          background-color: #8e8e8e;
          border-radius: 3px;
          cursor: pointer;
          margin-top: -8px;
          border: none;
        }
        input[type="range"]:focus::-webkit-slider-thumb {
          outline: none; box-shadow: none;
        }
        input[type="range"]::-moz-range-thumb {
          height: 28px;
          width: 14px;
          background-color: #8e8e8e;
          border-radius: 3px;
          cursor: pointer;
          border: none;
        }
        input[type="range"]:focus::-moz-range-thumb {
          outline: none; box-shadow: none;
        }
        input[type="range"]::-webkit-slider-runnable-track,
        input[type="range"]::-moz-range-track {
          height: 12px; border-radius: 6px;
        }
        @media (prefers-color-scheme: dark) {
          input[type="range"]::-webkit-slider-thumb,
          input[type="range"]::-moz-range-thumb {
            background-color: #cbc0ff;
          }
        }
      `}</style>
    </div>
  );
}
