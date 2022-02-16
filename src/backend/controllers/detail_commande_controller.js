const db = require('../models')
const DetailCommande = db.DetailCommande


module.exports = {
    create: (req, res) => {
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
                    message: err.message || "Error création DetailCommande"
                })
            })
    },
    findAll: (req, res) => {
        DetailCommande.findAll()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error findAll"
                })
            })
    },
    findOne: (req, res) => {
        const id = req.params.id;
        DetailCommande.findByPk(id)
            .then(data => {
                if (data){
                    res.send(data)
                } else {
                    res.status(404).send({message:`DetailCommande ${id} introuvable`})
                }
            })
            .catch(err => res.status(500).send({message: err.message || 'error findOne DetailCommande'}))
    },
    update: (req, res) => {
        const id = req.params.id;
    
        DetailCommande.update(req.body, {where:{id:id}})
            .then(num => {
                if (num==1){
                    DetailCommande.findByPk(id)
                        .then(data => {
                            res.status(200).send({
                                message:`DetailCommande ${id} updated`,
                                detailcommande:data
                            })        
                        })
                }
                else {
                    res.status(404).send({message:`DetailCommande ${id} introuvable`})
                }
            })
            .catch(err => res.status(500).send({message:err.message || 'error update Commande'}))
    },
    delete: async (req, res) => {
        const id = req.params.id;
        const data = await DetailCommande.findByPk(id)
        DetailCommande.destroy({where:{id:id}})
            .then(num => {
                if (num==1){
                    res.status(200).send({
                        message:`DetailCommande ${id} deleted`,
                        detailcommande:data
                    })                
                }
                else {
                    res.status(404).send({message:`DetailCommande ${id} introuvable`})
                }
            })
            .catch(err => res.status(500).send({message:err.message}))
    }
}