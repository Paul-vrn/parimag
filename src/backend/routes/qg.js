var express = require('express'),
    router = express.Router();
const Qg = require('../controllers/qg_controller')
const checkTokenMiddleware = require('./middleware').checkTokenMiddleware

router
  .get('/populate', checkTokenMiddleware, Qg.populate)
  .get('/', Qg.findAll)
  .post('/login', Qg.auth)
module.exports = router;