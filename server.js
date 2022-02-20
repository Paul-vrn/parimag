const express = require('express');
const app = express();
const port = process.env.PORT || 5050;
const cors = require('cors');
const path = require('path');
var cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const SECRET = require('./src/backend/config').SECRET
app.use(cookieParser())

app.use(express.json())
app.use(cors());
const db = require("./src/backend/models/index");
db.sequelize.sync();

app.use(express.static('public'));
app.get('/admin', (req, res) => {
   const token = req.cookies.access_token;
   if (!token) {
      return res.status(403).send({message:"Cookie invalide"});
    }
   jwt.verify(token, SECRET, (err, decodedToken) => {
      if (err) {
          res.status(401).json({ message: 'Error. Bad token' })
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

app.listen(port, () => {
   console.log(`Server is up at port ${port}`);
});