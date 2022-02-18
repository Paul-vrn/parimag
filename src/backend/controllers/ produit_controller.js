const res = require('express/lib/response')
const db = require('../models')
const Produit = db.Produit

module.exports = {
    populate: (req, res) => {
        console.log("populate produit")
        produits = require('../data/produits.json')
        console.log(produits)    
    },
    create: (req, res) => {
        const produit = {
            nom:req.body.nom,
            type:req.body.type,
            prix:req.body.prix,
            ingredients:req.body.ingredients,
            vegan:req.body.vegan,
            halal:req.body.halal,
            description:req.body.description
        }
        Produit.create(produit)
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error création produit"
                })
            })
    },
    findAll: (req, res) => {
        Produit.findAll()
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
        Produit.findByPk(id)
            .then(data => {
                if (data){
                    res.send(data)
                } else {
                    res.status(404).send({message:`Produit ${id} introuvable`})
                }
            })
            .catch(err => res.status(500).send({message: err.message || 'error findOne Produit'}))
    },
    update: (req, res) => {
        const id = req.params.id;
    
        Produit.update(req.body, {where:{id:id}})
            .then(num => {
                if (num==1){
                    Produit.findByPk(id)
                        .then(prod => {
                            res.status(200).send({
                                message:`Produit ${id} updated`,
                                produit: prod
                            })        
                        })
                }
                else {
                    res.status(404).send({message:`Produit ${id} introuvable`})
                }
            })
            .catch(err => res.status(500).send({message:err.message || 'error update Produit'}))
    },
    delete: async (req, res) => {
        const id = req.params.id;
        const prod = await Produit.findByPk(id)
        Produit.destroy({where:{id:id}})
            .then(num => {
                if (num==1){
                    res.status(200).send({
                        message:`Produit ${id} deleted`,
                        produit:prod
                    })                
                }
                else {
                    res.status(404).send({message:`Produit ${id} introuvable`})
                }
            })
            .catch(err => res.status(500).send({message:err.message}))
    }
}