const express = require('express')
const authRouter = express.Router()
const verifyToken = require('../middlewares/auth.middleware.js')
const verifyStud = require('../middlewares/stud.auth.js')
const verifyProf = require('../middlewares/prof.auth.js')

authRouter.post('/token', verifyToken, async function(req, res){})
// authRouter.post('/token/s', verifyStud, async function(req, res){})
// authRouter.post('/token/p', verifyProf, async function(req, res){})

module.exports = authRouter
