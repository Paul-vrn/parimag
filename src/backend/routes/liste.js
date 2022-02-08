var express = require('express'),
    router = express.Router();

router
  .get('/', (req, res) => {
    res.status(200).json(require('../data/liste.json'))
 })

module.exports = router;