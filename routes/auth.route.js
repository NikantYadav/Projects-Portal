// auth.routes.js
const express = require('express')
const authRouter = express.Router()
const verifyToken = require('../middlewares/auth.middleware.js')

authRouter.post('/token', verifyToken, async function(req, res){})

module.exports = authRouter
