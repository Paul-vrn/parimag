var express = require('express'),
    router = express.Router();
const Commande = require('../controllers/commande_controller')
const checkTokenMiddleware = require('./middleware').checkTokenMiddleware;
router
  .post('/', checkTokenMiddleware, Commande.create)
  .get('/', checkTokenMiddleware, Commande.findAll)
  .get('/suivi/', Commande.findAllSuivi)
  .get('/:id', checkTokenMiddleware, Commande.findOne)
  .patch('/:id', checkTokenMiddleware, Commande.update)
  .delete('/:id', checkTokenMiddleware, Commande.delete)
module.exports = router;