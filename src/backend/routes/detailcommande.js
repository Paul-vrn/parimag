var express = require('express'),
    router = express.Router();
const DetailCommande = require('../controllers/detail_commande_controller')

router
  .post('/', DetailCommande.create)
  .get('/', DetailCommande.findAll)
  .get('/:id', DetailCommande.findOne)
  .patch('/:id', DetailCommande.update)
  .delete('/:id', DetailCommande.delete)
module.exports = router;