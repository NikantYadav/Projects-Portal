const express = require('express')
const studauthRouter = express.Router()
const verifyToken = require('../middlewares/stud.auth.js')

studauthRouter.post('/token/s', verifyToken, async function(req, res){})

module.exports = studauthRouter