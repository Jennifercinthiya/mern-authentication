const mysql = require('mysql2');

// Create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',  // empty if no password
  database: 'mern_auth_db'  // your DB name
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.log('MySQL connection error:', err);
  } else {
    console.log('MySQL Connected Successfully');
  }
});