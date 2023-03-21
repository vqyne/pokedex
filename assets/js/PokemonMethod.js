import Pokemon from './PokemonClass.js';
import fs from 'fs';
const list = 'data.txt'; // File that will be containing all pokemons data



class PokemonMethod {

    constructor(list) {
        this.id = 0;
        this.list = list;
    }

    createPokemon(name, ability, type) {
        this.id++; // We add 1 to the value of the id each time a new pokemon is created
        let newPokemon = new Pokemon(this.id, name, ability, type);
        let data = newPokemon.toString() + '\n';
        fs.appendFileSync(this.list, data); // Append data in txt file
    }

    getAllPokemons() {
        let data = fs.readFileSync(this.list, 'utf8');
        let objArray = data.split('\n').filter((obj) => obj !== '');
        return objArray.map((obj, i) => {
            let values = JSON.parse(obj);
            if (i === objArray.length - 1) {
                this.id = values.id;
            }
            return new Pokemon(values.id, values.name, values.ability, values.type);
        });
    }

    deletePokemon(id) {
        let all = this.getAllPokemons();
        let updatedPokemons = all.filter(pokemon => pokemon.id !== id);
        let data = updatedPokemons.map(pokemon => pokemon.toString()).join('\n') + '\n';
        fs.writeFileSync(this.list, data);
    }

    updatePokemon(id, name, type, ability) {
        let all = this.getAllPokemons();
        let updatedPokemons = all.map(pokemon => {
            if (pokemon.id === id) {
                return new Pokemon(id, name || pokemon.name, ability || pokemon.ability, type || pokemon.type);
            }
            return pokemon;
        });
        let data = updatedPokemons.map(pokemon => pokemon.toString()).join('\n') + '\n';
        fs.writeFileSync(this.list, data);
    }
}

export default PokemonMethod;