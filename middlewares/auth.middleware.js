const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function verifyToken(req, res, next) {
    const token = req.body.token;
    if (!token) {
        return res.status(401).json({ auth: false, error: 'Access Denied (no token)' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.objectID = decoded.objectID;
        res.status(200).json({auth: true, type: decoded.userType, id : decoded.userID})
        next();
    } catch(error) {
        res.status(401).json({ auth: false, error: error + ' invalid token' });
    }
}

module.exports = verifyToken;
