import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManualEntry() {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ employee_id: "", clock_in: "", clock_out: "" });

  useEffect(() => {
    axios.get("http://localhost:3001/api/employees").then(res => {
      setEmployees(res.data);
    });
  }, []);

  const submitManual = () => {
    axios.post("http://localhost:3001/api/manual-entry", form)
      .then(() => alert("Manual entry added"));
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-2">Manual Entry</h2>
      <select className="border p-2 mb-2 w-full"
        value={form.employee_id}
        onChange={(e) => setForm({ ...form, employee_id: e.target.value })}>
        <option value="">เลือกพนักงาน</option>
        {employees.map(emp => (
          <option key={emp.id} value={emp.id}>{emp.name}</option>
        ))}
      </select>
      <input type="datetime-local" className="border p-2 mb-2 w-full"
        value={form.clock_in}
        onChange={(e) => setForm({ ...form, clock_in: e.target.value })}/>
      <input type="datetime-local" className="border p-2 mb-2 w-full"
        value={form.clock_out}
        onChange={(e) => setForm({ ...form, clock_out: e.target.value })}/>
      <button onClick={submitManual} className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
    </div>
  );
}
