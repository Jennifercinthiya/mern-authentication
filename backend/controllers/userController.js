// controllers/userController.js

const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = "mysecretkey123"; // In production, use environment variable

// ---------------- REGISTER ---------------
exports.registerUser = (req, res) => {
    const { username, email, phone, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql =
        "INSERT INTO users (username, email, phone, password) VALUES (?, ?, ?, ?)";

    db.query(sql, [username, email, phone, hashedPassword], (err) => {
        if (err) return res.status(500).json(err);

        res.json({ message: "User registered successfully" });
    });
};

// ---------------- LOGIN (🔥 YOUR REQUEST) ----------------
exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email & password required" });
    }

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = results[0];

        // 🔥 PASSWORD CHECK FIX
        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: "1h"
        });

        res.json({
            message: "Login successful",
            token,
            user
        });
    });
};