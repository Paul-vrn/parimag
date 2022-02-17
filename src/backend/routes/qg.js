var express = require('express'),
    router = express.Router();
const Qg = require('../controllers/qg_controller')
router
  .get('/populate', Qg.populate)
  .get('/', Qg.findAll)
  .post('/login', Qg.auth)
module.exports = router;