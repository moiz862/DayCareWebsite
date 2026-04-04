const Database = require('better-sqlite3');
const db = new Database('../../sqlite.db');

const existing = db.prepare('SELECT count(*) as count FROM events').get();
if (existing.count === 0) {
  const nextMonth = new Date();
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const theMonthAfter = new Date();
  theMonthAfter.setMonth(theMonthAfter.getMonth() + 2);

  const stmt = db.prepare('INSERT INTO events (title, description, date, time, location, type) VALUES (?, ?, ?, ?, ?, ?)');

  stmt.run("Spring Open House", "Meet our teachers, tour the facilities, and learn about our play-based curriculum.", nextMonth.toISOString(), "10:00 AM - 2:00 PM", "Main Campus", "open-house");

  stmt.run("Parent-Teacher Workshop", "A collaborative session discussing early childhood development milestones.", theMonthAfter.toISOString(), "6:00 PM - 8:00 PM", "Virtual", "workshop");

  console.log("Seeded Events directly using better-sqlite3!");
} else {
  console.log("Events already exist.");
}
