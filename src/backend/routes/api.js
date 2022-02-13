var express = require('express'),
router = express.Router();

var jsonRoute = require('./json')
var produitsRoute = require('./produits')
var commandesRoute = require('./commandes')
router
.get('/', (req, res) => {
    res.status(200).send("Vide")
})
.use('/json', jsonRoute)
.use('/produits', produitsRoute)
.use('/commandes', commandesRoute)
.get('/benzimag', (req, res) => {
    res.status(200).send("mdp : abcdefghij")
})
.get('/*', (req, res) => { // route "puit" dans laquelle on tombe si on met n'importe quoi
    res.status(404).send("Vide")    
})
module.exports = router;