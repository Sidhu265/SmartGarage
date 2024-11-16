const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Bearer token

    if (!token) return res.sendStatus(401); // Unauthorized

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.userId = user.userId; // Attach userId to request
        next();
    });
};

module.exports = authenticateToken;