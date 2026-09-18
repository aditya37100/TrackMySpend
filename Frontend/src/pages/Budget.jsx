"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { PiggyBank, Wallet, Edit, Check } from "lucide-react"
import NavbarComponent from "../components/navbar"
import Component from "../components/sidebar"
import PercentageSlider from "../components/Slider"
import Splash from "../components/SplashScreen"
import { TypeAnimation } from "react-type-animation"
import { useNavigate } from "react-router-dom"
import ProgressBar from "../components/ProgressBar"

export default function Budget() {
  const [showSplash, setShowSplash] = useState(false)
  const [totalIncome, setTotalIncome] = useState(null)
  const [value, setValue] = useState(() => {
    // Read from localStorage on mount
    const stored = localStorage.getItem("trackmyspend-budget-allocation");
    return stored !== null ? Number(stored) : 50;
  }); // slider %
  const [collapsed, setCollapsed] = useState(true) // collapsed?

  const navigate = useNavigate()

  const handlestart5 = (link) => {
    setShowSplash(true)
    setTimeout(() => navigate(link), 3000)
  }

  useEffect(() => {
    axios
      .get("https://trackmyspendapi-3.onrender.com/income/monthlytotalincome")
      .then((res) => setTotalIncome(res.data.totalMonthlyIncome))
      .catch((err) => console.error(err))
  }, [])

  // calculate the ₹ amount of the chosen %
  const budgetAmount = totalIncome !== null ? Math.round((value / 100) * totalIncome) : 0

  if (showSplash) return <Splash />

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 dark:from-customDarkBlue dark:to-slate-900 text-customIndigoDark font-segoe dark:text-custom1Blue transition-all duration-300">
      <NavbarComponent />

      <div className="flex flex-1">
        <Component getstarted={handlestart5} />

        <main className="flex-1 p-4 md:p-8 flex items-start justify-center">
          <div className="w-full max-w-4xl">
            {/* Main Card Container */}
            <div className="bg-white dark:bg-customBlack rounded-2xl shadow-2xl border border-gray-200 dark:border-customLavender/20 overflow-hidden backdrop-blur-sm">
              {/* Header Section */}
              <div className="bg-[#8e8e8e] dark:from-customLavender dark:to-purple-700 p-8 text-white">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center gap-3">
                    <PiggyBank className="w-10 h-10" />
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">BUDGET TRACKER</h1>
                  </div>

                  <div className="max-w-2xl">
                    <TypeAnimation
                      sequence={[
                        "Planning your finances? Set your budget here...",
                        2000,
                        "Keep your spending in check — budget it smartly!",
                        2000,
                        "Stay ahead — define your limits and save more.",
                        2000,
                      ]}
                      wrapper="p"
                      cursor={true}
                      repeat={Number.POSITIVE_INFINITY}
                      className="text-lg md:text-xl text-blue-100 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-12">
                <div className="transition-all duration-700 ease-in-out">
                  {!collapsed ? (
                    /* Budget Setting Mode */
                    <div className="space-y-8 animate-fade-in">
                      <div className="text-center space-y-4">
                        <div className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 px-4 py-2 rounded-full">
                          <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                          <h2 className="text-2xl font-bold text-blue-800 dark:text-blue-300">Set Your Budget Cap</h2>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-lg">
                          Choose the percentage of your income to allocate for expenses
                        </p>
                      </div>

                      {/* Total Income Display */}
                      {totalIncome !== null && (
                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border border-green-200 dark:border-green-800 transform transition-all duration-300 hover:scale-[1.02]">
                          <div className="text-center">
                            <p className="text-sm text-green-700 dark:text-green-400 font-medium mb-2">
                              TOTAL MONTHLY INCOME
                            </p>
                            <p className="text-3xl font-bold text-green-800 dark:text-green-300">
                              ₹{totalIncome?.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Slider Section */}
                      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8 space-y-6">
                        <div className="text-center">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                            Budget Percentage
                          </h3>
                          <div className="inline-flex items-center bg-white dark:bg-gray-700 px-4 py-2 rounded-lg shadow-sm">
                            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">{value}%</span>
                          </div>
                        </div>

                        <PercentageSlider value={value} setValue={setValue} />

                        {/* Budget Amount Preview */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                          <div className="text-center">
                            <p className="text-sm text-blue-700 dark:text-blue-400 font-medium mb-2">
                              YOUR BUDGET AMOUNT
                            </p>
                            <p className="text-3xl font-bold text-blue-800 dark:text-blue-300">
                              ₹{budgetAmount.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Set Button */}
                      <div className="flex justify-center pt-4">
                        <button
                          onClick={() => {
                            localStorage.setItem("trackmyspend-budget-allocation", value);
                            setCollapsed(true);
                          }}
                          className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 flex items-center gap-3"
                        >
                          <Check className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                          Set Budget
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Budget Display Mode */
                    <div className="space-y-8 animate-fade-in">
                      {/* Budget Summary Cards */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Percentage Card */}
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800 transform transition-all duration-300 hover:scale-105">
                          <div className="text-center">
                            <p className="text-sm text-blue-700 dark:text-blue-400 font-medium mb-2">ALLOCATION</p>
                            <p className="text-4xl font-bold text-blue-800 dark:text-blue-300">{value}%</p>
                          </div>
                        </div>

                        {/* Budget Amount Card */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20 rounded-xl p-6 border border-green-200 dark:border-green-800 transform transition-all duration-300 hover:scale-105">
                          <div className="text-center">
                            <p className="text-sm text-green-700 dark:text-green-400 font-medium mb-2">BUDGET CAP</p>
                            <p className="text-3xl font-bold text-green-800 dark:text-green-300">
                              ₹{budgetAmount.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {/* Total Income Card */}
                        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 transform transition-all duration-300 hover:scale-105">
                          <div className="text-center">
                            <p className="text-sm text-purple-700 dark:text-purple-400 font-medium mb-2">
                              TOTAL INCOME
                            </p>
                            <p className="text-3xl font-bold text-purple-800 dark:text-purple-300">
                              ₹{totalIncome?.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Edit Button */}
                      <div className="flex justify-center">
                        <button
                          onClick={() => setCollapsed(false)}
                          className="group bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center gap-2"
                        >
                          <Edit className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                          Edit Budget
                        </button>
                      </div>

                      {/* Divider */}
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-4 bg-white dark:bg-customBlack text-gray-500 dark:text-gray-400 font-medium">
                            Progress Tracking
                          </span>
                        </div>
                      </div>

                      {/* Progress Section */}
                      <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 rounded-xl p-8 space-y-6">
                        <div className="text-center">
                          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
                            Your Progress Dashboard
                          </h2>
                          <p className="text-gray-600 dark:text-gray-400">
                            Track your spending against your budget cap
                          </p>
                        </div>

                        <div className="transform transition-all duration-500 hover:scale-[1.02]">
                          <ProgressBar capAmount={budgetAmount} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
