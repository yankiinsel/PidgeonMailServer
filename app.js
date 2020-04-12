const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const firebaseConfig = require('./env.js');
const routes = require('./api/routes/index.js'); // Importing route definitions
const PORT = 3001;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.json({
    limit: '100mb',
    extended: true
}));
app.use(bodyParser.urlencoded({
    limit: '100mb',
    extended: true
}));

var firebase = require("firebase");
firebase.initializeApp(firebaseConfig);

routes(app);
app.listen(PORT, () => console.log('App running @' + PORT));

module.exports.db = firebase.database();