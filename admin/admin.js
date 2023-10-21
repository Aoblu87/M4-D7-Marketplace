// Varibili form aggiungi prodotto
let title = document.querySelector("#titleInput")
let price = document.querySelector("#priceInput")
let imageUrl = document.querySelector("#imageUrl")
let description = document.querySelector("#descriptionInput")
let brand = document.querySelector('#brandInput')

// Varibili form cambia prodotto
let idItem = document.querySelector('#id-item')
let changeTitle = document.querySelector('#change-title')
let changePrice = document.querySelector("#change-price")
let changeImageUrl = document.querySelector("#change-image-url")
let changeDescription = document.querySelector("#change-description")
let changeBrand = document.querySelector("#change-brand")

// Dove appendere il DOM
let productsContainer = document.querySelector('#products-container > div')

let formChangeBtn = document.querySelector('#form-change')

// Tasto conferma cancella prodotto
let confirmDeleteBtn = document.querySelector('#confirm-delete-btn')

// tasto chiusura offcanvas
let closeBtn = document.querySelectorAll('.closeX')



let arrayProducts = []


window.onload = async function () {

    productsContainer.innerHTML = /*html*/ `
                    <div id="loader" class="loading p-5 mt-5">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
    
    `
    try {
        let allProducts = await getProducts()
        
        .finally(() => {
            productsContainer.querySelector("#loader").remove();
        })
        console.log(allProducts)
        
        
        // Varibili per identificare nodi
        productsContainer = document.querySelector('#products-container > div')
        

        // Assegno tutti i risultati ad una variabile globale
        arrayProducts = allProducts

        // Mostro tutti i prodotti nel DOM
        displayProducts(arrayProducts)

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
function displayProducts(data) {

    productsContainer.innerHTML = data.map(({ _id, name, price, imageUrl, description, brand }) => /*html*/`
                                            <div id="_${_id}" class="row p-2 bg-white border rounded my-3">
                                                <div class="col-md-3 mt-1">
                                                    <img class="img-fluid img-responsive rounded product-image"src="${imageUrl}">
                                                </div>
                                                <div class="col-md-6 mt-1">
                                                    <h5>${name}</h5>
                                                    <p>${brand}</p>
                                                    <p class="text-justify para mb-0">${description}<br><br></p>
                                                </div>
                                                <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                                                    <div class="d-flex flex-row align-items-center justify-content-end">
                                                         <h4 class="mr-1">${price}€</h4>
                                                    </div>
                                                    <div class="d-flex flex-column mt-4">
                                                        <button class="btn btn-success btn-sm" data-bs-toggle="offcanvas"
                                                            data-bs-target="#change-product" aria-controls="change-product" onclick="fillForm('${_id}')">Edit</button>
                                                        <button class="btn btn-danger btn-sm mt-2" type="button" onclick="deleteProduct('${_id}')">Delete</button>
                                                    </div>
                                                </div>
                                            </div>
        `
    ).join('')
}



// Funzione che aggiunge prodotti 

async function addProduct(event) {

    event.preventDefault()

    const response = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM0MTQ0YWJlNDYzZTAwMTgzZTc4MjQiLCJpYXQiOjE2OTc5MTE4ODMsImV4cCI6MTY5OTEyMTQ4M30.vhvrrAJyKPhbzKEH-8XJveo2u4d4n0lXktpoV2A5YuE"
        },
        body: JSON.stringify({
            name: title.value,
            price: price.value,
            imageUrl: imageUrl.value,
            description: description.value,
            brand: brand.value
        })
    })
        .finally(() => {
            for (const button of closeBtn) {
                button.click()

            }
        })


    if (response.ok) {


        const data = await getProducts()
        displayProducts(data)
        alert('Successfully added!')

        for (const field of [title, price, imageUrl, description]) {
            field.value = ''
        }
    } else {
        console.error("Something got wrong")
        alert("Something got wrong")

    }
}

// funzione che apre modale per modificare prodotti
function fillForm(id) {
    console.log(arrayProducts)
    const itemSelected = arrayProducts.find(item => item._id === id)
    console.log(itemSelected)

    idItem.innerHTML = itemSelected._id
    changeTitle.value = itemSelected.name
    changePrice.value = itemSelected.price
    changeImageUrl.value = itemSelected.imageUrl
    changeDescription.value = itemSelected.description
    changeBrand.value = itemSelected.brand

}






// Funzione che modifica prodotto
async function changeProduct(event) {

    formChangeBtn.classList.add('pe.none')
    //  aggiunge pe none per non far cliccare
    event.preventDefault()

    const response = await fetch('https://striveschool-api.herokuapp.com/api/product/' + idItem.innerHTML, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM0MTQ0YWJlNDYzZTAwMTgzZTc4MjQiLCJpYXQiOjE2OTc5MTE4ODMsImV4cCI6MTY5OTEyMTQ4M30.vhvrrAJyKPhbzKEH-8XJveo2u4d4n0lXktpoV2A5YuE"
        },
        body: JSON.stringify({
            _id: idItem.innerHTML,
            name: changeTitle.value,
            price: changePrice.value,
            imageUrl: changeImageUrl.value,
            description: changeDescription.value,
            brand: changeBrand.value
        })
    })
        .finally(() => {
            for (const button of closeBtn) {
                button.click()

            }
        })



    if (response.ok) {

        const data = await getProducts()
        displayProducts(data)
        alert('Successfully added!')

        for (const field of [idItem, changeTitle, changePrice, changeImageUrl, changeDescription]) {
            field.value = ''
        }
    } else {
        console.error("Something got wrong")
        alert("Something got wrong")

    }

}






// Funzione che elimina prodotto
async function deleteProduct(id) {

    if (!confirm("Are you sure to delete?")) {
        return
    }

    const response = await fetch('https://striveschool-api.herokuapp.com/api/product/' + id, {
        method: "DELETE",
        headers: {

            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM0MTQ0YWJlNDYzZTAwMTgzZTc4MjQiLCJpYXQiOjE2OTc5MTE4ODMsImV4cCI6MTY5OTEyMTQ4M30.vhvrrAJyKPhbzKEH-8XJveo2u4d4n0lXktpoV2A5YuE"
        }

    })
    if (response.ok) {

        const data = await getProducts()
        displayProducts(data)
        alert('Delete Successfully')
    } else {
        console.error("Delete not complete")
        alert("Something got wrong")

    }

}


