const express = require('express');
const app = express();
const port = process.env.PORT || 5050;
const cors = require('cors');
const path = require('path');

app.use(cors());

const db = require("./src/backend/model/index")
db.sequelize.sync()

app.use(express.static('public'));

app.get('/login', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'public', 'login.html'))
})

var apiRoutes = require('./src/backend/routes/api.js');
app.use('/api', apiRoutes)

app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});


app.listen(port, () => {
   console.log(`Server is up at port ${port}`);
});