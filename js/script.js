AOS.init();

// Obetener valores desde la API
const fetchData = async (id) =>{
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await resp.json()

        // Creando el objeto pokemon
        const pokemon = {
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
            imgCvg: data.sprites.other.dream_world.front_default,
            name: data.name,
            xp: data.base_experience,
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            special: data.stats[3].base_stat,
            type1: data.types[0].type.name,
        }

        if(data.types[1] == undefined) data.types[1] = ''
        else{
            const type2 = {type2: data.types[1].type.name}
            Object.assign(pokemon, type2)
        }

        // Dibuja una tarjeta con el pokemon desde su id
        drawCard(pokemon)
        // console.log(pokemon);
}

// Funcion para dibujar la carta con los aatos del pokemon
const drawCard = (pokemon) =>{
    const flex = document.querySelector('.flex')
    const template = document.getElementById('card').content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()

    clone.querySelector('.card-body-img').setAttribute('src', pokemon.imgCvg)
    clone.querySelector('.card-body-title').innerHTML = `${pokemon.name} <span>${pokemon.hp}hp</span>`
    clone.querySelector('.card-body-text').textContent = pokemon.xp + ' exp'
    clone.querySelectorAll('.card-footer-social h3')[0].textContent = pokemon.attack + 'K'
    clone.querySelectorAll('.card-footer-social h3')[1].textContent = pokemon.special + 'K'
    clone.querySelectorAll('.card-footer-social h3')[2].textContent = pokemon.defense + 'K'
    clone.querySelectorAll('.card-footer-type span')[0].textContent = pokemon.type1
    clone.querySelectorAll('.card-footer-type span')[1].textContent = pokemon.type2

    fragment.appendChild(clone)
    flex.appendChild(fragment)
}

// Funcion para filtrar si hay coincidencia en el selector con lo que se escribe en el input
const filtrarPokemon = (input, selector) =>{
    document.onkeyup = (e) =>{
        if(e.target.matches(input.toLowerCase())){
            if(e.key == 'Escape') e.target.value = ''

            // Filtro para buscar las coincidencias
            document.querySelectorAll(selector).forEach(el =>el.textContent.includes(e.target.value)
                ?el.classList.remove('filter')
                :el.classList.add('filter'))
        }
    }
}

// Funcion para imprimir la cantidad de pokemones segun el tamaño del array
const printInDOM = () => {
    let cont = 1
    while(cont <= 100){
        fetchData(cont)
        cont++
    }
}

// Busca en card-filter todos los elementos que tengan la clase card
filtrarPokemon('.card-filter', '.card')
printInDOM()