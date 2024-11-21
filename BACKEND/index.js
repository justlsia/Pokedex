// Librairies
import fs, { read } from 'fs';
import express from 'express';
import cors from 'cors';
import path from 'path'; // Gérer des chemins d'accès 

// Chemins des fichiers de données
const POKEDEX_SRC = "./DATA/pokedex.json";      
const IMAGES_SRC = "./FILES/images";
const MOVES_SRC = "./DATA/moves.json";
const TYPES_SRC = "./DATA/types.json";
const PORT = 5001;

const app = express();

// Récupérer les images "statiquement" dans le dossier des images 
app.use('/images', express.static(path.resolve(IMAGES_SRC))); 
// Définir la route des images (fichier statique) dans le dossier : images 
// express.static : servir ressources statiques (paramétre : nom du répertoires des ressources) 
// resolve : transormer le chemin relatif en absolu (garantie l'execution du script peut importe de dossier d'execution)



app.listen(
    PORT,
    '0.0.0.0',
    () => {
        console.log('Server Pokedex is listening on http://172.16.201.254:' + PORT);
    }
)

app.use(cors());

// Renvoyer tous les pokémon
const findAllPokemon = (req, res) => {

    // Vérifier clé api
    if (req.query.apikey !== "OFJELOGJyulkg5erg9*gsj@efhbE5") {
        res.status(401).send('Erreur, API key incorrect');
        return;
    }

    // Lecture du fichier
    const datas = fs.readFileSync(POKEDEX_SRC)

    // Récupération des données
    const pokedex = JSON.parse(datas)

    // Envoi des données
    res.send(pokedex)
}

// Renvoyer un pokémon au hasard
const findRandomPokemon = (req, res) => {

    // Vérifier clé api
    if (req.headers.apikey !== "OFJELOGJyulkg5erg9*gsj@efhbE5") {
        res.status(401).send('Erreur, API key incorrect');
        return;
    }

    // Lecture du fichier
    const datas = fs.readFileSync(POKEDEX_SRC)

    // Récupération des données
    const pokedex = JSON.parse(datas)
    const randomPokemon = pokedex[Math.floor(Math.random() * pokedex.length)];
    
    // Envoi des données
    res.send(randomPokemon)
}

// Renvoyer un pokémon selon son id
const findPokemonById = (req, res) => {
    // Lecture du fichier
    const datas = fs.readFileSync(POKEDEX_SRC)
   
    // Récupération des données
    const pokedex = JSON.parse(datas)
    const id = req.params.id
    const pokemon = pokedex.find(pokemon => pokemon.id == id)
    
    // Envoi des données
    if (pokemon) {res.send(pokemon)} 
    else {res.status(404).send('Erreur, pokemon pas trouvé!')}
}

// Renvoyer un pokémon selon son nom
const findPokemonByName = (req, res) => {
    const datas = fs.readFileSync(POKEDEX_SRC)
    const pokedex = JSON.parse(datas) // Parse en JSON
    const name = req.params.name
    const pokemon = pokedex.find(pokemon => pokemon.name.french.toLowerCase() == name.toLowerCase())
 
    // Envoi des données
    //if (pokemon) {res.send(pokemon)} 
    //else {res.status(404).send('Erreur, pokemon pas trouvé!')}

    // Envoi des données
    if (pokemon) {

        // Formater l'id pour correspondre au nom du fichier (ex : 1 = "001.png")
        const formatId = pokemon.id.toString().padStart(3, '0'); // Formater l'image
        const imagePath = `/images/${formatId}.png`; // Chemin de l'image du pokémon

        // Vérifier si l'image existe 
        // Chemin/FILES/IMAGES/0xx.png
        if (fs.existsSync(path.join(IMAGES_SRC, `${formatId}.png`))) {
            pokemon.image = `http://localhost:${PORT}${imagePath}`;
        } else {
            pokemon.image = null;  // Image non trouvée
        }
        
        res.send(pokemon);
    } else {
        res.status(404).send('Erreur, pokemon non trouvé!');
    }
}

// Renvoyer tous les pokémon selon un type (ex : Flying, Fire...)
const findPokemonByType = (req, res) => {
    // Lecture du fichier
    const datas = fs.readFileSync(POKEDEX_SRC)
    const pokedex = JSON.parse(datas)
    const type = req.params.type
    const pokemon = pokedex.filter(pokemon => pokemon.type == type)

    // Envoi des données
    if (pokemon) {res.send(pokemon)} 
    else {res.status(404).send('Erreur, type non trouvé!')}

}

// Renvoyer tous les pokémon qui ont une défense = 70 - En cours
const findPokemonByPointOfDefense = (req, res) => {
    // Lecture du fichier
    const datas = fs.readFileSync(POKEDEX_SRC)
    const pokedex = JSON.parse(datas)
    const defensePoint = req.params.base.Defense
    //

}


// Chemins des requêtes navigateur
app.get('/', findAllPokemon);
app.get('/hasard', findRandomPokemon);
app.get('/pokemon/:id(\\d+)', findPokemonById); // para chiffres
app.get('/pokemon/:name(\\w+)', findPokemonByName); // para string

app.get('/pokemon/types/:type(\\w+)', findPokemonByType); // para string
