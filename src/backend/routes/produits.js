var express = require('express'),
    router = express.Router();

router
  .get('/', (req, res) => {
    res.status(200).json(require('../data/produits.json'))
 })

module.exports = router;