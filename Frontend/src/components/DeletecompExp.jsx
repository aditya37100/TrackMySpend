import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Delcompexp({closeit,expenseid,expenses, setExpenses}){
   
    const handleDel= ()=>{
        axios.delete("https://trackmyspendapi-3.onrender.com/expense/deletexpense" ,{
          data: {
      id: expenseid,           // optional
    }

        })
        .then((res) => {
            console.log(res.data.message);
            toast.success("deleted successfully!!");
            const updatedExpenses = expenses.filter((inc) => inc._id !== expenseid);
        setExpenses(updatedExpenses);

        closeit();
        })
        .catch((err) =>{
            console.log(err);
            toast.error("some error occured!");
        })
        
    }
    
 
    return  <div className="fixed inset-0 z-50 bg-black bg-opacity-20 flex justify-center items-center ">
      <motion.div

        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white dark:bg-customBlack p-6 rounded-xl shadow-lg w-full max-w-md  max-h-[90vh] overflow-y-auto"
      >
        <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-customLavender">are you sure you want to delete it?</h2>
        <div className="flex justify-center items-center gap-4">
          <button onClick={handleDel} className=" dark:bg-customLavender bg-[#8e8e8e] text-white px-4 py-2 rounded hover:bg-[#737373] hover:dark:bg-[#825ec9]">Confirm</button>
          <button onClick={closeit} className=" dark:bg-customLavender bg-[#8e8e8e] text-white px-4 py-2 rounded hover:bg-[#737373] hover:dark:bg-[#825ec9]">Cancel</button>
        </div>
        </div>
        </motion.div>
        </div>
}