const express = require('express')
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const loginRouter= express.Router();
const {verifyEmail} = require('../controllers/login.controller.js')
const crypto = require("crypto")
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const path = require('path')
dotenv.config()


async function setPassword(key, salt) {
    const password = crypto.pbkdf2Sync(key, salt, 310000, 32, 'sha256').toString('hex')
    return password;
}


// loginRouter.get('/',(req,res)=>{
//     res.sendFile(path.join(__dirname,'../public/files/login','login.html'))
// })
  
loginRouter.post('/verify', async function(req, res){
    const {exists,object} = await verifyEmail(req.body.email)
    if(!exists){
        res.status(400).json({success: false, error: 'Email does not exist'})
        console.log('Login failed')
    } else {
        const {salt, password} = object
        const realpass = await setPassword(req.body.password,salt)
        if (realpass === password) {
            try {
                const token = jwt.sign({ userType: object.type, userID: object._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
                res.status(200).json({ token: token, success: true, type: object.type });
                console.log('Login successful');
            } catch (error) {
                res.status(500).json({ success: false, error: 'Error signing token' });
                console.error('Error signing token:', error);
            }
        } else {
            res.status(400).json({ success: false, error: 'Password incorrect' });
            console.log('Login failed');
        }
    }
});

module.exports = loginRouter
