"use client"

import { Pie } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { useEffect, useState } from "react"
import axios from "axios"
import { motion } from "framer-motion"

ChartJS.register(ArcElement, Tooltip, Legend)

const customColors = {
  grayText: "#6b7280",
  darkGrayText: "#9ca3af",
  whiteText: "#ffffff",
  border: "#374151",
  slices: [
    "#3b82f6", // blue
    "#ef4444", // red
    "#10b981", // green
    "#f59e0b", // yellow
    "#8b5cf6", // purple
    "#06b6d4", // cyan
    "#f97316", // orange
    "#84cc16", // lime
    "#ec4899", // pink
  ],
}

export function PieChartForRep({ month, year, week }) {
  const [chartData, setChartData] = useState(null)
  const [options, setOptions] = useState(null)
  const [loading, setLoading] = useState(true)

  // Determine report type
  let reportType = "total"
  if (month) reportType = "monthly"
  else if (year && week) reportType = "weekly"
  else if (year) reportType = "yearly"

  useEffect(() => {
    let url = ""
    setLoading(true)

    if (reportType === "monthly") {
      const [y, m] = month.split("-")
      url = `https://trackmyspendapi-3.onrender.com/category/by-category?year=${y}&month=${m}`
    } else if (reportType === "weekly") {
      url = `https://trackmyspendapi-3.onrender.com/category/by-category?year=${year}&week=${week}`
    } else if (reportType === "yearly") {
      url = `https://trackmyspendapi-3.onrender.com/category/by-category?year=${year}`
    } else {
      // total
      url = `https://trackmyspendapi-3.onrender.com/category/by-category`
    }

    axios
      .get(url)
      .then(({ data }) => {
        const { categories, totals } = data

        setChartData({
          labels: categories,
          datasets: [
            {
              data: totals,
              backgroundColor: customColors.slices,
              borderColor: "#ffffff",
              borderWidth: 3,
              hoverOffset: 15,
              hoverBorderWidth: 4,
            },
          ],
        })
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching categories:", err)
        setLoading(false)
      })
  }, [month, year, week, reportType])

  useEffect(() => {
    setOptions({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "right",
          labels: {
            color: customColors.grayText,
            font: {
              size: 12,
              weight: "500",
            },
            padding: 15,
            usePointStyle: true,
            pointStyle: "circle",
            generateLabels: (chart) => {
              const data = chart.data
              if (data.labels.length && data.datasets.length) {
                const dataset = data.datasets[0]
                const total = dataset.data.reduce((sum, value) => sum + value, 0)

                return data.labels.map((label, i) => {
                  const value = dataset.data[i]
                  const percentage = ((value / total) * 100).toFixed(1)

                  return {
                    text: `${label} (${percentage}%)`,
                    fillStyle: dataset.backgroundColor[i],
                    strokeStyle: dataset.borderColor,
                    lineWidth: dataset.borderWidth,
                    hidden: false,
                    index: i,
                  }
                })
              }
              return []
            },
          },
        },
        tooltip: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleColor: customColors.whiteText,
          bodyColor: customColors.whiteText,
          borderColor: "rgba(255, 255, 255, 0.1)",
          borderWidth: 1,
          cornerRadius: 8,
          padding: 12,
          callbacks: {
            label: (context) => {
              const total = context.dataset.data.reduce((sum, value) => sum + value, 0)
              const percentage = ((context.parsed / total) * 100).toFixed(1)
              return `${context.label}: ₹${context.parsed.toLocaleString()} (${percentage}%)`
            },
          },
        },
      },
      layout: {
        padding: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
        },
      },
    })
  }, [reportType])

  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full h-full flex items-center justify-center"
      >
        <div className="flex flex-col items-center space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-customBlue border-t-transparent"></div>
          <p className="text-sm text-customIndigoDark/70 dark:text-custom1Blue/70">Loading category data...</p>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full h-full bg-white dark:bg-customBlack rounded-2xl p-6 shadow-lg border border-customLavender dark:border-custom1Blue"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-customIndigoDark dark:text-custom1Blue mb-2">
          Expense Categories
        </h3>
        <p className="text-sm text-customIndigoDark/70 dark:text-custom1Blue/70">
          Breakdown of your spending by category
        </p>
      </div>
      
      {chartData && options ? (
        <div className="h-[300px]">
          <Pie data={chartData} options={options} />
        </div>
      ) : (
        <div className="w-full h-[300px] flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-customLightGray dark:bg-customDarkBlue rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-customIndigoDark/50 dark:text-custom1Blue/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <p className="text-sm text-customIndigoDark/70 dark:text-custom1Blue/70">No category data available</p>
          </div>
        </div>
      )}
    </motion.div>
  )
}
