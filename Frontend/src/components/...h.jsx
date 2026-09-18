import { useState, useEffect } from "react";
import axios from "axios";

export default function IncomeListCard() {
  const [incomes, setIncomes] = useState([]);

  useEffect(() => {
    axios
      .get("https://trackmyspendapi-3.onrender.com/income/viewincome")
    .then((res) => setIncomes(res.data.incomelist))

      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white dark:bg-gray-800 border">
        <thead>
          <tr>
            {["Source", "Amount", "Category", "Date", "Time", "Count"].map((h) => (
              <th
                key={h}
                className="px-4 py-2 border-b text-left text-gray-700 dark:text-gray-200"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {incomes.map((inc) => (
            <tr
              key={inc._id}
              className="hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <td className="px-4 py-2 border-b">{inc.from}</td>
              <td className="px-4 py-2 border-b">{inc.amount}</td>
              <td className="px-4 py-2 border-b">{inc.category}</td>
              <td className="px-4 py-2 border-b">{inc.date}</td>
              <td className="px-4 py-2 border-b">{inc.time || "—"}</td>
              <td className="px-4 py-2 border-b">{inc.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
