const db = require('../models')
const Qg = db.Qg

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
    }
}
