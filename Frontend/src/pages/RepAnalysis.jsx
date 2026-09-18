import Analysis from "../components/Analysis";
import { useState, useEffect } from "react";
import NavbarComponent from "../components/navbar";
import Component from "../components/sidebar";
import ThemeToggle from "../components/Themetoggle";
import Input from "../components/Input";
import LineGraph from "../components/line";
import { Button } from "../components/Button";
import { useLocation, useNavigate } from "react-router-dom";
import Splash from "../components/SplashScreen";
import ExampleComponent from "../components/TypeAnimation";
import { TypeAnimation } from 'react-type-animation';
import icon1 from "../assets/graph.png";
import icon2 from "../assets/checklist.png"
import InputFormModal from "../components/InputFormModal";
import IncomeListCard from "../components/IncomeList";
import AnalysisForRep from "../components/AnalysisforRep";

export default function RepAnalysis(){
const location = useLocation();
  const { month, year, week } = location.state || {};

  return (
   <div className="min-h-screen flex flex-col bg-[#e8e8e8] dark:bg-customDarkBlue text-customIndigoDark font-segoe dark:text-custom1Blue transition-all">
  
  {/* Navbar at top */}
  <NavbarComponent />

  {/* Body: Sidebar + Main content */}
  <div className="flex">
    
    {/* Sidebar */}
<Component/>

      <div className=" p-4 sm:p-6 w-full  min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-7xl"></div>
      <AnalysisForRep month={month} year={year} week={week}/>
      </div>

      </div>
      </div>
  )
}