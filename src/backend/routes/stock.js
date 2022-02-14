var express = require('express'),
    router = express.Router();
const stock = require('../controllers/stock_controller')
router
  .post('/', stock.create)
  .get('/', stock.findAll)
  .get('/:id', stock.findOne)
  .patch('/:id', stock.update)
  .delete('/:id', stock.delete)
module.exports = router;