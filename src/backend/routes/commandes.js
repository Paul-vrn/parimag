var express = require('express'),
    router = express.Router();
const Commande = require('../controllers/commande_controller')
const checkTokenMiddleware = require('./middleware').checkTokenMiddleware;
router
  .post('/', Commande.create)
  .get('/', Commande.findAll)
  .get('/:code', Commande.findOne)
  .patch('/:code', checkTokenMiddleware, Commande.update)
  .delete('/:code', checkTokenMiddleware, Commande.delete)
module.exports = router;