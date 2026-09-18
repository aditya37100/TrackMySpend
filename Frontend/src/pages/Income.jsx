import { useState, useEffect } from "react";
import NavbarComponent from "../components/navbar";
import Component from "../components/sidebar";
import ThemeToggle from "../components/Themetoggle";
import Input from "../components/Input";
import LineGraph from "../components/line";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import Splash from "../components/SplashScreen";
import ExampleComponent from "../components/TypeAnimation";
import { TypeAnimation } from 'react-type-animation';
import icon1 from "../assets/graph.png";
import icon2 from "../assets/checklist.png"
import InputFormModal from "../components/InputFormModal";
import IncomeListCard from "../components/IncomeList";

export default function Income(){
  const [showSplash, setShowSplash] = useState(false);
  const [showIncomeList, setShowIncomeList] = useState(false);
  const [incomes, setIncomes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlestart5 = (link) => {
    setShowSplash(true);       
    setTimeout(() => {
      navigate(link);       
    }, 3000);
  };

  const [showModal, setShowModal] = useState(false);

  const handleImageClick = () => {
    setShowModal(true);
  };

  // Fetch incomes from API
  const fetchIncomes = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch('https://trackmyspendapi-3.onrender.com/income/viewincome', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setIncomes(data.incomelist || []);
      } else {
        setError('Failed to fetch incomes');
      }
    } catch (error) {
      setError('Network error while fetching incomes');
    } finally {
      setLoading(false);
    }
  };

  // Calculate income statistics
  const calculateIncomeStats = () => {
    if (!incomes.length) return { total: 0, count: 0, average: 0 };
    
    const total = incomes.reduce((sum, income) => sum + (income.amount || 0), 0);
    const count = incomes.length;
    const average = count > 0 ? total / count : 0;
    
    return { total, count, average };
  };

  useEffect(() => {
    fetchIncomes();
  }, []);

  const incomeStats = calculateIncomeStats();

  if(showSplash) return <Splash/>
  
  return (
   <div className="min-h-screen flex flex-col bg-[#e8e8e8] dark:bg-customDarkBlue text-customIndigoDark font-segoe dark:text-custom1Blue transition-all">
  
  {/* Navbar at top */}
  <NavbarComponent />

  {/* Body: Sidebar + Main content */}
  <div className="flex">
    
    {/* Sidebar */}
    <Component getstarted={handlestart5} />

    {/* Main Content Area */}
    { showIncomeList
  ? (
    // --- IncomeListCard component goes here ---
    <IncomeListCard
      onBack={() => setShowIncomeList(false)}
      incomes={incomes}
      onRefresh={fetchIncomes}
      loading={loading}
    />
  ) :(
    <main className="flex-1 p-6 mb-10  flex justify-center ">
      {/* Your Card */}
      <div className=" flex flex-col mb-10 items-center w-[500px] rounded-xl shadow-md border border-customLavender bg-white dark:bg-customBlack p-6 transition-color">
        <h1 className="text-3xl text-[#333c4d] font-segoe font-bold dark:text-customLavender pb-2">INCOME</h1>
        <p className="font-segoe text-lg text-[#333c4d] dark:text-[#9fb9d0]">
  <TypeAnimation
    sequence={[
      'Did someone gave you money?!  add here...',
      2000,
      'or you got a suprising gift?'
    ]}
    wrapper="span"
    cursor={true}
    repeat={0}
    style={{ fontSize: 'inherit', display: 'inline-block' }}
  />
</p>

<div className=" mt-8 h-px w-full bg-[#8e8e8e] mb-10"></div>

{/* Income Statistics */}
{/* <div className="w-full mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
  <div className="grid grid-cols-3 gap-4 text-center">
    <div>
      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
        ₹{incomeStats.total.toLocaleString()}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">Total Earned</div>
    </div>
    <div>
      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
        {incomeStats.count}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">Transactions</div>
    </div>
    <div>
      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
        ₹{incomeStats.average.toFixed(0)}
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">Average</div>
    </div>
  </div>
</div> */}

<div className="flex justify-center items-center gap-24 mt-20">
  <div className="text-center">
  <img src={icon1} className="w-16 h-16 mx-auto cursor-pointer" onClick={handleImageClick}></img>
    <p className="mt-2 text-sm text-gray-600 dark:text-customLavender">Add Income</p>
    <InputFormModal isOpen={showModal} onClose={() => setShowModal(false)} onSuccess={fetchIncomes} />
  </div>
    <div className="w-px h-32 bg-[#8e8e8e]"></div> 
  <div className="text-center">
  <img src={icon2} className="w-16 h-16 mx-auto cursor-pointer" onClick={()=> setShowIncomeList(true)} ></img>
  <p className="text-sm mt-2 text-gray-600 dark:text-customLavender" >View Incomes</p>
  </div>
</div>
      </div>
    </main>
  )
}
    </div>

    </div>
)
}