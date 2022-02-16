const db = require('../models')
const Livreur = db.Livreur

module.exports = {
    populate: (req, res) => {
        const livreurs = require('../data/livreurs.json')
        const result = []
      
        livreurs.forEach(async livreur => {
            try {
                result.push(await Livreur.create(livreur))
            } catch (err) {
    
            }
        })    
        res.status(200).send(result)
    },
    findAll: (req, res) => {
        Livreur.findAll()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error findAll Livreur"
                })
            })
    },
    findOne: (req, res) => {
        const id = req.params.id;
        Livreur.findByPk(id)
            .then(data => {
                if (data){
                    res.send(data)
                } else {
                    res.status(404).send({message:`Livreur ${id} introuvable`})
                }
            })
            .catch(err => res.status(500).send({message: err.message || 'error findOne Livreur'}))
    },
    update: (req, res) => {
        const id = req.params.id;
    
        Livreur.update(req.body, {where:{id:id}})
            .then(num => {
                if (num==1){
                    Livreur.findByPk(id)
                        .then(data => {
                            res.status(200).send({
                                message:`Livreur ${id} updated`,
                                livreur:data
                            })        
                        })
                }
                else {
                    res.status(404).send({message:`Livreur ${id} introuvable`})
                }
            })
            .catch(err => res.status(500).send({message:err.message || 'error update Commande'}))
    }
}