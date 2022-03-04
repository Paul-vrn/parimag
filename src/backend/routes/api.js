var express = require('express'),
router = express.Router();

var jsonRoute = require('./json')
var produitsRoute = require('./produits')
var commandesRoute = require('./commandes')
var detailCommandeRoute = require('./detailcommande')
var stockRoute = require('./stock')
var qgRoute = require('./qg.js')
var livreurRoute = require('./livreur')
var banderoleRoute = require('./banderole')
var periodeRoute = require('./periode')
router
.get('/', (req, res) => {
    res.status(200).send("Vide")
})
.use('/json', jsonRoute)
.use('/produits', produitsRoute)
.use('/commandes', commandesRoute)
.use('/detailCommandes', detailCommandeRoute)
.use('/stocks', stockRoute)
.use('/qgs', qgRoute)
.use('/banderoles', banderoleRoute)
.use('/livreurs', livreurRoute)
.use('/periodes', periodeRoute)
.get('/benzimag', (req, res) => {
    res.status(200).send({
        message:"Bien joué vous avez trouvé un nouveau esteregg ! Ajoutez le code ci-dessous en commentaire de ta commande pour obtenir une belle surprise :D",
        code:"12334"
    })
    res.status(200).send("mdp : abcdefghij")
})
.get('/*', (req, res) => { // route "puit" dans laquelle on tombe si on met n'importe quoi
    res.status(404).send("Vide")    
})
module.exports = router;