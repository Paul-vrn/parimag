var express = require('express'),
    router = express.Router();
const Produit = require('../controllers/ produit_controller')
const checkTokenMiddleware = require('./middleware').checkTokenMiddleware
router
  .get('/populate', checkTokenMiddleware, Produit.populate)
  .post('/', checkTokenMiddleware, Produit.create)
  .get('/', Produit.findAll)
  .get('/:id', Produit.findOne)
  .patch('/:id', checkTokenMiddleware, Produit.update)
  .delete('/:id', checkTokenMiddleware, Produit.delete)
module.exports = router;