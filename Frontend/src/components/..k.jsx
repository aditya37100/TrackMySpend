import { useState, useEffect } from "react";
import axios from "axios";

export default function IncomeListCard() {
  const [incomes, setIncomes] = useState([]);

  useEffect(()=> {
     axios.get("https://trackmyspendapi-3.onrender.com/income/viewincome")
     .then((res) => {setIncomes(res.data.incomelist)})
      .catch((err) => console.error(err));

  },[])
  return <div>

  </div>
}
