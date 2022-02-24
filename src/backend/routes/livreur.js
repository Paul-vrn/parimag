var express = require('express'),
    router = express.Router();
const Livreur = require('../controllers/livreur_controller')
const checkTokenMiddleware = require('./middleware').checkTokenMiddleware;
router
  .get('/populate', checkTokenMiddleware, Livreur.populate)
  .get('/', checkTokenMiddleware, Livreur.findAll)
  .get('/:id', checkTokenMiddleware, Livreur.findOne)
  .patch('/:id', checkTokenMiddleware, Livreur.update)
module.exports = router;