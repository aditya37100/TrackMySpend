"use client"

import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"
import { useEffect, useState } from "react"
import axios from "axios"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

const customColors = {
  income: "#10b981",
  expense: "#ef4444",
  incomeGradient: "rgba(16, 185, 129, 0.1)",
  expenseGradient: "rgba(239, 68, 68, 0.1)",
  grayText: "#6b7280",
  darkGrayText: "#9ca3af",
  whiteText: "#ffffff",
  border: "#374151",
  gridColor: "rgba(107, 114, 128, 0.1)",
  darkGridColor: "rgba(156, 163, 175, 0.1)",
}

export default function LineGraphForRep({ month, year, week }) {
  const [chartData, setChartData] = useState(null)
  const [options, setOptions] = useState(null)
  const [loading, setLoading] = useState(true)

  // Determine report type
  let reportType = "total"
  if (month) reportType = "monthly"
  else if (year && week) reportType = "weekly"
  else if (year) reportType = "yearly"

  useEffect(() => {
    let incomeUrl = ""
    let expenseUrl = ""
    let labelsKey = ""
    let incomeLabel = ""
    let expenseLabel = ""
    setLoading(true)

    if (reportType === "monthly") {
      const [y, m] = month.split("-")
      incomeUrl = `https://trackmyspendapi-3.onrender.com/income/eachweekincome?year=${y}&month=${m}`
      expenseUrl = `https://trackmyspendapi-3.onrender.com/expense/eachweekexpense?year=${y}&month=${m}`
      labelsKey = "weeks"
      incomeLabel = "Weekly Income"
      expenseLabel = "Weekly Expense"
    } else if (reportType === "weekly") {
      incomeUrl = `https://trackmyspendapi-3.onrender.com/income/eachdayincome?year=${year}&week=${week}`
      expenseUrl = `https://trackmyspendapi-3.onrender.com/expense/eachdayexpense?year=${year}&week=${week}`
      labelsKey = "days"
      incomeLabel = "Daily Income"
      expenseLabel = "Daily Expense"
    } else if (reportType === "yearly") {
      incomeUrl = `https://trackmyspendapi-3.onrender.com/income/eachmonthincome?year=${year}`
      expenseUrl = `https://trackmyspendapi-3.onrender.com/expense/eachmonthexpense?year=${year}`
      labelsKey = "months"
      incomeLabel = "Monthly Income"
      expenseLabel = "Monthly Expense"
    } else {
      // total
      incomeUrl = `https://trackmyspendapi-3.onrender.com/income/eachyearincome`
      expenseUrl = `https://trackmyspendapi-3.onrender.com/expense/eachyearexpense`
      labelsKey = "years"
      incomeLabel = "Yearly Income"
      expenseLabel = "Yearly Expense"
    }

    axios
      .all([axios.get(incomeUrl), axios.get(expenseUrl)])
      .then(
        axios.spread((incRes, expRes) => {
          const rawInc = incRes.data
          const rawExp = expRes.data
          let labels = rawInc[labelsKey]
          if (!labels && rawInc.labels) labels = rawInc.labels;
          if (!labels && reportType === "yearly") labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
          if (!labels && reportType === "monthly") labels = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"];
          if (!labels && reportType === "weekly") labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
          // Debug log for all
          let incTotals = Array.isArray(rawInc.totals) ? rawInc.totals : [];
          let expTotals = Array.isArray(rawExp.totals) ? rawExp.totals : [];
          // Pad or trim to match labels length
          if (labels && Array.isArray(labels)) {
            if (incTotals.length < labels.length) incTotals = [...incTotals, ...Array(labels.length - incTotals.length).fill(0)];
            if (incTotals.length > labels.length) incTotals = incTotals.slice(0, labels.length);
            if (expTotals.length < labels.length) expTotals = [...expTotals, ...Array(labels.length - expTotals.length).fill(0)];
            if (expTotals.length > labels.length) expTotals = expTotals.slice(0, labels.length);
          }
          if (labels && (labels.length !== incTotals.length || labels.length !== expTotals.length)) {
            console.warn("LineGraphForRep: Mismatch between labels and data", { labels, incTotals, expTotals });
          }
          console.log("LineGraphForRep API response:", { reportType, rawInc, rawExp, labels, incTotals, expTotals });
          setChartData({
            labels,
            datasets: [
              {
                label: incomeLabel,
                data: incTotals,
                borderColor: customColors.income,
                backgroundColor: customColors.incomeGradient,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointBackgroundColor: customColors.income,
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
                borderWidth: 3,
              },
              {
                label: expenseLabel,
                data: expTotals,
                borderColor: customColors.expense,
                backgroundColor: customColors.expenseGradient,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 8,
                pointBackgroundColor: customColors.expense,
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
                borderWidth: 3,
              },
            ],
          })
          setLoading(false)
        }),
      )
      .catch((err) => {
        console.error("Error fetching chart data:", err)
        setLoading(false)
      })
  }, [month, year, week, reportType])

  useEffect(() => {
    setOptions({
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: "index",
        intersect: false,
      },
      plugins: {
        legend: {
          position: "top",
          labels: {
            color: customColors.grayText,
            font: {
              size: 12,
              weight: "500",
            },
            padding: 20,
            usePointStyle: true,
            pointStyle: "circle",
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
          displayColors: true,
          callbacks: {
            label: (context) => `${context.dataset.label}: ₹${context.parsed.y.toLocaleString()}`,
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: customColors.grayText,
            font: {
              size: 11,
              weight: "500",
            },
          },
          grid: {
            color: customColors.gridColor,
            drawBorder: false,
            lineWidth: 1,
          },
          title: {
            display: true,
            text:
              reportType === "monthly"
                ? "Week"
                : reportType === "weekly"
                ? "Day"
                : reportType === "yearly"
                ? "Month"
                : "Year",
            color: customColors.grayText,
            font: {
              size: 12,
              weight: "600",
            },
          },
        },
        y: {
          ticks: {
            color: customColors.grayText,
            font: {
              size: 11,
              weight: "500",
            },
            callback: (value) => "₹" + value.toLocaleString(),
          },
          grid: {
            color: customColors.gridColor,
            lineWidth: 1,
          },
          title: {
            display: true,
            text: "Amount (₹)",
            color: customColors.grayText,
            font: {
              size: 12,
              weight: "600",
            },
          },
        },
      },
      elements: {
        point: {
          hoverRadius: 8,
          hitRadius: 12,
        },
        line: {
          borderWidth: 3,
        },
      },
    })
  }, [reportType])

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="flex flex-col items-center space-y-3">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Loading chart data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full">
      {chartData && options && chartData.labels && chartData.labels.length > 0 && chartData.datasets && chartData.datasets[0].data.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : loading ? null : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">No data available for this period.</p>
        </div>
      )}
    </div>
  )
}
