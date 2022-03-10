var express = require('express'),
    router = express.Router();
const DetailCommande = require('../controllers/detail_commande_controller')
const checkTokenMiddleware = require('./middleware').checkTokenMiddleware;

router
  .post('/', checkTokenMiddleware, DetailCommande.create)
  .get('/', checkTokenMiddleware, DetailCommande.findAll)
  .get('/:id', checkTokenMiddleware, DetailCommande.findOne)
  .patch('/:id', checkTokenMiddleware, DetailCommande.update)
  .delete('/:id', checkTokenMiddleware, DetailCommande.delete)
module.exports = router;