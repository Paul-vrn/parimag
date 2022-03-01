const db = require('../models')
const Commande = db.Commande

module.exports = {
    create:(req, res) => {
        const commande = {
            code:req.body.code,
            personne:req.body.personne,
            adresse:req.body.adresse,
            tel:req.body.tel,
            etat:req.body.etat,
            trajets:req.body.trajets,
            commentaire:req.body.commentaire
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
                ['updatedAt', 'DESC']]
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
        const code = req.params.code;
        Commande.findByPk(code)
            .then(data => {
                if (data){
                    res.send(data)
                } else {
                    res.status(404).send({message:`Commande ${code} introuvable`})
                }
            })
            .catch(err => res.status(500).send({message: err.message || 'error findOne Commande'}))
    },
    update: (req, res) => {
        const code = req.params.code;
    
        Commande.update(req.body, {where:{code:code}})
            .then(num => {
                if (num==1){
                    Commande.findByPk(code)
                        .then(data => {
                            res.status(200).send({
                                message:`Commande ${code} updated`,
                                commande:data
                            })        
                        })
                }
                else {
                    res.status(404).send({message:`Commande ${code} introuvable`})
                }
            })
            .catch(err => res.status(500).send({message:err.message || 'error update Commande'}))
    },
    delete: async (req, res) => {
        const code = req.params.code;
        const data = await Commande.findByPk(code)
        Commande.destroy({where:{code:code}})
            .then(num => {
                if (num==1){
                    res.status(200).send({
                        message:`Commande ${code} deleted`,
                        commande:data
                    })                
                }
                else {
                    res.status(404).send({message:`Commande ${code} introuvable`})
                }
            })
            .catch(err => res.status(500).send({message:err.message}))
    }
    
}
