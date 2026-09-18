// App.jsx
import { useState, useEffect } from "react";
import NavbarComponent from "../components/navbar";
import Component from "../components/sidebar";
import ThemeToggle from "../components/Themetoggle";
import Input from "../components/Input";
import LineGraph from "../components/line";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom";
import Splash from "../components/SplashScreen";
import { motion } from "framer-motion";
import axios from "axios";
import {
  HiChartBar,
  HiCreditCard,
  HiTrendingUp,
  HiBell,
  HiDocumentReport,
  HiArrowRight,
  HiCheckCircle,
  HiStar,
  HiUser,
  HiCalendar,
  HiCurrencyDollar
} from "react-icons/hi";

function Dashboard() {
  const [showSplash, setShowSplash] = useState(false);
  const [username, setUsername] = useState("User"); // Will be implemented later
  const [incomeTotals, setIncomeTotals] = useState(null);
  const [expenseTotals, setExpenseTotals] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentTransactions, setRecentTransactions] = useState([]);

  const navigate = useNavigate();

  const handlestart5 = (link) => {
    setShowSplash(true);
    setTimeout(() => {
      navigate(link);
    }, 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();

        // Fetch income totals
        const incomeReqs = [
          axios.get(`https://trackmyspendapi-3.onrender.com/income/totalincome`),
          axios.get(`https://trackmyspendapi-3.onrender.com/income/dailytotalincome?day=${day}&month=${month}&year=${year}`),
          axios.get(`https://trackmyspendapi-3.onrender.com/income/monthlytotalincome?month=${month}&year=${year}`),
        ];
        // Fetch expense totals
        const expenseReqs = [
          axios.get(`https://trackmyspendapi-3.onrender.com/expense/totalexpense`),
          axios.get(`https://trackmyspendapi-3.onrender.com/expense/dailytotalexpense?day=${day}&month=${month}&year=${year}`),
          axios.get(`https://trackmyspendapi-3.onrender.com/expense/monthlytotalexpense?month=${month}&year=${year}`),
        ];
        // Fetch recent income and expense transactions
        const txReqs = [
          axios.get("https://trackmyspendapi-3.onrender.com/income/viewincome"),
          axios.get("https://trackmyspendapi-3.onrender.com/expense/viewexpense"),
        ];

        const [incomeRes, incomeTodayRes, incomeMonthRes] = await Promise.all(incomeReqs);
        const [expenseRes, expenseTodayRes, expenseMonthRes] = await Promise.all(expenseReqs);
        const [incomeTxRes, expenseTxRes] = await Promise.all(txReqs);

        setIncomeTotals({
          total: incomeRes.data.totalIncome || 0,
          today: incomeTodayRes.data.totalDailyIncome || 0,
          thisMonth: incomeMonthRes.data.totalMonthlyIncome || 0,
        });
        setExpenseTotals({
          total: expenseRes.data.totalExpense || 0,
          today: expenseTodayRes.data.totalDailyExpense || 0,
          thisMonth: expenseMonthRes.data.totalMonthlyExpense || 0,
        });

        // Combine and sort recent transactions
        const incomeTxs = (incomeTxRes.data.incomelist || []).map(tx => ({
          ...tx,
          type: "income"
        }));
        const expenseTxs = (expenseTxRes.data.expenselist || []).map(tx => ({
          ...tx,
          type: "expense"
        }));
        // Parse date and time for sorting
        const parseDateTime = (tx) => {
          // tx.date: YYYY-MM-DD, tx.time: HH:mm or undefined
          if (!tx.date) return 0;
          const dateStr = tx.date + (tx.time ? `T${tx.time}` : "T00:00");
          return new Date(dateStr).getTime();
        };
        const allTxs = [...incomeTxs, ...expenseTxs].sort((a, b) => parseDateTime(b) - parseDateTime(a));
        setRecentTransactions(allTxs.slice(0, 5)); // Show latest 5
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (showSplash) return <Splash />;

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Prepare quick stats
  const quickStats = [
    {
      title: "Total Income",
      value: incomeTotals ? formatCurrency(incomeTotals.total) : "-",
      change: incomeTotals ? `+${formatCurrency(incomeTotals.today)}` : "-",
      icon: HiTrendingUp,
      color: "bg-customTealLight"
    },
    {
      title: "Total Expenses",
      value: expenseTotals ? formatCurrency(expenseTotals.total) : "-",
      change: expenseTotals ? `-${formatCurrency(expenseTotals.today)}` : "-",
      icon: HiCreditCard,
      color: "bg-customOrange"
    },
    {
      title: "Savings",
      value: incomeTotals && expenseTotals ? formatCurrency(incomeTotals.total - expenseTotals.total) : "-",
      change: incomeTotals && expenseTotals ? `${incomeTotals.total - expenseTotals.total >= 0 ? "+" : "-"}${formatCurrency(Math.abs((incomeTotals.today || 0) - (expenseTotals.today || 0)))}` : "-",
      icon: HiCurrencyDollar,
      color: "bg-customBlue"
    },
    {
      title: "Monthly Balance",
      value: incomeTotals && expenseTotals ? formatCurrency(incomeTotals.thisMonth - expenseTotals.thisMonth) : "-",
      change: incomeTotals && expenseTotals ? `${incomeTotals.thisMonth - expenseTotals.thisMonth >= 0 ? "+" : "-"}${formatCurrency(Math.abs((incomeTotals.thisMonth || 0) - (expenseTotals.thisMonth || 0)))}` : "-",
      icon: HiCheckCircle,
      color: "bg-customLavender"
    }
  ];

  return (
    <div className="min-h-screen bg-customLightGray dark:bg-customDarkBlue text-customIndigoDark font-segoe dark:text-custom1Blue transition-all">
      {/* Navbar */}
      <NavbarComponent />

      {/* Body: Sidebar + Main content */}
      <div className="flex">
        {/* Sidebar */}
        <Component getstarted={handlestart5} />

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Greeting Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-3xl lg:text-4xl font-bold text-customIndigoDark dark:text-custom1Blue mb-2">
              Hello, {username}! 👋
            </h1>
            <p className="text-lg text-customIndigoDark/70 dark:text-custom1Blue/70">
              Here's your financial overview for today
            </p>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {quickStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                className="bg-white dark:bg-customBlack rounded-2xl p-6 shadow-lg border border-customLavender dark:border-custom1Blue hover:shadow-xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`inline-flex items-center justify-center w-12 h-12 ${stat.color} rounded-xl`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.change.startsWith('+') ? 'text-green-600' : 
                    stat.change.startsWith('-') ? 'text-red-600' : 'text-customBlue'
                  }`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="text-sm font-medium text-customIndigoDark/70 dark:text-custom1Blue/70 mb-1">
                  {stat.title}
                </h3>
                <p className="text-2xl font-bold text-customIndigoDark dark:text-custom1Blue">
                  {stat.value}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Charts and Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {/* Income Chart */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="lg:col-span-2 bg-white dark:bg-customBlack rounded-2xl p-6 shadow-lg border border-customLavender dark:border-custom1Blue"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-customIndigoDark dark:text-customLavender">
                  Income Overview
                </h2>
                <button className="text-customBlue hover:text-customLavender transition-colors">
                  View Details
                </button>
              </div>
              <LineGraph />
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="bg-white dark:bg-customBlack rounded-2xl p-6 shadow-lg border border-customLavender dark:border-custom1Blue"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-customIndigoDark dark:text-customLavender">
                  Recent Transactions
                </h2>
              </div>
              <div className="space-y-4">
                {loading ? (
                  <div className="text-center text-customIndigoDark/70 dark:text-custom1Blue/70">Loading...</div>
                ) : recentTransactions.length === 0 ? (
                  <div className="text-center text-customIndigoDark/70 dark:text-custom1Blue/70">No recent transactions found.</div>
                ) : recentTransactions.map((transaction, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-customLightGray/50 dark:bg-customDarkBlue/50"
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        transaction.type === 'income' ? 'bg-customTealLight' : 'bg-customOrange'
                      }`}>
                        {transaction.type === 'income' ? (
                          <HiTrendingUp className="w-4 h-4 text-white" />
                        ) : (
                          <HiCreditCard className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-customIndigoDark dark:text-custom1Blue">
                          {transaction.type === 'income' ? (transaction.from || 'Income') : (transaction.to || 'Expense')}
                        </p>
                        <p className="text-sm text-customIndigoDark/70 dark:text-custom1Blue/70">
                          {transaction.date} {transaction.time ? `at ${transaction.time}` : ''}
                        </p>
                      </div>
                    </div>
                    <span className={`font-semibold ${
                      transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="bg-white dark:bg-customBlack rounded-2xl p-6 shadow-lg border border-customLavender dark:border-custom1Blue"
          >
            <h2 className="text-xl font-bold text-customIndigoDark dark:text-customLavender mb-6">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-customBlue text-white hover:bg-customBlue/80 transition-colors"
                onClick={() => handlestart5("/expense")}
              >
                <HiCreditCard className="w-5 h-5" />
                <span>Add Expense</span>
              </button>
              <button
                className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-customTealLight text-white hover:bg-customTealLight/80 transition-colors"
                onClick={() => handlestart5("/income")}
              >
                <HiTrendingUp className="w-5 h-5" />
                <span>Add Income</span>
              </button>
              <button
                className="flex items-center justify-center space-x-3 p-4 rounded-xl bg-customLavender text-white hover:bg-customLavender/80 transition-colors"
                onClick={() => handlestart5("/report")}
              >
                <HiChartBar className="w-5 h-5" />
                <span>View Reports</span>
              </button>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
