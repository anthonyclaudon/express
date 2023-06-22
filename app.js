const express = require('express');
const path = require('path');
const axios = require('axios');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
});

connection.connect((err) => {
    if (err) {
      console.error('Erreur de connexion à la base de données :', err);
      return;
    }
    console.log('Connecté à la base de données MySQL');
});

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('public'));

// À rajouter sinon erreurs CORS (Cross Origin Resource Sharing)
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

    next();
});

app.use('/snake', (req, res) => {
    const currentPage = 'snake';
    res.render('snake', { currentPage });
})

app.get('/api/stuff', (req, res, next) => {
    const query = 'SELECT * FROM items';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Erreur lors de l\'exécution de la requête :', err);
            return;
        }
        
        res.status(200).json(results)
    });
});

app.use('/', (req, res) => {
    const currentPage = 'accueil';
    res.render('index', { currentPage });
});

module.exports = app;