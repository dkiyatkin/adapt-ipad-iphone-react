const p = require('path')
const express = require('express')

const rootRouter = require('./routes/root')

const frontendBuildPath = p.join(__dirname, '../build')

const app = express()

app.use('/', express.static(frontendBuildPath, { index: false }))
app.use('/', rootRouter)
app.use('/', (req, res) => res.sendStatus(404))

module.exports = app
