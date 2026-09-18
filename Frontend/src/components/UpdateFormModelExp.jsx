import axios from "axios";
import { motion } from "framer-motion";
import { useState,useEffect } from "react";
import { TypeAnimation } from 'react-type-animation';
import { toast } from "react-toastify";

export default function UpdateFormModalExp({
  isOpen,
  onClose,
  initialData,   // { _id, from, amount, category, date, time, count }
  onSave         // callback to parent with updated record
}) {
  if (!isOpen) return null;
   const [showButton, setShowButton] = useState(false);
   const [to,setTo]= useState("");
   const [amount,setAmount]= useState(0);
   const [category,setCategory]= useState("");
   const [date,setDate]= useState("");
   const [time,setTime]= useState("");
      const [count,setCount]= useState(0);

        useEffect(() => {
            console.log(initialData);
    if ( isOpen&&initialData) {
      setTo(initialData.to);
      setAmount(initialData.amount.toString());
      setCategory(initialData.category);
      setDate(initialData.date);
      setTime(initialData.time || "");
      setCount(initialData.count.toString());
    }
  }, [isOpen,initialData]);

   const handleUpdate = async () => {
    try {
      const payload = {
        id:       initialData._id,
        to,
        amount:   Number(amount),
        category,
        date,
        time,
        count:    Number(count),
      };
      const res = await axios.put(
        "https://trackmyspendapi-3.onrender.com/expense/updatexpense",
        payload
      );
     toast.success("updated successfully!!");
      onSave(res.data.updatedexpense);
    } catch (err) {
      console.error("Update failed:", err);
       toast.error("updation failed!!");
    }
  };


 

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center ">
      <motion.div

        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white dark:bg-customBlack p-6 rounded-xl shadow-lg w-full max-w-md  max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-customLavender">UPDATE EXPENSE</h2>
        <div className="h-px w-80 flex mx-auto bg-[#8e8e8e] mb-6"></div>

        <div className="flex justify-start pb-4">
            <TypeAnimation
  sequence={[
    'Update the info!!..',
  ]}
  wrapper="p"
  cursor={true}
  repeat={0}       // Only once
  className="text-base font-segoe text-gray-700 dark:text-gray-300"
/>
        </div>
       <div className="flex justify-start gap-2  items-center">
        <p className="pb-2 font-bold text-lg text-segoe" >To:</p>
        <input
          type="text"
          placeholder="Source"
          value={to}
          className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
          required
          onChange={(e) => {setTo(e.target.value)}}
        />
        </div>
        <div className="flex justify-start gap-2  items-center">
        <p className="pb-2 font-bold text-lg text-segoe" >Amount:</p>
        <input
          type="number"
          placeholder="Amount Recieved"
          value={amount}
          className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
          required
          onChange={(e) => {setAmount(e.target.value)}}
        />
        </div>
        <div className="flex justify-start gap-2  items-center">
        <p className="pb-2 font-bold text-lg text-segoe" >Date:</p>
        <input
          type="date"
          placeholder="On which date?"
          value={date}
          className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
          required
          onChange={(e)=>{setDate(e.target.value)}}
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

        <div className="flex justify-start gap-2  items-center">
        <p className="pb-2 font-bold text-lg text-segoe" >Category:</p>
        <input
          type="text"
          placeholder="classify it!"
          value={category}
          className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
          required
          onChange={(e) => {setCategory(e.target.value)}}
        />
        </div>

        <div className="flex justify-start gap-2  items-center">
        <p className="pb-2 font-bold text-lg text-segoe" >Count:</p>
        <input
          type="number"
          placeholder="how many times?"
          value={count}
          className="w-full p-2 mb-3 border rounded dark:bg-gray-800 dark:text-white"
          required
          onChange={(e)=>{setCount(e.target.value)}}
        />
        </div>
        
        <div className="flex justify-center gap-3 pt-4">
          
          <button className=" dark:bg-customLavender bg-[#8e8e8e] text-white px-4 py-2 rounded hover:bg-[#737373] hover:dark:bg-[#825ec9]"
                onClick={handleUpdate}
          >
            Update
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
        

      </motion.div>
    </div>
  );
}
