var express = require('express'),
    router = express.Router();
const Commande = require('../controllers/commande_controller')
router
  .post('/', Commande.create)
  .get('/', Commande.findAll)
  .get('/:code', Commande.findOne)
  .patch('/:code', Commande.update)
  .delete('/:code', Commande.delete)
module.exports = router;