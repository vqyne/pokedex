import express from 'express';
import bodyParser from 'body-parser';
import { readFileSync, writeFile, existsSync } from 'fs';
import PokemonMethod from './assets/js/PokemonMethod.js';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static('assets'));

// Read the JSON file containing the types and abilities data
const typesData = readFileSync('./assets/json/types.json', 'utf8');
const types = JSON.parse(typesData);

const abilitiesData = readFileSync('./assets/json/abilities.json', 'utf8');
const abilities = JSON.parse(abilitiesData);

const file = 'data.txt';

if (!existsSync(file)) {
    writeFile(file, '', (err) => {
        if (err) throw err;
        console.log('Le fichier de sauvegarde a été crée');
    });
}

const pokemonMethod = new PokemonMethod(file);

app.listen(port, () => {
    console.log(`L'application Pokedex est disponible sur le port : ${port}`);
});

app.get('/', function (req, res) {
    let pokemons = pokemonMethod.getAllPokemons();
    res.render('index', {
        pokemons: pokemons,
        abilities: abilities,
        types: types,
    });
});

app.post('/add', function (req, res) {
    pokemonMethod.createPokemon(
        req.body.name, 
        req.body.abilities, 
        req.body.types);
    res.redirect('/');
});

app.post('/delete', function (req, res) {
    const id = parseInt(req.body.id);
    pokemonMethod.deletePokemon(id);
    res.redirect('/');
});

app.post('/update', function (req, res) {
    pokemonMethod.updatePokemon(
        parseInt(req.body.id),
        req.body.name,
        req.body.types,
        req.body.abilities);
    res.redirect('/');
});