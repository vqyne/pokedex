//import { default as Pokemon } from './Pokemon.js';
//import PokemonHandler from './PokemonHandler.js';

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use(express.static('assets'));

//var pokemonHandler = new PokemonHandler();

const file = 'data.txt';

fs.writeFile(file, '', (err) => {
    if (err) throw err;
    console.log('Le fichier de sauvegarde a été crée')
});



/*app.get("/", function (req, res) {
    let pokemons = pokemonHandler.getAllPokemons()
    res.render("index", {
        pokemons: pokemons,
        abilities: [],
        types: []
    });
});*/

//route for index page
app.get("/", function (req, res) {
    res.render("index");
  });
  
  //route for magic page
  app.get("/magic", function (req, res) {
    res.render("magic");
  });
  
/*
app.post("/add_pokemon", function(req,res){
    pokemonHandler.createPokemon(req.body.nom,req.body.types,req.body.abilities)
    res.redirect("/")
})

app.post("/delete_pokemon/:id", function(req,res){
    pokemonHandler.deletePokemon(req.params.id)
    res.redirect("/")
})

app.post("/update_pokemon", function(req,res){
    pokemonHandler.updatePokemon(req.body.key,req.body.nom,req.body.types,req.body.abilities)
    res.redirect("/")
})
*/

app.listen(port, () => {
    console.log(`L'application Pokedex est disponible sur le port : ${port}`)
});