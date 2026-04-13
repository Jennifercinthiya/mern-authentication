require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('./config/db');
const verifyToken = require('./middleware/authMiddleware');

const app = express();
const PORT = 5000;
const JWT_SECRET = 'mysecretkey123';

// ================= MIDDLEWARE =================
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));

app.use(express.json());

// ================= HOME =================
app.get('/', (req, res) => {
    res.send('Server is running');
});

// ================= REGISTER =================
app.post('/api/users/register', (req, res) => {
    const { username, email, phone, password } = req.body;

    if (!username || !email || !phone || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const sql = `
        INSERT INTO users (username, email, phone, password, created_at, updated_at)
        VALUES (?, ?, ?, ?, NOW(), NOW())
    `;

    db.query(sql, [username, email, phone, hashedPassword], (err) => {
        if (err) return res.status(500).json({ message: err.message });

        res.json({ message: "User registered successfully" });
    });
});

// ================= LOGIN =================
app.post('/api/users/login', (req, res) => {
    let { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password required" });
    }

    email = email.trim().toLowerCase();

    const sql = "SELECT * FROM users WHERE email = ?";

    db.query(sql, [email], (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = results[0];

        const isMatch = bcrypt.compareSync(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const token = jwt.sign(
            { id: user.id },
            JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email
            }
        });
    });
});

// ================= FORGOT PASSWORD =================
app.post('/api/users/forgot-password', (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email required" });

    res.json({
        message: "Reset link sent",
        email
    });
});

// ================= RESET PASSWORD =================
app.post('/api/users/reset-password', (req, res) => {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
        return res.status(400).json({ message: "Missing fields" });
    }

    const hashed = bcrypt.hashSync(newPassword, 8);

    const sql = "UPDATE users SET password=? WHERE email=?";

    db.query(sql, [hashed, email], (err) => {
        if (err) return res.status(500).json({ message: err.message });

        res.json({ message: "Password reset successful" });
    });
});

// ================= DASHBOARD =================
app.get('/api/dashboard/stats', verifyToken, (req, res) => {
    res.json({
        total: 10,
        active: 5,
        pending: 3,
        completed: 2
    });
});

// ================= ITEMS =================
app.get('/api/items', verifyToken, (req, res) => {
    res.json({ message: "Items fetched", items: [] });
});

app.post('/api/items/add', verifyToken, (req, res) => {
    res.json({ message: "Item added" });
});

app.put('/api/items/update/:id', verifyToken, (req, res) => {
    res.json({ message: "Item updated" });
});

app.delete('/api/items/delete/:id', verifyToken, (req, res) => {
    res.json({ message: "Item deleted" });
});

// ================= START SERVER =================
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});