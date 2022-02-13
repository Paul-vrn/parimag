var express = require('express'),
    router = express.Router();

router
  .get('/liste', (req, res) => {
    res.status(200).json(require('../data/liste.json'))
 })
 .get('/produits', (req, res) => {
  res.status(200).json(require('../data/produits.json'))
})

module.exports = router;