const db = require('../models')
const DetailCommande = db.DetailCommande

module.exports = {
    create = (req, res) => {
        if (!req.body.title) {
            res.status(400).send({
              message: "Content can not be empty!"
            });
            return;
          }
        const detailcommande = {
            quantite:req.body.quantite,
            commandeId:req.body.commandeId,
            produitId:req.body.produitId
        }
        DetailCommande.create(detailcommande)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error création detailcommande"
                })
            })
    },
    findAll = (req, res) => {},
    findOne = (req, res) => {},
    update = (req, res) => {},
    deletE = (req, res) => {},
}