var express = require('express'),
    router = express.Router();
const Livreur = require('../controllers/livreur_controller')
router
  .get('/populate', Livreur.populate)
  .get('/', Livreur.findAll)
  .get('/:id', Livreur.findOne)
  .patch('/:id', Livreur.update)
module.exports = router;