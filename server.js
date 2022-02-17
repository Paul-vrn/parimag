const express = require('express');
const app = express();
const port = process.env.PORT || 5050;
const cors = require('cors');
const path = require('path');
const checkTokenMiddleware = require('./src/backend/routes/middleware').checkTokenMiddleware;
app.use(express.json())
app.use(cors());
const db = require("./src/backend/models/index");
db.sequelize.sync({alter:true});


app.use(express.static('public'));
app.get('/admin', checkTokenMiddleware, (req, res) => {
   res.sendFile(path.resolve(__dirname, 'public', 'admin.html'))
})

var apiRoutes = require('./src/backend/routes/api.js');
app.use('/api', apiRoutes)

app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
   console.log(`Server is up at port ${port}`);
});