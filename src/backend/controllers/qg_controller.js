const db = require('../models')
const Qg = db.Qg

const jwt = require('jsonwebtoken')
const SECRET = require('../config').SECRET;

module.exports = {
    populate: (req, res) => {
        const qgs = require('../data/qg.json')
        const result = []
      
        qgs.forEach(async qg => {
            try {
                result.push(await Qg.create(qg))
            } catch (err) {
                console.log(err)
            }
        })    
        res.status(200).send(result)
    },
    findAll: (req, res) => {
        Qg.findAll()
            .then(data => {
                res.send(data)
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error findAll Qg"
                })
            })
    },
    auth: (req, res) => {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({ message: 'Error. Please enter the correct username and password' })
        }
        Qg.findOne({where:{nom:req.body.username, password:req.body.password}})
            .then(result => {
                if (result === null){
                    return res.status(400).json({ message: 'Error. Wrong login or password' })
                } 
                const token = jwt.sign({
                    id: result.nom
                 }, SECRET, { expiresIn: '3 hours' })
                 return res.cookie("access_token", token).json({ access_token: token })        
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || "Error findOne d'Auth"
                })
            })
     }
}
