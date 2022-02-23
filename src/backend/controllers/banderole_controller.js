const db = require('../models')
const Banderole = db.Banderole

module.exports = {
    create: (req, res) => {
        const banderole = {
            message:req.body.message
        }
        Banderole.create(banderole)
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => {
                res.status(500).send({message:err})
            })
    },
    findAll: (req, res) => {
        Banderole.findAll()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error findAll Banderole"
                })
            })
    },
    findOne: (req, res) => {
        const id = req.params.id;
        Banderole.findByPk(id)
            .then(data => {
                if (data){
                    res.send(data)
                } else {
                    res.status(404).send({message:`Banderole ${id} introuvable`})
                }
            })
            .catch(err => res.status(500).send({message: err.message || 'error findOne Banderole'}))
    },
    update: (req, res) => {
        const id = req.params.id;
    
        Banderole.update(req.body, {where:{id:id}})
            .then(num => {
                if (num==1){
                    Banderole.findByPk(id)
                        .then(data => {
                            res.status(200).send({
                                message:`Banderole ${id} updated`,
                                banderole:data
                            })        
                        })
                }
                else {
                    res.status(404).send({message:`Banderole ${id} introuvable`})
                }
            })
            .catch(err => res.status(500).send({message:err.message || 'error update Commande'}))
    }
}