

// Obetener valores desde la API
const fetchData = async (id) =>{
        const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await resp.json()

        // Creando el objeto pokemon
        const pokemon = {
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
            // imgCvg: data.sprites.other.dream_world.front_default,
            imgCvg: data.sprites.front_default ,
            name: data.name,
            xp: data.base_experience,
            hp: data.stats[0].base_stat,
            weight: data.weight,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            special: data.stats[3].base_stat,
            type1: data.types[0].type.name,
        }

        console.log(data);

        if(data.types[1] == undefined) data.types[1] = null
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

    // Card container
    const card = document.createElement('div')
    card.className = 'card'

    // Card Body
    const cardBody = document.createElement('div')
    cardBody.className = 'card-body'

    // Imagen
    const cardBodyImg = document.createElement('img')
    cardBodyImg.className = 'card-body-img'
    cardBodyImg.src = pokemon.imgCvg
    
    // Titulo
    const cardBodyTitle = document.createElement('h1')
    cardBodyTitle.className = 'card-body-title'
    cardBodyTitle.textContent = `${pokemon.name} ${pokemon.hp}hp`

    // XP
    const cardXP = document.createElement('span')
    cardXP.className = 'card-body-xp'
    cardXP.textContent = `${pokemon.xp} XP`

    // Footer
    const cardInfo = document.createElement('div')
    cardInfo.className = 'cardInfo'

    let weight = String(pokemon.weight)
    let length = weight.length
    let lastChar = /[a-z]/.test(weight.slice(length-1)) ? weight.slice(length-1).toUpperCase() : weight.slice(length-1)
    weight = [weight.slice(0, length-1), ",", lastChar].join('')


    cardInfo.innerHTML = `
        <div class="card-footer" >
            <div class="card-footer-social">
                <h3>${pokemon.attack}k</h3>
                <p>Ataque</p>
            </div>
            <!-- * -->
            <div class="card-footer-social" >
                <h3>${pokemon.special}k</h3>
                <p>Ataque especial</p>
            </div>
            <!-- * -->
            <div class="card-footer-social">
                <h3>${pokemon.defense}k</h3>
                <p>Defensa</p>
            </div>
        </div>
        <div class="card-footer-weight">
            <span class="weight">Peso: <b>${weight} kg</b></span>
        </div>
        <div class="card-footer-type">
            <span class="type1">${pokemon.type1}</span>
            <span class="type2">${pokemon.type2 || ''}</span>
        </div>
    `
    
    cardBody.appendChild(cardBodyImg)
    cardBody.appendChild(cardBodyTitle)
    cardBody.appendChild(cardXP)
    cardBody.appendChild(cardInfo)
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

// Funcion para imprimir la cantidad de pokemones segun el tamaño del array
const printInDOM = () => {
    let cont = 1
    while(cont <= 40){
        fetchData(cont)
        cont++
    }
}

// Busca en card-filter todos los elementos que tengan la clase card
filtrarPokemon('.card-filter', '.card')
printInDOM()