import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const customColors = {
  income:   '#78b39b',
  grayText: '#ededed',
  whiteText:'#fefeff',
  border:   '#353d63',
};

export default function LineGraph() {
  const [viewMode, setViewMode] = useState('month'); 
  const [chartData, setChartData] = useState(null);
  const [options, setOptions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    let url = `https://trackmyspendapi-3.onrender.com/income/`;

    if (viewMode === 'week') {
      const week = Math.ceil(day / 7);
      url += `eachdayincome?year=${year}&month=${month}&week=${week}`;
    } 
    else if (viewMode === 'month') {
      url += `eachweekincome?year=${year}&month=${month}`;
    } 
    else {
      url += `eachmonthincome?year=${year}`;
    }

    setLoading(true);
    axios.get(url)
      .then(res => {
        const raw = res.data;
        const labels = raw.days || raw.weeks || raw.months;
        const totals = raw.totals;

        setChartData({
          labels,
          datasets: [{
            label: viewMode === 'week'
                   ? 'Daily Income'
                   : viewMode === 'month'
                     ? 'Weekly Income'
                     : 'Monthly Income',
            data: totals,
            borderColor: customColors.income,
            backgroundColor: `${customColors.income}33`,
            fill: true,
            tension: 0.4,
            pointRadius: 4
          }]
        });
        setLoading(false);
      })
      .catch(err => {
        console.error(`Error fetching ${viewMode} data:`, err);
        setLoading(false);
      });
  }, [viewMode]);

  useEffect(() => {
    setOptions({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { 
          display: false 
        },
        tooltip: {
          backgroundColor: customColors.border,
          titleColor: customColors.whiteText,
          bodyColor: customColors.grayText,
          borderColor: customColors.grayText,
          borderWidth: 1
        }
      },
      scales: {
        x: {
          ticks: { 
            color: customColors.grayText,
            font: {
              size: 12,
              weight: '500'
            }
          },
          grid: { 
            color: 'rgba(255,255,255,0.05)', 
            drawBorder: false 
          }
        },
        y: {
          ticks: { 
            color: customColors.grayText,
            font: {
              size: 12,
              weight: '500'
            }
          },
          grid: { 
            color: 'rgba(255,255,255,0.05)' 
          }
        }
      },
      elements: {
        point: { 
          hoverRadius: 6, 
          hitRadius: 10 
        },
        line: { 
          borderWidth: 2 
        }
      }
    });
  }, [viewMode]);

  const viewModeOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'year', label: 'This Year' }
  ];

  return (
    <div className="w-full h-[400px]">
      {/* Header with dropdown */}
      <div className="flex justify-between items-center mb-6">
        <motion.h3 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-lg font-semibold text-customIndigoDark dark:text-custom1Blue"
        >
          {viewMode === 'week' ? 'Daily Income'
           : viewMode === 'month' ? 'Weekly Income'
                                  : 'Monthly Income'}
        </motion.h3>
        
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative"
        >
          <select
            className="appearance-none bg-white dark:bg-customBlack border border-customLavender dark:border-custom1Blue text-customIndigoDark dark:text-custom1Blue rounded-xl px-4 py-2 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-customBlue focus:border-transparent transition-all duration-200"
            value={viewMode}
            onChange={e => setViewMode(e.target.value)}
          >
            {viewModeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="w-4 h-4 text-customIndigoDark dark:text-custom1Blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Chart Container */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative bg-white dark:bg-customBlack rounded-2xl p-6 shadow-lg border border-customLavender dark:border-custom1Blue"
      >
        {loading ? (
          <div className="w-full h-[300px] flex items-center justify-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-customBlue border-t-transparent"></div>
              <p className="text-sm text-customIndigoDark/70 dark:text-custom1Blue/70">Loading chart data...</p>
            </div>
          </div>
        ) : chartData && options ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="w-full h-[300px] flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-customLightGray dark:bg-customDarkBlue rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-customIndigoDark/50 dark:text-custom1Blue/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <p className="text-sm text-customIndigoDark/70 dark:text-custom1Blue/70">No data available</p>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
