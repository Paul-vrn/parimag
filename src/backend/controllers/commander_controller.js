const db = require('../models')
const Commande = db.Commande
const DetailCommande = db.DetailCommande
const Stock = db.Stock
const Periode = db.Periode
const checkPanier = require('../services/checkPanier').checkPanier

module.exports = {
    create : async (req, res) => {
        
        //checkPanier
        //checkTemps
        const panier = req.body.panier
        if (panier.length <= 0 || req.body.etat!==undefined){
            res.status(400).send({message:"Pas bon"})
            return
        }
        const commande = {
            trajets:req.body.trajets,
            tel:req.body.tel,
            panier:req.body.panier,
            adresse:req.body.adresse.description,
            couverts:req.body.couverts,
            commentaire:req.body.commentaire,
            QGNom:req.body.qg.nom,
            etat:"EAP",
            personne:req.body.personne
        }
        
        let onlyGoodies = true
        panier.forEach(prod => {
            if (prod.type!=="Goodies"){
                onlyGoodies = false
            }
        })
        let inPeriode = false
        const today = new Date()
        const periodes = await Periode.findAll();
        periodes.forEach(per => {
            per.start= new Date(per.start)
            per.end = new Date(per.end)
            if (per.start < today && today < per.end){
                inPeriode = true;        
            }
        })
        if (!onlyGoodies){
            if (!inPeriode){
                res.status(400).send({message:"No no no, tu ne peux commander à cette période"})
                return
            }    
        }
        const checkPan = checkPanier(panier)
        if (!checkPan) {
            res.status(400).send({message:"Commande pas possible."})
            return
        }
        commandeFait = await Commande.create(commande)
        let test,test2;
        await panier.forEach(async (produit) => {
            test = await DetailCommande.create({
                produitId:produit.id,
                commandeId:commandeFait.id,
                quantite:produit.quantite
            })
            if (produit.type!=="Service"){
                let st = produit.stocks.find(stock => stock.QGNom===commandeFait.QGNom)
                //update stock
                test2 = await Stock.update({
                    quantite:st.quantite-produit.quantite
                }, {where:{id:st.id}})
            }
        });
        res.status(200).send({id:commandeFait.id})
    }
}