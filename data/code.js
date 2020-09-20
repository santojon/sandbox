/**
 * Example function (code inside as with right aling please!)
 */
function defCode() {
    /**
     * Class to represent Pokémon
     */
    class Pokemon {
        constructor(o) {
            this.name = o.name
            this.number = o.number
        }
    }

    /**
     * Class that represents the Pikachu extending Pokémon class
     */
    class Pikachu extends Pokemon {
        constructor() {
            super({
                name: 'Pikachu',
                number: 25
            })
        }
    }

    // This is a poll to simulate database and represent Pokédex.
    var pokedex = new Bhdr()

    /**
     * This function tests the Pokémon structure created above.
     */
    function fillAndShowPokedex() {
        // map Pokémon to Pokédex
        pokedex.map(Pokemon)

        // create a few Pokémon
        pokemon = [{
            name: 'Charmander',
            number: 4
        },
        {
            name: 'Bulbasaur',
            number: 1
        },
        {
            name: 'Squirtle',
            number: 7
        }
        ]
        pokemon.forEach((p) => {
            new Pokemon({
                name: p.name,
                number: p.number
            }).save()
        })

        // create a pikachu
        new Pikachu().save()

        // show all Pokémon in your Pokédex
        return 'All Pokémon in Pokédex: &ltb&gt&ltsmall&gt&ltcode&gt' +
            Pokemon.findAll().orderBy('number', 'desc').map((p) => {
                return p.name + '(' + p.number + ')'
            }) + '&lt/code&gt&lt/small&gt&lt/b&gt'
    }

    console.log('info.')
    console.warn('warning!')
    console.error('error!!!')
    fillAndShowPokedex()
}

/**
 * Used to get only te code of internal part of function
 */
defCode.asString = function () {
    return defCode.toString()
        .replace(/\t/g, '')
        .replace(/function defCode\(\) {\n/g, '')
        .replace(/fillAndShowPokedex\(\)\n}/g, 'fillAndShowPokedex\(\)')
}