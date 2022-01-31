const express = require('express');
const app = express();
const port = process.env.PORT || 5050;
const cors = require('cors');
const path = require('path');

app.use(cors());

const db = require("./src/model/index")
db.sequelize.sync()

app.use(express.static('public'));

app.get('/login', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'public', 'login.html'))
})
app.get('/api/liste', (req, res) => {
   res.status(200).json(require('./src/data/liste.json'))
})

app.get('/api/*', (req, res) => {
   res.status(404).send("Mauvaise route")
})
app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});


app.listen(port, () => {
   console.log(`Server is up at port ${port}`);
});