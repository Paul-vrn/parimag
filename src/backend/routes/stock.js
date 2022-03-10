var express = require('express'),
    router = express.Router();
const stock = require('../controllers/stock_controller')
const checkTokenMiddleware = require('./middleware').checkTokenMiddleware
router
  .get('/populate', checkTokenMiddleware, stock.populate)
  .post('/', checkTokenMiddleware, stock.create)
  .get('/', checkTokenMiddleware, stock.findAll)
  .get('/:id', checkTokenMiddleware, stock.findOne)
  .patch('/:id', checkTokenMiddleware, stock.update)
  .delete('/all', checkTokenMiddleware, stock.deleteAll)
  .delete('/:id', checkTokenMiddleware, stock.delete)
module.exports = router;