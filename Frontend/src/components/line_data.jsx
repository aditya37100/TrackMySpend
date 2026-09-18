const customColors = {
  expense: '#e6a943',       // customOrange
  income: '#78b39b',        // customTealLight
};

export const chartData = {
  labels: ['01 Feb', '02 Feb', '03 Feb', '04 Feb', '05 Feb', '06 Feb', '07 Feb'],
  datasets: [
    {
      label: 'Expense',
      data: [3200, 3400, 3000, 3600, 7000, 7200, 4100],
      borderColor: customColors.expense,
      backgroundColor: `${customColors.expense}33`, // 20% opacity
      fill: true,
      tension: 0.4,
      pointRadius: 3
    },
    {
      label: 'Income',
      data: [5000, 5200, 5100, 5300, 6000, 5600, 5800],
      borderColor: customColors.income,
      backgroundColor: `${customColors.income}33`,
      fill: true,
      tension: 0.4,
      pointRadius: 3
    }
  ]
};
