
// PUNTO DOVE MOSTRARE TUTTI I PRODOTTI
let contentContainer = document.querySelector('#main-content >div')


// TASTO CANCELLA ARTICOLO
let cancelItem = document.querySelector('#cancel-item')

// TASTO AGGIUNGI FAVORITI
let wishlistBtn = document.querySelectorAll('.wishlist-btn')

let allProducts = []
let favorites =[]


window.onload = async function () {

    contentContainer.innerHTML = /*html*/ `
    <div id="loader" class="loading p-5 mt-5">
        <div></div>
        <div></div>
        <div></div>
    </div>
   
`


    try {


        allProducts = await getProducts()

            .finally(() => {
                contentContainer.querySelector("#loader").remove();
            })
        console.log(allProducts)


        // Varibili per identificare nodi

        contentContainer = document.querySelector('#main-content> div')



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
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM0MTQ0YWJlNDYzZTAwMTgzZTc4MjQiLCJpYXQiOjE2OTc5MTE4ODMsImV4cCI6MTY5OTEyMTQ4M30.vhvrrAJyKPhbzKEH-8XJveo2u4d4n0lXktpoV2A5YuE"
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
                                <div id="_${_id}" class="item row p-2 bg-white border rounded my-3">
                                    <div class="col-md-3 mt-1">
                                        <a href="../product/product.html?id=${_id}">
                                        <img  class="img-product img-fluid img-responsive rounded product-image"src="${imageUrl}"></a>
                                    </div>
                                    <div class="col-md-6 mt-1">
                                        <a class="link-offset-2 link-underline link-underline-opacity-0 text-dark" href="../product/product.html?id=${_id}">
                                        <h2>${name}</h2></a>
                                        <p class="text-justify text-truncate para mb-0">${description}<br><br></p>
                                    </div>
                                    <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                                         <div class="d-flex flex-row align-items-center justify-content-end">
                                            <h4 class="mr-1">${price}€</h4>
                                        </div>
                                        <div class="d-flex flex-column mt-4">
                                            <a class="btn btn-primary btn-sm" href="../product/product.html?id=${_id}" role="button">Details</a>
                                            <button  class="wishlist-btn btn btn-outline-primary btn-sm mt-2" type="button" onclick="addFavorites('${_id}')">Add to wishlist</button>
                                        </div>
                                    </div>
                                </div>
                                `
    ).join('')
}


// funzione per creare array degli articoli aggiunti alla wishlist


function addFavorites(id){
    const itemSelected = allProducts.find(item => item._id === id)
console.log(itemSelected)


    favorites.push({
        ...itemSelected,
        quantity: 1
    })

//     if (favorites.quantity === 1) {
            
//     favorites.quantity++

// } else { // creo array di tutti i libri selezionati
//     favorites.push({
//         ...itemSelected,
//         quantity: 1
//     })
// }

    console.log(favorites)
}














