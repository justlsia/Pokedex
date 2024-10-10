/**
* Serveur Backend Pokedex
*/
//console.log ("Hello World!");
// Définir l'emplacement des fichiers bases de données
const POKEDEX_SRC = "./DATA/pokedex.json";

// Définir l'emplacement des images
const IMAGES_SRC = "./FILES/images";

// Définir un port
const PORT = 5001;


// ************************************************

// Lancer un serveur express sur un port défini
const fs = require('fs');

// npm install express
const express = require('express');
const app = express();

// Lancement du serveur et attendre
app.listen(
    PORT,
    '127.0.0.1',
    () => {
        console.log('Server Pokedex is listening on ' + PORT);
    }
)


// Créer les routes

// Créer le chemin racine
app.all('/', (req, res, next) => {
    console.log('Accessing the root page ...');
    next() // pass control to the next handler
})

// Afficher le chemin racine à l'accueil du site
// GET method route
app.get('/', (req, res) => {
    res.send('Bienvenue sur la page principales');
})

// Créer le chemin hasard
app.get('/hasard', (req, res) => {
    res.send('Page hasard')
})

