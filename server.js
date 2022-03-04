const express = require('express');
const app = express();
const port = process.env.PORT || 5050;
const cors = require('cors');
const path = require('path');
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const SECRET = require('./src/backend/config').SECRET
const runMiddleware = require('run-middleware');
runMiddleware(app)
app.use(cookieParser())

app.use(express.json())
app.use(cors());
const db = require("./src/backend/models/index");
db.sequelize.sync()
   .then(() => {
      populate()
   })

app.use(express.static('public'));
app.get('/admin', (req, res) => {
   const token = req.cookies.access_token;
   if (!token) {
      res.redirect('/login')
      return
    }
   jwt.verify(token, SECRET, (err, decodedToken) => {
      if (err) {
          res.redirect('/login')
      } else {
         res.sendFile(path.resolve(__dirname, 'public', 'admin.html'))
      }
  })
})

var apiRoutes = require('./src/backend/routes/api.js');
app.use('/api', apiRoutes)

app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

// populate
async function populate(){
   const qgs = await db.Qg.findAll();
   if (!(qgs.length > 0)){
      await app.runMiddleware('/api/qgs/populate', {method:'get',headers:{SECRET:SECRET}})  
      await app.runMiddleware('/api/produits/populate', {method:'get',headers:{SECRET:SECRET}})
      await app.runMiddleware('/api/livreurs/populate', {method:'get',headers:{SECRET:SECRET}})
      await app.runMiddleware('/api/stocks/populate', {method:'get',headers:{SECRET:SECRET}})
      await app.runMiddleware('/api/periodes/populate', {method:'get', headers:{SECRET:SECRET}})
      await app.runMiddleware('/api/banderoles', {
         method:'post',
         headers:{SECRET:SECRET},
         body:{message:""}
      })   
   }
}

app.listen(port, () => {
   console.log(`Server is up at port ${port}`);
});