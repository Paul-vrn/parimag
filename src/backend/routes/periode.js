var express = require('express'),
    router = express.Router();
const Periode = require('../controllers/periode_controller')
const checkTokenMiddleware = require('./middleware').checkTokenMiddleware;
router
  .get('/populate', checkTokenMiddleware, Periode.populate)
  .post('/', checkTokenMiddleware, Periode.create)
  .get('/', Periode.findAll)
  .get('/:id', Periode.findOne)
  .patch('/:id', checkTokenMiddleware, Periode.update)
module.exports = router;