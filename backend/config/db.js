// config/db.js
require('dotenv').config();
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "auth_db"
});

db.connect((err) => {
    if (err) {
        console.log("DB Error:", err.message);
    } else {
        console.log("MySQL Connected Successfully");
    }
});

module.exports = db;