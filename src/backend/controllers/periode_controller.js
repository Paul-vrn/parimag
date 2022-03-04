const db = require('../models')
const Periode = db.Periode
module.exports = {
    populate: (req, res) => {
        const periodes = require('../data/periodes.json')
        const result = []
        periodes.forEach(async periode => {
            try {
                result.push(await Periode.create(periode))
            } catch (err) {
                console.log(err)
            }
        })    
        res.status(200).send(result)
    },
    create: (req, res) => {
        const periode = {
            start:req.body.start,
            end:req.body.end
        }
        Periode.create(periode)
            .then(data => {
                res.status(200).send(data)
            })
            .catch(err => {
                res.status(500).send({message:err})
            })
    },
    findAll: (req, res) => {
        Periode.findAll()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error findAll Periode"
                })
            })
    },
    findOne: (req, res) => {
        const id = req.params.id;
        Periode.findByPk(id)
            .then(data => {
                if (data){
                    res.send(data)
                } else {
                    res.status(404).send({message:`Periode ${id} introuvable`})
                }
            })
            .catch(err => res.status(500).send({message: err.message || 'error findOne Periode'}))
    },
    update: (req, res) => {
        const id = req.params.id;
    
        Periode.update(req.body, {where:{id:id}})
            .then(num => {
                if (num==1){
                    Periode.findByPk(id)
                        .then(data => {
                            res.status(200).send({
                                message:`Periode ${id} updated`,
                                periode:data
                            })        
                        })
                }
                else {
                    res.status(404).send({message:`Periode ${id} introuvable`})
                }
            })
            .catch(err => res.status(500).send({message:err.message || 'error update Periode'}))
    }
}