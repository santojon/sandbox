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
            this.image = 'https://img.pokemondb.net/artwork/large/' + o.name + '.jpg'
        }
    }

    // This is a poll to simulate database and represent Pokédex.
    var pokedex = new Bhdr()

    /**
     * This function tests the Pokémon structure created above.
     */
    function fillPokedex() {
        // map Pokémon to Pokédex
        pokedex.map(Pokemon)

        // create a few Pokémon
        $.get('https://pokeapi.co/api/v2/pokemon?limit=10000', (data) => {
            data.results.forEach((p, i) => {
                var urlParts = p.url.split('/')
                new Pokemon({
                    name: p.name,
                    number: parseInt(urlParts[urlParts.length - 2])
                }).save()
            })

            console.log(showPokedex())
        })
    }

    function showPokedex() {
        // show all Pokémon in your Pokédex
        return 'All Pokémon in Pokédex:<br>' +
            Pokemon.findAll().orderBy('number', 'asc').map((p) => {
                return '&ltdiv class="well" style="width: 250px; float: left; margin: 5px"&gt&ltb style="color: black"&gt' + p.name + '(' + p.number + ')&lt/b&gt'
                 + '&ltimg style="width: 200px; height: 200px" src="' + p.image + '"&gt&lt/div&gt'
            }).join('')
    }

    fillPokedex()
}

/**
 * Used to get only te code of internal part of function
 */
defCode.asString = function () {
    return defCode.toString()
        .replace(/function defCode\(\) {\n/g, '')
        .replace(/fillAndShowPokedex\(\)\n}/g, 'fillAndShowPokedex\(\)')
}
