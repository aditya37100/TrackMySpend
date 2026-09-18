import axios from "axios";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { TypeAnimation } from 'react-type-animation';
import { toast } from "react-toastify";
import { subscribeToPush } from "../utils/subscibeTopush";
import { useSearchParams } from "react-router-dom";

export default function InputFormModal({ isOpen, onClose, initialData }) {
  if (!isOpen) return null;

  const [subscriptionId, setSubscriptionId] = useState(null);   
  const [showButton, setShowButton] = useState(false);   
  const [from, setFrom] = useState("");   
  const [amount, setAmount] = useState(0);   
  const [category, setCategory] = useState("");   
  const [date, setDate] = useState("");   
  const [time, setTime] = useState("");      
  const [count, setCount] = useState(0);
  const [incomeId, setIncomeId] = useState(null);
  const [search] = useSearchParams();

  useEffect(() => {
    console.log('📝 InputFormModal received initialData:', initialData);
    
    if (!initialData) return;
    
    // Fix: Use the correct field names from OCR data
    if (initialData.from) setFrom(initialData.from);
    if (initialData.amount) setAmount(Number(initialData.amount));
    if (initialData.date) setDate(initialData.date);
    if (initialData.time) setTime(initialData.time);
    if (initialData.count) setCount(Number(initialData.count));
    if (initialData.category) setCategory(initialData.category);
    
    console.log('✅ Form fields updated:', {
      from: initialData.from,
      amount: initialData.amount,
      date: initialData.date,
      time: initialData.time,
      category: initialData.category
    });
  }, [initialData]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center ">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white dark:bg-customBlack p-6 rounded-xl shadow-lg w-full max-w-md  max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-customLavender">ADD INCOME</h2>
        <div className="h-px w-80 flex mx-auto bg-[#8e8e8e] mb-6"></div>
        
        <div className="flex justify-start pb-4">
          <TypeAnimation
            sequence={[
              'Manually enter the info!!..',
            ]}
            wrapper="p"
            cursor={true}
            repeat={0}       // Only once
            className="text-base font-segoe text-gray-700 dark:text-gray-300"
          />
        </div>

        {/* Debug info - remove in production */}
        {/* <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs">
          <h4 className="font-bold mb-2">Debug - Current Values:</h4>
          <div>From: "{from}"</div>
          <div>Amount: {amount}</div>
          <div>Date: "{date}"</div>
          <div>Time: "{time}"</div>
          <div>Category: "{category}"</div>
        </div> */}

        <div className="flex justify-start gap-2 items-center">
          <p className="pb-2 font-bold text-lg text-segoe">From:</p>
          <input
            type="text"
            value={from}
            placeholder="Source"
            className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
            required
            onChange={(e) => {setFrom(e.target.value)}}
          />
        </div>

        <div className="flex justify-start gap-2 items-center">
          <p className="pb-2 font-bold text-lg text-segoe">Amount:</p>
          <input
            type="number"
            placeholder="Amount Received"
            value={amount}
            className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
            required
            onChange={(e) => {setAmount(e.target.value)}}
          />
        </div>

        <div className="flex justify-start gap-2 items-center">
          <p className="pb-2 font-bold text-lg text-segoe">Date:</p>
          <input
            type="date"
            placeholder="On which date?"
            value={date}
            className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
            required
            onChange={(e) => {setDate(e.target.value)}}
          />
        </div>

        <div className="mb-4 w-full">
          <div className="flex items-baseline gap-2 mb-1">
            <label htmlFor="time" className="text-lg font-bold text-segoe text-gray-700 dark:text-gray-200">
              Time:
            </label>
            <span className="text-sm text-gray-500">(optional)</span>
          </div>
          <input
            type="time"
            id="time"
            value={time}
            className="w-full p-2 border rounded dark:bg-gray-800 dark:text-white"
            onChange={(e) => {setTime(e.target.value)}}
          />
        </div>

        <div className="flex justify-start gap-2 items-center">
          <p className="pb-2 font-bold text-lg text-segoe">Category:</p>
          <input
            type="text"
            placeholder="classify it!"
            value={category}
            className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
            required
            onChange={(e) => {setCategory(e.target.value)}}
          />
        </div>

        <div className="flex justify-start gap-2 items-center">
          <p className="pb-2 font-bold text-lg text-segoe">Count:</p>
          <input
            type="number"
            placeholder="how many times?"
            value={count}
            className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
            required
            onChange={(e) => {setCount(e.target.value)}}
          />
        </div>

        <div className="flex justify-center gap-3 pt-4">
          <button 
            className="dark:bg-customLavender bg-[#8e8e8e] text-white px-4 py-2 rounded hover:bg-[#737373] hover:dark:bg-[#825ec9]"
            onClick={async () => {
              try {
                const response = await axios.post(
                  "https://trackmyspendapi-3.onrender.com/income/addincome",
                  {
                    from: from,
                    amount: Number(amount),
                    category: category,
                    date: date,
                    time: time,
                    count: Number(count),
                  }
                );
                toast.success("Income added successfully!");
                setIncomeId(response.data._id || response.data.income._id);
                //onClose();
              } catch (err) {
                console.error("Add income error:", err);
                toast.error("Failed to add income, please try again.");
              }
            }}
          >
            Add
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>

        <div className="mt-6">
          <TypeAnimation
            sequence={[
              ' you can also set a reminder for your future income!!',
              () => setShowButton(true)
            ]}
            wrapper="p"
            cursor={true}
            repeat={0}       // Only once
            className="text-base font-segoe text-gray-700 dark:text-gray-300 pb-2"
          />
          <button
            className="dark:bg-customLavender bg-[#8e8e8e] text-white px-4 py-2 rounded hover:bg-[#737373] hover:dark:bg-[#825ec9] mt-3"
            onClick={async () => {
              try {
                // 1️⃣ Subscribe to push and grab the ID
                const { subscriptionId } = await subscribeToPush();
                setSubscriptionId(subscriptionId);
                // 2️⃣ Build the JS Date for the reminder
                const remindAt = new Date(`${date}T${time || "09:00"}`);
                const now = new Date();
                // 3️⃣ Only proceed if remindAt is strictly in the future
                if (remindAt <= now) {
                  toast.warn("Please select a future date and time for your reminder.");
                  return;
                }
                // 4️⃣ Fire the reminder‐creation call
                await axios.post("https://trackmyspendapi-3.onrender.com/reminder/add", {
                  incomeId,
                  remindAt,
                  subscriptionId,
                });
                toast.success("Reminder set!");
                onClose();
              } catch (err) {
                console.error("Failed to set reminder:", err);
                toast.error("Failed to set reminder");
              }
            }}
          >
            🔔 Enable Reminder Notifications
          </button>
        </div>

        <div className="flex items-center gap-4 my-4 ">
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>

        <TypeAnimation
          sequence={[
            ' Try our new Auto-filling feature which fills the form just by using payment screenshot...',
            () => setShowButton(true)
          ]}
          wrapper="p"
          cursor={true}
          repeat={0}       // Only once
          className="text-base font-segoe text-gray-700 dark:text-gray-300 pb-2"
        />
        {showButton && (
          <button className="dark:bg-customLavender bg-[#8e8e8e] text-white px-4 py-2 rounded hover:bg-[#737373] hover:dark:bg-[#825ec9]">
            Try-Now
          </button>
        )}
      </motion.div>
    </div>
  );
}
