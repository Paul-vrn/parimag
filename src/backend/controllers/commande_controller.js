const db = require('../models')
const Commande = db.Commande

exports.create = (req, res) => {
    const commande = {
        code:req.body.code,
        adresse:req.body.adresse,
        tel:req.body.tel,
        etat:req.body.etat
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
}
exports.findAll = (req, res) => {
    Commande.findAll()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error findAll"
            })
        })
}
exports.findOne = (req, res) => {
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
}

exports.update = (req, res) => {
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
}
exports.delete = async (req, res) => {
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
