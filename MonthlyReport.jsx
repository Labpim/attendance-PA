import React, { useState } from "react";
import axios from "axios";

export default function MonthlyReport() {
  const [month, setMonth] = useState("");
  const [report, setReport] = useState([]);

  const loadReport = () => {
    axios.get(`http://localhost:3001/api/report/${month}`).then(res => {
      setReport(res.data);
    });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-2">Monthly Report</h2>
      <input type="month" className="border p-2 mb-2 w-full"
        value={month}
        onChange={(e) => setMonth(e.target.value)} />
      <button onClick={loadReport} className="bg-purple-500 text-white px-4 py-2 rounded mb-4">
        Load Report
      </button>
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">พนักงาน</th>
            <th className="border px-4 py-2">จำนวนวัน</th>
            <th className="border px-4 py-2">ชั่วโมงรวม</th>
          </tr>
        </thead>
        <tbody>
          {report.map((r, i) => (
            <tr key={i}>
              <td className="border px-4 py-2">{r.name}</td>
              <td className="border px-4 py-2">{r.daysWorked}</td>
              <td className="border px-4 py-2">{r.totalHours?.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
