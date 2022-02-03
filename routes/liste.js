var express = require('express'),
    router = express.Router();

router
  .get('/', (req, res) => {
    res.status(200).json(require('../src/data/liste.json'))
 })

module.exports = router;