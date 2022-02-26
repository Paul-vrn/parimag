const db = require('../models')
const Stock = db.Stock
const Qg = db.Qg
const Produit = db.Produit
module.exports = {
    populate: (req, res) => {
        Qg.findAll()
        .then(qgs => {
            Produit.findAll()
            .then(produits => {
                produits.filter(prod => prod.type!=='Service')
                .forEach(produit => {
                    
                    qgs.forEach(qg => {
                        Stock.create({
                            quantite:50,
                            QGNom:qg.nom,
                            produitId:produit.id
                        })
                    })
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error populate2"
                })
            })
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error populate1"
            })
        })
        res.status(200).send({message:"populate stocks"})
    },
    create: (req, res) => {
        const stock = {
            quantite:req.body.quantite,
            QGNom:req.body.QGNom,
            produitId:req.body.produitId
        }
        Stock.findOne({ where: {QGNom:stock.QGNom, produitId:stock.produitId}})
            .then(dat => {
                if (dat === null){
                    Stock.create(stock)
                    .then(data => {
                        res.send(data);
                    })
                    .catch(err => {
                        res.status(500).send({
                            message: err.message || "Error création Stock"
                        })
                    })        
                } else {
                    res.status(400).send({message:"Il existe déjà un stock"})
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error fondOne"
                })
            })
    },
    findAll: (req, res) => {
        Stock.findAll({
            order: [
                ['produitId', 'ASC'],
                ['QGNom', 'ASC']
            ],
            include: [
                {
                    model:db.Qg,
                    attributes:['nom']
                },
                {
                    model:db.Produit,
                    attributes:['nom']
                }
            ]
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
        Stock.findByPk(id)
            .then(data => {
                if (data){
                    res.send(data)
                } else {
                    res.status(404).send({message:`Stock ${id} introuvable`})
                }
            })
            .catch(err => res.status(500).send({message: err.message || 'error findOne DetailCommande'}))
    },
    update: (req, res) => {
        const id = req.params.id;
        Stock.update(req.body, {where:{id:id}})
            .then(num => {
                if (num==1){
                    Stock.findByPk(id)
                        .then(data => {
                            res.status(200).send({
                                message:`Stock ${id} updated`,
                                stock:data
                            })        
                        })
                }
                else {
                    res.status(404).send({message:`Stock ${id} introuvable`})
                }
            })
            .catch(err => res.status(500).send({message:err.message || 'error update Commande'}))
    },
    delete: async (req, res) => {
        const id = req.params.id;
        const data = await Stock.findByPk(id)
        Stock.destroy({where:{id:id}})
            .then(num => {
                if (num==1){
                    res.status(200).send({
                        message:`Stock ${id} deleted`,
                        stock:data
                    })                
                }
                else {
                    res.status(404).send({message:`Stock ${id} introuvable`})
                }
            })
            .catch(err => res.status(500).send({message:err.message}))
    },
    deleteAll: (req, res) => {
        Stock.destroy({ truncate: true, restartIdentity: true })
        .then(() => {
            res.status(200).send({message:"delete all stocks"})
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Error deleteAll"
            })
        })
    }
}
