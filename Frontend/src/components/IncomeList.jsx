
import axios from "axios"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Search,
  Filter,
  Edit3,
  Trash2,
  ArrowLeft,
  BarChart3,
  Calendar,
  DollarSign,
  Clock,
  Tag,
  User,
  ChevronDown,
  X,
  Loader2,
  IndianRupee
} from "lucide-react"
import Delcomp from "./Deletecomp"
import UpdateFormModal from "./UpdateFormModal"
import Analysis from "./Analysis"

export default function IncomeListCard({ data, onBack }) {
  const [viewanalysis, setViewAnalysis] = useState(false)
  const [incomes, setIncomes] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalIncome, setTotalIncome] = useState(0)
  const [query, setQuery] = useState("")
  const [showFilter, setShowFilter] = useState(false)
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const [day, setDay] = useState("")
  const [selectedIncomeId, setSelectedIncomeId] = useState(null)
  const [showdel, setShowDel] = useState(false)
  const [showupdate, setShowUpdate] = useState(false)
  const [recordToEdit, setRecordToEdit] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const fetchTotal = (params = {}) => {
    const qs = new URLSearchParams(params).toString()
    return axios.get(`https://trackmyspendapi-3.onrender.com/income/totalincome?${qs}`)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const [incomeRes, totalRes] = await Promise.all([
          axios.get("https://trackmyspendapi-3.onrender.com/income/viewincome"),
          fetchTotal(),
        ])
        setIncomes(incomeRes.data.incomelist || [])
        setTotalIncome(Number(totalRes.data.totalIncome))
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (query === "") {
      axios
        .get("https://trackmyspendapi-3.onrender.com/income/viewincome")
        .then((res) => {
          setIncomes(res.data.incomes || res.data.incomelist || [])
          return fetchTotal()
        })
        .then((res) => {
          setTotalIncome(Number(res.data.totalIncome))
        })
        .catch((err) => console.error(err))
    }
  }, [query])

  const handleSearch = () => {
    if (!query.trim()) return

    const params = {}
    if (query) params.category = query

    axios
      .get(`https://trackmyspendapi-3.onrender.com/category/viewincomecategory?category=${query}`)
      .then((res) => {
        setIncomes(res.data.categories || [])
        return fetchTotal(params)
      })
      .then((res2) => {
        setTotalIncome(Number(res2.data.totalIncome))
      })
      .catch((err) => console.error("Search error:", err))
  }

  const applyFilter = () => {
    const params = {}
    if (month) params.month = month
    if (year) params.year = year
    if (day) params.day = day

    const queryString = new URLSearchParams(params).toString()

    axios
      .get(`https://trackmyspendapi-3.onrender.com/category/filter?${queryString}`)
      .then((res) => {
        setIncomes(res.data.filtered || [])
        setShowFilter(false)
        return fetchTotal(params)
      })
      .then((res2) => {
        setTotalIncome(Number(res2.data.totalIncome))
      })
      .catch((err) => console.error("Apply Filter Error:", err))
  }

  const clearFilters = () => {
    setMonth("")
    setYear("")
    setDay("")
    setQuery("")
    setShowFilter(false)
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
      <div className="flex-1 p-4 sm:p-6 w-full flex justify-center items-center min-h-screen">
        <div className="flex items-center gap-2">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Loading income data...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 p-4 sm:p-6 w-full flex justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="w-full max-w-7xl">
        {viewanalysis ? (
          <Analysis onBack1={() => setViewAnalysis(false)} />
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            {/* Header */}
            <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Income Records</h2>
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>
              </div>
            </div>

            {/* Search and Filter Section */}
            <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search Bar */}
                <div className="flex-1 flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Search by category..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    />
                  </div>
                  <button
                    onClick={handleSearch}
                    className="px-4 py-2  rounded-lg dark:bg-customLavender bg-[#8e8e8e] text-white hover:bg-[#737373] hover:dark:bg-[#825ec9] transition-colors flex items-center gap-2"
                  >
                    <Search className="w-4 h-4" />
                    <span className="hidden sm:inline">Search</span>
                  </button>
                </div>

                {/* Filter Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowFilter(!showFilter)}
                    className="flex items-center gap-2 px-4 py-2 dark:bg-customLavender bg-[#8e8e8e] text-white hover:bg-[#737373] hover:dark:bg-[#825ec9] rounded-lg transition-colors"
                  >
                    <Filter className="w-4 h-4" />
                    <span className="hidden sm:inline">Filter</span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showFilter ? "rotate-180" : ""}`} />
                  </button>

                  {/* Filter Dropdown */}
                  <AnimatePresence>
                    {showFilter && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full right-0 mt-2 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 w-80"
                      >
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="font-semibold text-gray-800 dark:text-white">Filter Options</h3>
                          <button
                            onClick={() => setShowFilter(false)}
                            className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Month
                            </label>
                            <select
                              value={month}
                              onChange={(e) => setMonth(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                              <option value="">Select Month</option>
                              {["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"].map((m, i) => (
                                <option key={m} value={m}>
                                  {new Date(0, i).toLocaleString("default", { month: "long" })}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Year
                            </label>
                            <input
                              type="number"
                              placeholder="e.g. 2025"
                              value={year}
                              onChange={(e) => setYear(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                              Day
                            </label>
                            <input
                              type="number"
                              placeholder="e.g. 15"
                              value={day}
                              onChange={(e) => setDay(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                          </div>

                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={applyFilter}
                              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Apply Filter
                            </button>
                            <button
                              onClick={clearFilters}
                              className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6">
              {incomes.length === 0 ? (
                <div className="text-center py-12">
                  <IndianRupee className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 dark:text-gray-400">No income records found</p>
                </div>
              ) : (
                <>
                  {/* Desktop Table */}
                  {!isMobile ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200 dark:border-gray-700">
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                              Sr.No.
                            </th>
                            {["Source", "Amount", "Category", "Date", "Time", "Count"].map((h) => (
                              <th
                                key={h}
                                className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200"
                              >
                                {h}
                              </th>
                            ))}
                            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-200">
                              Actions
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {incomes.map((inc, idx) => (
                            <motion.tr
                              key={inc._id}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                              className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                            >
                              <td className="px-4 py-3 text-sm">{idx + 1}</td>
                              <td className="px-4 py-3 text-sm">{inc.from}</td>
                              <td className="px-4 py-3 text-sm font-semibold text-green-600">
                                {formatCurrency(inc.amount)}
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                                  {inc.category}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm">{inc.date}</td>
                              <td className="px-4 py-3 text-sm">{inc.time || "—"}</td>
                              <td className="px-4 py-3 text-sm">{inc.count}</td>
                              <td className="px-4 py-3">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => {
                                      setShowUpdate(true)
                                      setRecordToEdit(inc)
                                    }}
                                    className="p-1 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition-colors"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => {
                                      setShowDel(true)
                                      setSelectedIncomeId(inc._id)
                                    }}
                                    className="p-1 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    /* Mobile Cards */
                    <div className="space-y-4">
                      {incomes.map((inc, idx) => (
                        <motion.div
                          key={inc._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-gray-500" />
                              <span className="font-semibold text-gray-800 dark:text-white">{inc.from}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  setShowUpdate(true)
                                  setRecordToEdit(inc)
                                }}
                                className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  setShowDel(true)
                                  setSelectedIncomeId(inc._id)
                                }}
                                className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                              <IndianRupee className="w-4 h-4 text-green-600" />
                              <span className="font-semibold text-green-600">{formatCurrency(inc.amount)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Tag className="w-4 h-4 text-blue-600" />
                              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">
                                {inc.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-600 dark:text-gray-300">{inc.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-600 dark:text-gray-300">{inc.time || "—"}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {/* Total Income Section */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center">
                  <div className="inline-flex items-center gap-3 bg-green-50 dark:bg-green-900/20 px-6 py-4 rounded-lg">
                    <IndianRupee className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Total Income</p>
                      <p className="text-2xl sm:text-3xl font-bold text-green-600">{formatCurrency(totalIncome)}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-6">
                  <button
                    onClick={() => setViewAnalysis(true)}
                    className="flex items-center gap-2 px-6 py-3 dark:bg-customLavender bg-[#8e8e8e] text-white hover:bg-[#737373] hover:dark:bg-[#825ec9] transition-colors"
                  >
                    <BarChart3 className="w-5 h-5" />
                    View Analysis
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modals */}
        {showupdate && recordToEdit && (
          <UpdateFormModal
            isOpen={showupdate}
            onClose={() => setShowUpdate(false)}
            initialData={recordToEdit}
            onSave={(updated) => {
              setIncomes((list) => list.map((i) => (i._id === updated._id ? updated : i)))
              setShowUpdate(false)
              fetchTotal()
                .then((res) => setTotalIncome(Number(res.data.totalIncome)))
                .catch((err) => console.error("Error updating total income:", err))
            }}
          />
        )}

        {showdel && (
          <Delcomp
            closeit={() => setShowDel(false)}
            incomeid={selectedIncomeId}
            incomes={incomes}
            setIncomes={setIncomes}
          />
        )}
      </div>
    </div>
  )
}
