// INPUT DI RICERCA
let inputSearch = document.querySelector('#inputSearch')
// PUNTO DOVE MOSTRARE TUTTI I PRODOTTI
let contentContainer = document.querySelector('#main-content')

// BOTTONE AGGIUNGI AL CARRELLO SULLA CARD
let addItems = document.querySelectorAll('.cartButton')
// PALLINO SUL CARRELLO CHE FA IL CONTAGGIO TOTALE DEGLI ARTICLI NEL CARRELLO
let cartCount = document.querySelector('#cart-count')
// TOTALE ARTICOLO 
let totItem = document.querySelector('#tot-item')
// CARRELLO
const cartList = document.querySelector('#cartList')
// OGGETTO DI LIBRI AGGIUNTI AL CARRELLO
let itemsInTheCart = []
let addQuantity = []

// TASTO CANCELLA ARTICOLO
let cancelItem = document.querySelector('#cancel-item')

// TOTALE PREZZO CARRELLO
const totalPrice = document.querySelector('#totalPrice')


let allProducts = []

let count = 0
let countItem = 0
let tot = 0
let allPrice = []



window.onload = async function () {
    try {
        allProducts = await getProducts()

        console.log(allProducts)


        // Varibili per identificare nodi
        inputSearch = document.querySelector('#inputSearch')
        contentContainer = document.querySelector('#main-content')
        addItems = document.querySelectorAll('.cartButton')
        cancelItem = document.querySelector('#cancel-item')


        // Per ogni bottone carrello aggiungo Add EventListeners
        addItems.forEach(addToCart)

        // Mostro tutti i prodotti nel DOM
        displayResult(allProducts)

    } catch (error) {
        console.log(error)
    }
}
// Funzione che richiama tutti i prodotti
async function getProducts() {
    try {
        const response = await fetch("https://striveschool-api.herokuapp.com/api/product/", {

            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFhZTkzYjk2OTNhMDAwMThiOWRlYjkiLCJpYXQiOjE2OTYyNjI0NTksImV4cCI6MTY5NzQ3MjA1OX0.zDkQ9wBotUv_FGzLQHZSRMthIEqAPb40vnYwaa5RBL4"
            }
        })
        const jsonData = await response.json()
        return jsonData
    } catch (error) {
        console.log(error)
    }
}




// mostro nel DOM i risultati
function displayResult(data) {

    contentContainer.innerHTML = data.map(({ _id, name, price, imageUrl, description }) => /*html*/`
                                <div class="row p-2 bg-white border rounded">
                                    <div class="col-md-3 mt-1">
                                        <img class="img-fluid img-responsive rounded product-image"src="${imageUrl}">
                                    </div>
                                    <div class="col-md-6 mt-1">
                                        <h5>${name}</h5>
                                        <p class="text-justify text-truncate para mb-0">${description}<br><br></p>
                                    </div>
                                    <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                                         <div class="d-flex flex-row align-items-center">
                                            <h4 class="mr-1">${price}€</h4>
                                        </div>
                                        <div class="d-flex flex-column mt-4">
                                            <a class="btn btn-primary btn-sm" href="../product/product.html?id=${_id}" role="button">Details</a>
                                            <button class="btn btn-outline-primary btn-sm mt-2" type="button">Add to wishlist</button>
                                        </div>
                                    </div>
                                </div>
                                `
                ).join('')
            }
                                        

                                                
        















