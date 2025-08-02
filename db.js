const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

// สร้างตารางพนักงานและการบันทึกเวลา
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS employees (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS attendance (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      employee_id INTEGER NOT NULL,
      clock_in DATETIME,
      clock_out DATETIME,
      FOREIGN KEY(employee_id) REFERENCES employees(id)
    )
  `);

  // เพิ่มพนักงานตัวอย่าง
  db.run(`INSERT OR IGNORE INTO employees (id, name) VALUES (1, 'สมชาย ใจดี')`);
  db.run(`INSERT OR IGNORE INTO employees (id, name) VALUES (2, 'สมหญิง ขยัน')`);
});

module.exports = db;
