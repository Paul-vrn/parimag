const db = require('../models')
const Produit = db.Produit
const csv = require('csv-parser')
const fs = require('fs')
const path = require('path')
module.exports = {
    populate: (req, res) => {
        fs.createReadStream(path.resolve(__dirname, '..', 'data', 'produits.csv'))
        .pipe(csv())
        .on('data', (data) => {
            Produit.create({
                nom:data.nom,
                type:data.type,
                prix:(data.prix==="")?null:data.prix,
                ingredients:(data.ingredients==="") ? null : data.ingredients,
                vege:(data.vege==="TRUE") ? true : false,
                halal:(data.halal==="TRUE") ? true : false,
                quantiteMax:(data.quantiteMax==="") ? null : data.quantiteMax,
                description:data.description,
                plat_du_jour:(data.plat_du_jour==="TRUE") ? true : false,
                photo:data.photo,
                sous_titre:data.sous_titre
            })
        })
        .on('end', () => {
            res.status(200).send({message:"Table produit remplie"})
        })    
    },
    create: (req, res) => {
        const produit = {
            nom:req.body.nom,
            type:req.body.type,
            prix:(req.body.prix==="") ? null : req.body.prix,
            ingredients:req.body.ingredients,
            vege:req.body.vege,
            halal:req.body.halal,
            quantiteMax:req.body.quantiteMax,
            description:req.body.description,
	    plat_du_jour:req.body.plat_du_jour,
            photo:req.body.photo,
            sous_titre:req.body.sous_titre
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
        Produit.findAll({
            include: [
                {
                    model:db.Stock,
                }
            ],
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
