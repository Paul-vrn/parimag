var express = require('express'),
router = express.Router();

var listeRoute = require('./liste')
router
.get('/', (req, res) => {
    res.status(200).send("Vide")
})
.use('/liste', listeRoute)
.get('/benzimag', (req, res) => {
    res.status(200).send("mdp : abcdefghij")
})
.get('/*', (req, res) => { // route "puit" dans laquelle on tombe si on met n'importe quoi
    res.status(404).send("Vide")    
})
module.exports = router;