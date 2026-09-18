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
expense: '#e64b43',       // customOrange

  grayText: '#ededed',
  whiteText:'#fefeff',
  border:   '#353d63',
};

export default function LineGraphExp() {
  const [viewMode, setViewMode] = useState('month'); 
  const [chartData, setChartData] = useState(null);
  const [options,   setOptions]   = useState(null);

  useEffect(() => {
    const now = new Date();
    const year  = now.getFullYear();
    const month = now.getMonth() + 1;
    const day   = now.getDate();

    let url = `https://trackmyspendapi-3.onrender.com/expense/`;

    if (viewMode === 'week') {
      // days of current week
      const week = Math.ceil(day / 7);
      url += `eachdayexpense?year=${year}&month=${month}&week=${week}`;
    } 
    else if (viewMode === 'month') {
      // weeks of current month
      url += `eachweekexpense?year=${year}&month=${month}`;
    } 
    else {
      // months of current year
      url += `eachmonthexpense?year=${year}`;
    }

    axios.get(url)
      .then(res => {
        // endpoint returns { days/weeks/months: [...], totals: [...] }
        const raw   = res.data;
        const labels= raw.days || raw.weeks || raw.months;
        const totals= raw.totals;

        setChartData({
          labels,
          datasets: [{
            label: viewMode === 'week'
                   ? 'Daily Expense'
                   : viewMode === 'month'
                     ? 'Weekly Expense'
                     : 'Monthly Expense',
            data: totals,
            borderColor: customColors.expense,
            backgroundColor: `${customColors.expense}33`,
            fill: true,
            tension: 0.4,
            pointRadius: 4
          }]
        });
      })
      .catch(err => console.error(`Error fetching ${viewMode} data:`, err));
  }, [viewMode]);

  useEffect(() => {
    setOptions({
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: customColors.border,
          titleColor:     customColors.whiteText,
          bodyColor:      customColors.grayText,
          borderColor:    customColors.grayText,
          borderWidth:    1
        }
      },
      scales: {
        x: {
          ticks: { color: customColors.grayText },
          grid:  { color: 'rgba(255,255,255,0.05)', drawBorder: false },
          title: {
            display: true,
            
            color: customColors.grayText,
            font: { size: 14 }
          }
        },
        y: {
          ticks: { color: customColors.grayText },
          grid:  { color: 'rgba(255,255,255,0.05)' },
          title: {
            display: true,
            text: 'Income (₹)',
            color: customColors.grayText,
            font: { size: 14 }
          }
        }
      },
      elements: {
        point: { hoverRadius: 6, hitRadius: 10 },
        line:  { borderWidth: 2 }
      }
    });
  }, [viewMode]);

  return (
    <div className="w-full h-[400px] bg-white dark:bg-[#242933] rounded-lg shadow-sm p-4 md:p-6">
      {/* dropdown */}
      <div className='flex justify-between gap-4 items-center'>
        <div className="flex justify-between mb-2">
        <h2 className="text-gray-900 dark:text-[#fefeff] text-lg font-semibold">
          {viewMode === 'week'  ? 'Income by Day'
           : viewMode === 'month' ? 'Income by Week'
                                  : 'Income by Month'}
        </h2>
      </div>
      <div className="mb-4 mt-2">
        <select
          className="bg-[#e8e8e8] dark:bg-customBlack border border-[#8e8e8e] dark:border-custom1Blue text-gray-700 dark:text-gray-200 rounded-lg p-2"
          value={viewMode}
          onChange={e => setViewMode(e.target.value)}
        >
          <option value="week">This Week’s</option>
          <option value="month">This Month’s</option>
          <option value="year">This Year’s</option>
        </select>
      </div>

      
      </div>

      {chartData && options ? (
        <Line data={chartData} options={options} />
      ) : (
        <p className="text-sm text-gray-400">Loading chart…</p>
      )}
    </div>
  );
}
