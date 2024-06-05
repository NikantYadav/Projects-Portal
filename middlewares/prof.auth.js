const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function verifyProf(req, res, next) {
    const token = req.body.token;
    if (!token) {
        return res.status(401).json({ auth: false, error: 'Access Denied (no token)' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.objectID = decoded.objectID
        if(decoded.userType == 'professor') {
        return res.status(200).json({auth: true})
        } else {
            return res.status(401).json({auth: false, error: 'invalid token'})
        }
        next();
    } catch(error) {
        res.status(401).json({ auth: false, error: error + ' invalid token' });
    }
}

module.exports = verifyProf;
