const express = require('express')

const ssr = require('../helpers/ssr')

const router = module.exports = express.Router()

router.get('/', function (req, res, next) {
  const html = ssr(req)
  return res.status(200).send(html)
})
