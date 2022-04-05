'use strict'

const criarCard = (anime) =>{

    const container = document.createElement('div')
    container.classList.add('card')
    container.innerHTML = `<a href="#">
        <img id="img-card" src="${anime.images.jpg.large_image_url}" title="${anime.title}">
    </a>
    <div class="modal-container" id="modal-container">
        <div class="modal-content" id="modal-content>
            <div class="first-column">
                <img src="${anime.images.jpg.large_image_url}" alt="" title="${anime.title}">
                <p>${anime.title}</p>
            </div>
            <div class="second-column">
                <p>${anime.synopsis}</p>
            </div>
        </div>
</div>`

    return container                            

}

const pesquisarGenero = async (genre) =>{
    
    const url = `https://api.jikan.moe/v4/anime?genres=${genre}&sfw`

    const response = await fetch(url)
    const data = await response.json()

    // console.log(data)

    return data.data
}

const carregarGenero = async(name, genre) =>{
    
    let containerCards = document.getElementById('container-cards')
    
    const title = document.getElementById('section-title')
    title.textContent = name
    const tipo = await pesquisarGenero(genre)
    console.log(tipo)

    const cards = tipo.map(criarCard)

    containerCards.replaceChildren(...cards)
    
    // let genre = null

    // if(name == 'Shounen'){
    //     containerCards = document.getElementById('container-cards-shounen')
    //     genre = 27
    // }else if(name == 'Supernatural'){
    //     containerCards = document.getElementById('container-cards-supernatural')
    //     genre = 37
    // }else if(name == 'Avant Garde'){
    //     containerCards = document.getElementById('container-cards-avant-garde')
    //     genre = 5
    // }
}

const carregarShounen = () =>{carregarGenero('Shounen', 27)}
const carregarSupernatural = () =>{carregarGenero('Supernatural', 37)}
const carregarAvantGarde = () =>{carregarGenero('Avant Garde', 5)}
// carregarGenero('Shounen', 27)
// carregarGenero('Supernatural', 37)
// carregarGenero('Avant Garde', 5)

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
    const container = document.getElementById('container-cards')
    document.getElementById('modal-container').classList.add('active')

}

const fecharModal = () =>{
    document.getElementById('modal-container').classList.remove('active')
}

document.getElementById('img-card').addEventListener('click', abrirModal)
// document.getElementById('fechar').addEventListener('click', fecharModal)