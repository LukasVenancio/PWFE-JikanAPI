'use strict'

const criarCard = (anime) =>{

    const container = document.createElement('div')
    container.classList.add('card')
    container.innerHTML = `<img src="${anime.images.jpg.large_image_url}" title="${anime.title}">`

    return container                            

}

const pesquisarGenero = async (genre) =>{
    
    const url = `https://api.jikan.moe/v4/anime?genres=${genre}&sfw`

    const response = await fetch(url)
    const data = await response.json()

    console.log(data)

    return data.data
}

const carregarGenero = async(name) =>{
    
    let containerCards = null
    let genre = null

    if(name == 'Shounen'){
        containerCards = document.getElementById('container-cards-shounen')
        genre = 27
    }else if(name == 'Supernatural'){
        containerCards = document.getElementById('container-cards-supernatural')
        genre = 37
    }else if(name == 'Avant Garde'){
        containerCards = document.getElementById('container-cards-avant-garde')
        genre = 5
    }

    const tipo = await pesquisarGenero(genre)
    console.log(tipo)

    const cards = tipo.map(criarCard)

    containerCards.replaceChildren(...cards)
}

carregarGenero('Shounen')
carregarGenero('Supernatural')
carregarGenero('Avant Garde')