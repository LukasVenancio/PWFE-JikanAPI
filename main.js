'use strict'

const criarCard = (anime) =>{

    const container = document.createElement('div')
    container.classList.add('card')
    container.innerHTML = `<img class="img-card" src="${anime.images.jpg.large_image_url}" title="${anime.title}" data-animeId="${anime.mal_id}">`

    return container                            

}

const pesquisarGenero = async (genre) =>{
    
    const url = `https://api.jikan.moe/v4/anime?genres=${genre}&sfw`

    const response = await fetch(url)
    const data = await response.json()

    return data.data
}

const carregarGenero = async(name, genre) =>{
    
    let containerCards = document.getElementById('container-cards')
    
    const title = document.getElementById('section-title')
    title.textContent = name
    const tipo = await pesquisarGenero(genre)
    // console.log(tipo)

    const cards = tipo.map(criarCard)

    containerCards.replaceChildren(...cards)
}

const carregarShounen = () =>{carregarGenero('Shounen', 27)}
const carregarSupernatural = () =>{carregarGenero('Supernatural', 37)}
const carregarAvantGarde = () =>{carregarGenero('Avant Garde', 5)}

document.getElementById('supernatural').addEventListener('click', carregarSupernatural)
document.getElementById('avant-garde').addEventListener('click', carregarAvantGarde)
document.getElementById('shounen').addEventListener('click', carregarShounen)

const pesquisarAnime = async(anime) =>{

    const url = `https://api.jikan.moe/v4/anime?q=${anime}&sfw`

    const response = await fetch(url)
    const data = await response.json()

    console.log(data)

    return data.data
}

const pesquisarAnimePorId = async(id) =>{
    const url = `https://api.jikan.moe/v4/anime/${id}`

    const response = await fetch(url)
    const data = await response.json()

    // console.log(data)

    return data.data
}

const carregarAnime = async () =>{
    const container = document.getElementById('container-cards')
    const anime = document.getElementById('caixa-de-pesquisa').value

    const title = document.getElementById('section-title')
    title.textContent = anime

    const data = await pesquisarAnime(anime)
    const cards = data.map(criarCard)

    container.replaceChildren(...cards)
}

document.getElementById('pesquisar').addEventListener('click', carregarAnime)

const abrirModal = () =>{
    document.querySelector('.modal-container').classList.add('active')
}

const fecharModal = () =>{
    document.querySelector('.modal-container').classList.remove('active')
}

const criarModal = (anime) =>{
    const modal = document.createElement('div')
    modal.classList.add('modal-content')
    modal.innerHTML = `<div class="first-column">
                            <img src="${anime.images.jpg.large_image_url}" alt="${anime.title}">
                            <p>${anime.title}</p>
                        </div>
                        <div class="second-column">
                            <p>${anime.synopsis}</p>
                        </div>`

    return modal                    
}

const carregarModal = async(id) =>{

    const modalContent = document.getElementById('modal-container')

    const data = await pesquisarAnimePorId(id)
    const modal = criarModal(data) 

    modalContent.replaceChildren(modal)
}

const handleClick = async( evento ) => {
    const id = evento.target.dataset.animeid
    carregarModal(id)


    abrirModal()    
}

document.querySelector('.container-cards').addEventListener('click', handleClick)
document.getElementById('modal-container').addEventListener('click', fecharModal)