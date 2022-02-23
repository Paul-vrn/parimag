var express = require('express'),
    router = express.Router();
const Banderole = require('../controllers/banderole_controller')
const checkTokenMiddleware = require('./middleware').checkTokenMiddleware;
router
  .post('/', Banderole.create)
  .get('/', Banderole.findAll)
  .get('/:id', Banderole.findOne)
  .patch('/:id', checkTokenMiddleware, Banderole.update)
module.exports = router;