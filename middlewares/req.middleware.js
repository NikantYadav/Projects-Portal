const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()


async function profReqVerify(req, res, next) {
    const token = req.body.token;
    if (!token) {
        return res.status(401).json({ auth: false, error: 'Access Denied (no token)' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (decoded.userType == 'professor') {
            next()
        }
        else {
            res.status(401).json({ auth: false, error: 'Invalid user type' })
        }
    } catch (error) {
        res.status(401).json({ auth: false, error: error + ' invalid token' });
        console.log(error)
    }
}


async function studReqVerify(req, res, next) {
    const token = req.body.token;
    if (!token) {
        return res.status(401).json({ auth: false, error: 'Access Denied (no token)' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        if (decoded.userType == 'student') {
            next()
        }
        else {
            res.status(401).json({ auth: false, error: 'Invalid user type' })
        }
    } catch (error) {
        res.status(401).json({ auth: false, error: error + ' invalid token' });
        console.log(error)
    }
}


module.exports = {profReqVerify, studReqVerify}