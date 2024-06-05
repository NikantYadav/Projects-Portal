const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const mongodb = require('mongodb')
const mongoose = require('mongoose')
const {getProfessor} = require('../controllers/professor.controller.js')
const professor = require('../models/professor.model.js')
dotenv.config()

async function verifyToken(req, res, next) {
    const token = req.body.token;
    if (!token) {
        return res.status(401).json({ auth: false, error: 'Access Denied (no token)' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.objectID = decoded.userID
        if(decoded.userType == 'professor') {
            const prof = await professor.findById(decoded.userID).exec()
            res.status(200).json({auth: true, type: decoded.userType, name: prof.name, department: prof.department, address: prof.address, email: prof.email, profilePic: prof.profileImageUrl, about: prof.about, research: prof.research, hours: prof.hours})
        } 
        next();
    } catch(error) {
        res.status(401).json({ auth: false, error: error + ' invalid token' });
        console.log(error)
    }
}

module.exports = verifyToken;
