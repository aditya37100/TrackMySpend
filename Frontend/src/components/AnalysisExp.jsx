
import { TypeAnimation } from "react-type-animation"
import LineGraph from "./line"
import { useState, useEffect } from "react"
import axios from "axios"
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, Calendar, Clock, BarChart3,IndianRupee } from "lucide-react"
import LineGraphExp from "./linexp"

export default function AnalysisExp({ onBack1 }) {
  const [totals, setTotals] = useState({
    total: 0,
    today: 0,
    yesterday: 0,
    thisMonth: 0,
    lastMonth: 0,
    thisYear: 0,
    lastYear: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const now = new Date()
        const year = now.getFullYear()
        const month = now.getMonth() + 1
        const day = now.getDate()

        const [totalRes, todayRes, yesterdayRes, monthRes, lastMonthRes, yearRes, lastYearRes] = await Promise.all([
          axios.get(`https://trackmyspendapi-3.onrender.com/expense/totalexpense`),
          axios.get(
            `https://trackmyspendapi-3.onrender.com/expense/dailytotalexpense?day=${day}&month=${month}&year=${year}`,
          ),
          axios.get(
            `https://trackmyspendapi-3.onrender.com/expense/dailytotalexpense?day=${day - 1}&month=${month}&year=${year}`,
          ),
          axios.get(`https://trackmyspendapi-3.onrender.com/expense/monthlytotalexpense?month=${month}&year=${year}`),
          axios.get(`https://trackmyspendapi-3.onrender.com/expense/monthlytotalexpense?month=${month - 1}&year=${year}`),
          axios.get(`https://trackmyspendapi-3.onrender.com/expense/yearlytotalexpense?year=${year}`),
          axios.get(`https://trackmyspendapi-3.onrender.com/expense/yearlytotalexpense?year=${year - 1}`),
        ])

        setTotals({
          total: totalRes.data.totalExpense || 0,
          today: todayRes.data.totalDailyExpense || 0,
          yesterday: yesterdayRes.data.totalDailyExpense || 0,
          thisMonth: monthRes.data.totalMonthlyExpense || 0,
          lastMonth: lastMonthRes.data.totalMonthlyExpense || 0,
          thisYear: yearRes.data.totalYearlyExpense || 0,
          lastYear: lastYearRes.data.totalYearlyExpense || 0,
        })
      } catch (err) {
        console.error("Error fetching expense data:", err)
        setError("Failed to load expense data. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const percentChange = (current, previous) => {
    if (previous === 0) return current === 0 ? 0 : 100
    return (((current - previous) / previous) * 100).toFixed(1)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <button
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 dark:bg-purple-600 text-white rounded-lg hover:bg-gray-700 hover:dark:bg-purple-700 transition-colors duration-200"
            onClick={onBack1}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-2">ANALYSIS</h1>
            <div className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
              <TypeAnimation
                sequence={[
                  "Analyze and manage your expense...",
                  1000,
                  "Track expenses and plan budgets...",
                  1000,
                  "Stay financially smart with insights.",
                  1000,
                ]}
                wrapper="p"
                repeat={0}
              />
            </div>
          </div>
          <div className="w-20 sm:w-auto"></div> {/* Spacer for alignment */}
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-300 dark:bg-gray-700 mb-8"></div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <StatsCard
            title="Total Expense"
            amount={totals.total}
            icon={<IndianRupee className="w-6 h-6" />}
            description="Your total expense"
            formatCurrency={formatCurrency}
          />

          <StatsCard
            title="Today's Expense"
            amount={totals.today}
            icon={<Clock className="w-6 h-6" />}
            description={
              <PercentageChange
                current={totals.today}
                previous={totals.yesterday}
                percentChange={percentChange}
                period="than yesterday"
              />
            }
            formatCurrency={formatCurrency}
          />

          <StatsCard
            title="Month's Expense"
            amount={totals.thisMonth}
            icon={<Calendar className="w-6 h-6" />}
            description={
              <PercentageChange
                current={totals.thisMonth}
                previous={totals.lastMonth}
                percentChange={percentChange}
                period="than last month"
              />
            }
            formatCurrency={formatCurrency}
          />

          <StatsCard
            title="Yearly Expense"
            amount={totals.thisYear}
            icon={<BarChart3 className="w-6 h-6" />}
            description={
              <PercentageChange
                current={totals.thisYear}
                previous={totals.lastYear}
                percentChange={percentChange}
                period="than last year"
              />
            }
            formatCurrency={formatCurrency}
          />
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-300 dark:bg-gray-700 mb-8"></div>

        {/* Chart Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">Expense Trends</h2>
            <p className="text-gray-600 dark:text-gray-300">Visual representation of your expenditure over time</p>
          </div>
          <div className="w-full h-64 sm:h-80 lg:h-96">
            <LineGraphExp />
          </div>
        </div>
      </div>
    </div>
  )
}

function StatsCard({ title, amount, icon, description, formatCurrency }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <div className="text-blue-600 dark:text-blue-400">{icon}</div>
        </div>
      </div>

      <h3 className="text-sm sm:text-base font-semibold text-gray-600 dark:text-gray-300 mb-1">{title}</h3>

      <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{formatCurrency(amount)}</p>

      <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{description}</div>
    </div>
  )
}

function PercentageChange({ current, previous, percentChange, period }) {
  const change = percentChange(current, previous)
  const isPositive = change >= 0

  return (
    <span className="flex items-center gap-1">
      {isPositive ? (
        <TrendingUp className="w-3 h-3 text-green-500" />
      ) : (
        <TrendingDown className="w-3 h-3 text-red-500" />
      )}
      <span className={isPositive ? "text-green-500" : "text-red-500"}>{Math.abs(change)}%</span>
      <span className="text-gray-500">
        {isPositive ? "more" : "less"} {period}
      </span>
    </span>
  )
}
