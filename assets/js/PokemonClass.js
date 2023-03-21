class Pokemon {
    constructor(id, name, ability, type){
        this.id = id;
        this.name = name;
        this.ability = ability;
        this.type = type;
    }

    toString() { //method in order to produce data in a json format
        return JSON.stringify({
            id: this.id,
            name: this.name,
            ability: this.ability,
            type: this.type
        });
    }

}


export default Pokemon