// AddEventListeners SUI BOTTONI PER AGGIUNGERE PRODOTTI
function addToCart(button) {

    button.addEventListener('click', event => {

        // conteggio del numeri di articoli totali nel carrello
        count++
        cartCount.innerHTML = count



        // Recupero libro dal bottone
        const idProduct = button.getAttribute('data-asin')
        const productSelected = allProducts.find(item => item._id === idProduct)



        if (itemsInTheCart.quantity === 1) {

            itemsInTheCart.quantity++

        } else { // creo array di tutti i libri selezionati
            itemsInTheCart.push({
                ...productSelected,
                quantity: 1
            })
        }
        // creo array con tutti i prezzi selezionati
        allPrice.push(productSelected.price)
        tot = allPrice.reduce((accumulator, currentValue) => {
            return accumulator + currentValue
        }, 0);
        // mostro risultati nel dom
        totalPrice.innerHTML = `${tot}€`


        console.log(tot)


        // Mostro libro selezionato nel carrello
        showListCart(productSelected)

        // Mostro conteggio del badge carrello nel main
        showBadgeTotal(count)









        const list = document.querySelector('.list-item')
        const idList = list.getAttribute('data-id')
        // console.log(idList)


        // for (const  of object) {

        // }
        // if (idList !== idBook) {
        //     countItem = 1
        // } else {
        //     countItem++
        //     cartList.innerHTML = itemList



        // }

        // cartList.innerHTML= ''
    })



}

// MOSTRA LIBRO NEL CARRELLO

function showListCart(book) {
    let itemList =   /*html */`
    <li class="list-item list-group-item d-flex justify-content-between align-items-center border border-bottom-1 p-1" data-id="${book.asin}">
        <div class="card-book card border border-0">
            <div class="row row-cols-3 g-0 align-items-center">
    
                <div class="col-md-3">
                    <img src="${book.img}" class="product-img img-fluid " alt="">
                </div>
                <div class="col card-body d-flex flex-column justify-content-center align-items-end p-0">
                     <h5 class="product-title card-title ml-1">${book.title}</h5>
    
                     <p class="product-price card-text">${book.price} €</p>
                </div>
                <div class="col d-flex flex-column align-items-end pb-5">
                    <div id="cancel-item" class= "col d-flex">
                        <i class="bi bi-x-circle"></i>
                    </div>
                    <div class="col-md-7 d-flex align-items-center justify-content-enter pt-3">
                        <button class="btn btn-outline-secondary p-0" type="button"><i class="bi bi-dash-lg"></i></button> 
                        <span id="tot-item" class="badge text-bg-light bg-transparent">${countItem}</span>
                        <button class="btn btn-outline-secondary p-0" type="button"><i class="bi bi-plus-lg"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </li>        
     `

    cartList.innerHTML += itemList

}

// MOSTRO SOLO UN LIBRO E AUMENTO LA QUANTITA' NEL CONTATORE SE LO STESSO
function countBook(books) {
    for (const button of addItems) {

        const idBook = button.getAttribute('data-asin')

        if (books.find(book => book.asin === idBook)) {

            cartList.innerHTML = ''
            countItem++

        } else {
            console.log('ciao')

        }
    }

}


// FUNZIONE CHE FA APPARIRE CONTEGGIO TOTALE SU CARRELLO MAIN

function showBadgeTotal(count) {

    if (count > 0) {
        cartCount.classList.add('visible')
    }

}



// HTML Display Card

// <div class="col-md-3">
//                         <div class="card h-100 border border-0">
//                         <a href="../product/product.html?id=${_id}">
//                         <img src="${imageUrl}" class="card-img-top" alt="${name}">
//                             <div class="card-body">
//                                 <h5 class="card-title text-center"> <a href="../product/product.html?id=${_id}" class="link-underline link-underline-opacity-0 link-dark">
//                                 ${name}</a></h5>
//                                 <p class="card-text text-center">${price}€</p>
                
//                             </div>
//                             <div class= "cart-overlay bg-light d-flex justify-content-evenly align-items-center">
//                                 <button type="button" class="btn btn-transparent"> <i class="bi bi-suit-heart fs-3"></i></button>
//                                 <button type="button" class="cartButton btn btn-transparent" data-asin='${_id}' >  <i class="bi bi-cart2 fs-3"></i> </button>
//                             </div>
//                         </div>
//                     </div>