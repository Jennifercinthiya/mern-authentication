const jwt = require("jsonwebtoken");

const JWT_SECRET = "mysecretkey123"; // In production, use environment variable

module.exports = (req, res, next) => {
    console.log("VERIFY SECRET:", JWT_SECRET);
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token missing" });
    }

    // Expect: Bearer token
    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token missing or invalid format" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        req.userId = decoded.id; // attach user id
        next();

    } catch (err) {
        return res.status(401).json({
            message: "Invalid token",
            error: err.message
        });
    }
};