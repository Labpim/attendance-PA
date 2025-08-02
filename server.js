const express = require('express');
const cors = require('cors');
const db = require('./db');
const dayjs = require('dayjs');

const app = express();
app.use(cors());
app.use(express.json());

// 📌 ดึงรายชื่อพนักงาน
app.get('/api/employees', (req, res) => {
  db.all(`SELECT * FROM employees`, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// 📌 Clock In
app.post('/api/clock-in', (req, res) => {
  const { employee_id } = req.body;
  const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
  db.run(
    `INSERT INTO attendance (employee_id, clock_in) VALUES (?, ?)`,
    [employee_id, now],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Clock In success', id: this.lastID });
    }
  );
});

// 📌 Clock Out
app.post('/api/clock-out', (req, res) => {
  const { attendance_id } = req.body;
  const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
  db.run(
    `UPDATE attendance SET clock_out = ? WHERE id = ?`,
    [now, attendance_id],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Clock Out success' });
    }
  );
});

// 📌 Manual Entry
app.post('/api/manual-entry', (req, res) => {
  const { employee_id, clock_in, clock_out } = req.body;
  db.run(
    `INSERT INTO attendance (employee_id, clock_in, clock_out) VALUES (?, ?, ?)`,
    [employee_id, clock_in, clock_out],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Manual entry added', id: this.lastID });
    }
  );
});

// 📌 รายงานรายเดือน
app.get('/api/report/:month', (req, res) => {
  const month = req.params.month; // รูปแบบ YYYY-MM
  db.all(
    `
    SELECT e.name,
           COUNT(DISTINCT DATE(a.clock_in)) AS daysWorked,
           SUM((julianday(a.clock_out) - julianday(a.clock_in)) * 24) AS totalHours
    FROM attendance a
    JOIN employees e ON a.employee_id = e.id
    WHERE strftime('%Y-%m', a.clock_in) = ?
    GROUP BY e.id
    `,
    [month],
    (err, rows) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(rows);
    }
  );
});

app.listen(3001, () => console.log('Backend running on http://localhost:3001'));
