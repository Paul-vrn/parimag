const db = require('../models')
const Commande = db.Commande

module.exports = {
    create:(req, res) => {
        const commande = {
            personne:req.body.personne,
            adresse:req.body.adresse,
            tel:req.body.tel,
            etat:req.body.etat,
            trajets:req.body.trajets,
            commentaire:req.body.commentaire,
            couverts:req.body.couverts
        }
        if (req.body.QGNom !== undefined){
            commande.QGNom = req.body.QGNom
        }
        Commande.create(commande)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error création Commande"
                })
            })
    },
    findAll: (req, res) => {
        Commande.findAll({
            include: [
                {
                    model:db.DetailCommande,
                    include: [{model:db.Produit,attributes:['nom','prix']}]
                }
            ],
            order: [
                ['QGNom', 'DESC'],
                ['createdAt', 'ASC']]
        })
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
        Commande.findByPk(id)
            .then(data => {
                if (data){
                    res.send(data)
                } else {
                    res.status(404).send({message:`Commande ${id} introuvable`})
                }
            })
            .catch(err => res.status(500).send({message: err.message || 'error findOne Commande'}))
    },
    update: (req, res) => {
        const id = req.params.id;
    
        Commande.update(req.body, {where:{id:id}})
            .then(num => {
                if (num==1){
                    Commande.findByPk(id)
                        .then(data => {
                            res.status(200).send({
                                message:`Commande ${id} updated`,
                                commande:data
                            })        
                        })
                }
                else {
                    res.status(404).send({message:`Commande ${id} introuvable`})
                }
            })
            .catch(err => res.status(500).send({message:err.message || 'error update Commande'}))
    },
    delete: async (req, res) => {
        const id = req.params.id;
        const data = await Commande.findByPk(id)
        Commande.destroy({where:{id:id}})
            .then(num => {
                if (num==1){
                    res.status(200).send({
                        message:`Commande ${id} deleted`,
                        commande:data
                    })                
                }
                else {
                    res.status(404).send({message:`Commande ${id} introuvable`})
                }
            })
            .catch(err => res.status(500).send({message:err.message}))
    }
    
}
