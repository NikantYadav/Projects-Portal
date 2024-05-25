const express = require('express')
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const loginRouter= express.Router();
const {verifyEmail} = require('../controllers/login.controller.js')
const crypto = require("crypto")

async function setPassword(key, salt) {
    const password = crypto.pbkdf2Sync(key, salt, 310000, 32, 'sha256').toString('hex')
    return password;
}


loginRouter.get('/',(req,res)=>{
    res.render('login')
})
  
loginRouter.post('/verify', async function(req, res){
    const {exists,object} = await verifyEmail(req.body.email)
    if(!exists){
        res.status(400).json("Email doesn't exist in the database")
    } else {
        const {salt, password} = object
        const realpass = await setPassword(req.body.password,salt)
        if(realpass == password) {
            res.status(200).json("Password is correct")
        } else {
            res.status(400).json("password not correct")
        }
    }
  
})

module.exports = loginRouter
