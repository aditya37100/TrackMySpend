"use client";

import { TypeAnimation } from "react-type-animation";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Clock,
  Calendar,
  BarChart3,
} from "lucide-react";
import { Line } from "react-chartjs-2";
import { PieChartForRep } from "./Piechart";
import html2pdf from "html2pdf.js";
import LineGraphForRep from "./lineforRep";

const customColors = {
  income: "#10b981",
  expense: "#ef4444",
  incomeGradient: "rgba(16, 185, 129, 0.1)",
  expenseGradient: "rgba(239, 68, 68, 0.1)",
  grayText: "#6b7280",
  whiteText: "#ffffff",
};

export default function AnalysisForRep({ onBack1, month, year, week }) {
  const [totals, setTotals] = useState({ income: 0, expense: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [weeklyChartData, setWeeklyChartData] = useState(null);
  const [weeklyChartOptions, setWeeklyChartOptions] = useState(null);
  const reportRef = useRef();

  let reportType = "total";
if (year && month && week) reportType = "weekly";
else if (month) reportType = "monthly";
else if (year) reportType = "yearly";

  // Heading
  let heading = "TOTAL REPORT";
  if (reportType === "monthly") heading = `MONTHLY REPORT (${month})`;
  else if (reportType === "weekly") heading = `WEEKLY REPORT (Year: ${year}, Month: ${month}, Week: ${week})`;
  else if (reportType === "yearly") heading = `YEARLY REPORT (${year})`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let incomeRes, expenseRes;
        if (reportType === "monthly") {
          incomeRes = await axios.get(
            `https://trackmyspendapi-3.onrender.com/income/monthlytotalincome?month=${month.split("-")[1]}&year=${month.split("-")[0]}`
          );
          expenseRes = await axios.get(
            `https://trackmyspendapi-3.onrender.com/expense/monthlytotalexpense?month=${month.split("-")[1]}&year=${month.split("-")[0]}`
          );
          setTotals({
            income: incomeRes.data.totalMonthlyIncome || 0,
            expense: expenseRes.data.totalmonthlyExpense || 0,
          });
        } else if (reportType === "weekly") {
          // Fetch daily income/expense for the week
          const incomeUrl = `https://trackmyspendapi-3.onrender.com/income/eachdayincome?year=${year}&month=${month}&week=${week}`;
          const expenseUrl = `https://trackmyspendapi-3.onrender.com/expense/eachdayexpense?year=${year}&month=${month}&week=${week}`;
          const [incRes, expRes] = await Promise.all([
            axios.get(incomeUrl),
            axios.get(expenseUrl),
          ]);
          // Sum totals for the week
          const incomeTotal = (incRes.data.totals || []).reduce((a, b) => a + b, 0);
          const expenseTotal = (expRes.data.totals || []).reduce((a, b) => a + b, 0);
          setTotals({ income: incomeTotal, expense: expenseTotal });
          // Prepare chart data for daily income/expense
          setWeeklyChartData({
            labels: incRes.data.days || [],
            datasets: [
              {
                label: "Daily Income",
                data: incRes.data.totals || [],
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
                label: "Daily Expense",
                data: expRes.data.totals || [],
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
          });
          setWeeklyChartOptions({
            responsive: true,
            maintainAspectRatio: false,
            interaction: { mode: "index", intersect: false },
            plugins: {
              legend: {
                position: "top",
                labels: {
                  color: customColors.grayText,
                  font: { size: 12, weight: "500" },
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
                  font: { size: 11, weight: "500" },
                },
                grid: {
                  color: customColors.grayText + '22',
                  drawBorder: false,
                  lineWidth: 1,
                },
                title: {
                  display: true,
                  text: "Day",
                  color: customColors.grayText,
                  font: { size: 12, weight: "600" },
                },
              },
              y: {
                ticks: {
                  color: customColors.grayText,
                  font: { size: 11, weight: "500" },
                  callback: (value) => "₹" + value.toLocaleString(),
                },
                grid: {
                  color: customColors.grayText + '22',
                  lineWidth: 1,
                },
                title: {
                  display: true,
                  text: "Amount (₹)",
                  color: customColors.grayText,
                  font: { size: 12, weight: "600" },
                },
              },
            },
            elements: {
              point: { hoverRadius: 8, hitRadius: 12 },
              line: { borderWidth: 3 },
            },
          });
        } else if (reportType === "yearly") {
          incomeRes = await axios.get(
            `https://trackmyspendapi-3.onrender.com/income/yearlytotalincome?year=${year}`
          );
          expenseRes = await axios.get(
            `https://trackmyspendapi-3.onrender.com/expense/yearlytotalexpense?year=${year}`
          );
          setTotals({
            income: incomeRes.data.totalYearlyIncome || 0,
            expense: expenseRes.data.totalYearlyExpense || 0,
          });
        } else {
          // total
          incomeRes = await axios.get(
            `https://trackmyspendapi-3.onrender.com/income/totalincome`
          );
          expenseRes = await axios.get(
            `https://trackmyspendapi-3.onrender.com/expense/totalexpense`
          );
          setTotals({
            income: incomeRes.data.totalIncome || 0,
            expense: expenseRes.data.totalExpense || 0,
          });
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    if (reportType === "monthly" && month) fetchData();
    else if (reportType === "weekly" && year && month && week) fetchData();
    else if (reportType === "yearly" && year) fetchData();
    else if (reportType === "total") fetchData();
  }, [month, year, week, reportType]);

  const handleDownload = () => {
    const element = reportRef.current;
    const width = element.offsetWidth;
    const height = element.offsetHeight;
    const opt = {
      margin: 0,
      filename: `Report_${heading.replace(/\s+/g, "_")}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "px", format: [width, height], orientation: "portrait" },
    };
    html2pdf().set(opt).from(element).save();
  };

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
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
    );
  }

  const balance = totals.income - totals.expense;

  // Pass the correct prop to the charts
  let chartProp = undefined;
  if (reportType === "monthly") chartProp = month;
  else if (reportType === "weekly") chartProp = { year, month, week };
  else if (reportType === "yearly") chartProp = year;
  // For total, pass nothing

  return (
    <div
      ref={reportRef}
      className="min-h-screen w-full bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 lg:p-8"
    >
      <div className="w-full max-w-none">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex-1 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-white mb-2">
              {heading}
            </h1>
            <div className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
              <TypeAnimation
                sequence={[
                  "Analyze and manage your income...",
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
        </div>

        <div className="h-px bg-gray-300 dark:bg-gray-700 mb-8"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <StatsCard
            title="Total Income"
            amount={totals.income}
            icon={<Clock className="w-6 h-6" />}
            formatCurrency={formatCurrency}
          />
          <StatsCard
            title="Total Expense"
            amount={totals.expense}
            icon={<Calendar className="w-6 h-6" />}
            formatCurrency={formatCurrency}
          />
          <StatsCard
            title="Balance"
            amount={balance}
            icon={<BarChart3 className="w-6 h-6" />}
            formatCurrency={formatCurrency}
          />
        </div>

        <div className="h-px bg-gray-300 dark:bg-gray-700 mb-8"></div>

        {/* Chart Section */}
        {reportType === "weekly" && weeklyChartData && weeklyChartOptions ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">Daily Income & Expense (This Week)</h2>
            <div className="w-full h-[400px]">
              <Line data={weeklyChartData} options={weeklyChartOptions} />
            </div>
          </div>
        ) : reportType !== "weekly" ? (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">Income Trends</h2>
            <div className="w-full h-[400px]">
              {/* Use the existing LineGraphForRep for other types */}
              { <LineGraphForRep {...(reportType === "monthly" ? { month } : reportType === "yearly" ? { year } : {})} /> }
            </div>
          </div>
        ) : null}

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">Expense by Category</h2>
          <div className="w-full h-[400px]">
            <PieChartForRep {...(reportType === "monthly" ? { month } : reportType === "weekly" ? { year, month, week } : reportType === "yearly" ? { year } : {})} />
          </div>
        </div>

        <div className="flex justify-start items-center mt-6">
          <button
            onClick={handleDownload}
            className="dark:bg-customLavender bg-[#8e8e8e] text-white px-4 py-2 rounded hover:bg-[#737373] hover:dark:bg-[#825ec9]"
          >
            Download As PDF
          </button>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, amount, icon, formatCurrency }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-3">
        <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
          <div className="text-blue-600 dark:text-blue-400">{icon}</div>
        </div>
      </div>
      <h3 className="text-sm sm:text-base font-semibold text-gray-600 dark:text-gray-300 mb-1">{title}</h3>
      <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{formatCurrency(amount)}</p>
    </div>
  );
}
