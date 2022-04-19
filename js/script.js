AOS.init()

// Funcion simple para ahorrar codigo
const crearElemento = (str) => document.createElement(str)

// Obetener valores desde la API
const fetchData = async (id) =>{
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await resp.json()

        // Creando el objeto pokemon
        const pokemon = {
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
            imgCvg: data.sprites.front_default ,
            name: data.name,
            xp: data.base_experience,
            hp: data.stats[0].base_stat,
            weight: data.weight,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            special: data.stats[3].base_stat,
            type1: data.types[0].type.name
        }

        if(data.types[1] == undefined) data.types[1] = null
        else{
            const type2 = {type2: data.types[1].type.name}
            Object.assign(pokemon, type2)
        }

        // Dibuja una tarjeta con el pokemon desde su id
        drawCard(pokemon)
        // console.log(data);
    }

// Funcion para dibujar la carta con los aatos del pokemon
const drawCard = (pokemon) =>{
    const flex = document.querySelector('.flex')

    // Card container
    const card = crearElemento('div')
    card.className = 'card'

    // Card Body
    const cardBody = crearElemento('div')
    cardBody.className = 'card-body'

    // Imagen
    const cardBodyImg = crearElemento('img')
    cardBodyImg.className = 'card-body-img'
    cardBodyImg.src = pokemon.imgCvg
    
    // Titulo
    const cardBodyTitle = crearElemento('h1')
    cardBodyTitle.className = 'card-body-title'
    cardBodyTitle.textContent = `${pokemon.name} ${pokemon.hp}hp`

    // XP
    const cardXP = crearElemento('span')
    cardXP.className = 'card-body-xp'
    cardXP.textContent = `${pokemon.xp} XP`

    // Peso
    let weight = String(pokemon.weight)
    let length = weight.length
    let lastChar = /[a-z]/.test(weight.slice(length-1)) ? weight.slice(length-1).toUpperCase() : weight.slice(length-1)
    weight = [weight.slice(0, length-1), ",", lastChar].join('')

    const pokePeso = crearElemento('div')
    pokePeso.className = 'card-footer-weight'
    const pokePesoSpan = crearElemento('span')
    pokePesoSpan.className = 'weight'
    pokePesoSpan.innerHTML = `Peso: <b>${weight} kg</b>`
    pokePeso.appendChild(pokePesoSpan)


    // Footer
    const cardInfo = crearElemento('div')
    cardInfo.className = 'card-footer'

    // Ataque Contenedor
    const divAttack = crearElemento('div')
    divAttack.className = 'card-footer-social'
    // h3
    const h3Attack = crearElemento('h3')
    h3Attack.innerHTML = pokemon.attack+'k'
    divAttack.appendChild(h3Attack)
    // p
    const pAttack = crearElemento('p')
    pAttack.innerHTML = 'Ataque'
    divAttack.appendChild(pAttack)
    
    // Ataque Especial Contenedor
    const divSpecial = crearElemento('div')
    divSpecial.className = 'card-footer-social'
    // h3
    const h3Special = crearElemento('h3')
    h3Special.innerHTML = pokemon.special+'k'
    divSpecial.appendChild(h3Special)
    // p
    const pSpecial = crearElemento('p')
    pSpecial.innerHTML = 'Ataque Especial'
    divSpecial.appendChild(pSpecial)
    
    // Defensa Contenedor
    const divDefense = crearElemento('div')
    divDefense.className = 'card-footer-social'
    // h3
    const h3Defense = crearElemento('h3')
    h3Defense.innerHTML = pokemon.attack+'k'
    divDefense.appendChild(h3Defense)
    // p
    const pDefense = crearElemento('p')
    pDefense.innerHTML = 'Defensa'
    divDefense.appendChild(pDefense)

    // Tipos de Pokemon
    const pokeType = crearElemento('div')
    pokeType.className = 'card-footer-type'
    // Tipo 1
    const span1 = crearElemento('span')
    span1.className = 'type1'
    span1.innerHTML = `${pokemon.type1}`
    // Tipo 2
    const span2 = crearElemento('span')
    span2.innerHTML = `${pokemon.type2 || pokemon.type1}`

    // Agregando al DOM
    pokeType.appendChild(span1)
    pokeType.appendChild(span2)

    cardInfo.appendChild(divAttack)
    cardInfo.appendChild(divSpecial)
    cardInfo.appendChild(divDefense)

    cardBody.appendChild(cardBodyImg)
    cardBody.appendChild(cardBodyTitle)
    cardBody.appendChild(cardXP)
    cardBody.appendChild(cardInfo)
    cardBody.appendChild(pokePeso)
    cardBody.appendChild(pokeType)

    card.appendChild(cardBody)
    flex.appendChild(card)
}


// Funcion para filtrar si hay coincidencia en el selector con lo que se escribe en el input
const filtrarPokemon = (input, selector) =>{
    document.onkeyup = (e) =>{
        if(e.target.matches(input)){
            if(e.key == 'Escape') e.target.value = ''

            // Filtro para buscar las coincidencias
            document.querySelectorAll(selector).forEach(el =>el.textContent.includes(e.target.value)
                ?el.classList.remove('filter')
                :el.classList.add('filter'))
        }
    }
}

// Funcion para imprimir la cantidad de pokemones
const printInDOM = () => {
    let cont = 1
    while(cont <= 20){
        fetchData(cont)
        cont++
    }
}

// Boton sorpresa
document.getElementById('surprise-button').onclick = () => window.location = 'https://youtu.be/dQw4w9WgXcQ'

// Busca en card-filter todos los elementos que tengan la clase card
filtrarPokemon('.card-filter', '.card')
printInDOM()