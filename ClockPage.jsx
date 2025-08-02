import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ClockPage() {
  const [employees, setEmployees] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [attendanceId, setAttendanceId] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:3001/api/employees").then(res => {
      setEmployees(res.data);
    });
  }, []);

  const clockIn = () => {
    axios.post("http://localhost:3001/api/clock-in", { employee_id: selectedId })
      .then(res => {
        alert("Clock In Success");
        setAttendanceId(res.data.id);
      });
  };

  const clockOut = () => {
    if (!attendanceId) return alert("Please Clock In first");
    axios.post("http://localhost:3001/api/clock-out", { attendance_id: attendanceId })
      .then(() => {
        alert("Clock Out Success");
        setAttendanceId(null);
      });
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="font-bold mb-2">Clock In / Out</h2>
      <select className="border p-2 mb-4 w-full"
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}>
        <option value="">เลือกพนักงาน</option>
        {employees.map(emp => (
          <option key={emp.id} value={emp.id}>{emp.name}</option>
        ))}
      </select>
      <div className="flex gap-4">
        <button onClick={clockIn} className="bg-blue-500 text-white px-4 py-2 rounded">Clock In</button>
        <button onClick={clockOut} className="bg-red-500 text-white px-4 py-2 rounded">Clock Out</button>
      </div>
    </div>
  );
}
