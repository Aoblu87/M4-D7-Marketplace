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



// Tasto conferma cancella prodotto
let confirmDeleteBtn = document.querySelector('#confirm-delete-btn')



window.onload = async function () {

    productsContainer.innerHTML = /*html*/ `
    <div id="loader" class="loading p-5 mt-5">
        <div></div>
        <div></div>
        <div></div>
    </div>
   
`
    try {
        allProducts = await getProducts()

        console.log(allProducts)


        // Varibili per identificare nodi

        productsContainer = document.querySelector('#products-container > div')


        // Mostro tutti i prodotti nel DOM
        displayProducts(allProducts)
        .finally(() => {
            productsContainer.querySelector("#loader").remove();
        })

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
function displayProducts(data) {

    productsContainer.innerHTML = data.map(({ _id, name, price, imageUrl, description, brand }) => /*html*/`
                                    <div id="_${_id}" class="row p-2 bg-white border rounded">
                                        <div class="col-md-3 mt-1">
                                            <img class="img-fluid img-responsive rounded product-image"src="${imageUrl}">
                                        </div>
                                        <div class="col-md-6 mt-1">
                                            <h5>${name}</h5>
                                            <p>${brand}</p>
                                            <p class="text-justify text-truncate para mb-0">${description}<br><br></p>
                                        </div>
                                        <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                                            <div class="d-flex flex-row align-items-center">
                                             <h4 class="mr-1">${price}€</h4>
                                            </div>
                                            <div class="d-flex flex-column mt-4">
                                                <button class="btn btn-success btn-sm" data-bs-toggle="offcanvas"
                                                data-bs-target="#change-product" aria-controls="change-product" onclick="fillForm(${price})">Change</button>
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
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFhZTkzYjk2OTNhMDAwMThiOWRlYjkiLCJpYXQiOjE2OTYyNjI0NTksImV4cCI6MTY5NzQ3MjA1OX0.zDkQ9wBotUv_FGzLQHZSRMthIEqAPb40vnYwaa5RBL4"
        },
        body: JSON.stringify({
            name: title.value,
            price: price.value,
            imageUrl: imageUrl.value,
            description: description.value,
            brand: brand.value
        })
    })

    title = document.querySelector("#titleInput")
    price = document.querySelector("#priceInput")
    imageUrl = document.querySelector("#imageUrl")
    description = document.querySelector("#descriptionInput")
    brand = document.querySelector('#brandInput')


    if (response.ok) {

        const data = await getProducts()
        displayProducts(data)


        for (const field of [title, price, imageUrl, description]) {
            field.value = ''
        }
    } else {
        console.error("Cannot send")
    }
}

// funzione che apre modale per modificare prodotti
function fillForm(id, name, price, imageUrl, description, brand) {
    // idItem.value = id
    changeTitle.value = name
    changePrice.value = price
    changeImageUrl.value = imageUrl
    changeDescription.value = description
    changeBrand.value = brand


}

// Funzione che modifica prodotto
async function changeProduct(event, id) {
    //  aggiunge pe none per non far cliccare
    event.preventDefault()

    const response = await fetch('https://striveschool-api.herokuapp.com/api/product/' + id, {
        method: "PUT",
        headers: {
            "Content-type": "application/json",
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFhZTkzYjk2OTNhMDAwMThiOWRlYjkiLCJpYXQiOjE2OTYyNjI0NTksImV4cCI6MTY5NzQ3MjA1OX0.zDkQ9wBotUv_FGzLQHZSRMthIEqAPb40vnYwaa5RBL4"
        },
        body: JSON.stringify({
            _id: idItem.value,
            name: changeTitle.value,
            price: changePrice.value,
            imageUrl: changeImageUrl.value,
            description: changeDescription.value,
            brand: changeBrand.value
        })
    })
    console.log(idItem.value)

    idItem = document.querySelector('#id-item')
    changeTitle = document.querySelector('#change-title')
    changePrice = document.querySelector("#change-price")
    changeImageUrl = document.querySelector("#change-image-url")
    changeDescription = document.querySelector("#change-description")
    changeBrand = document.querySelector('#change-brand')


    if (response.ok) {

        const data = await getProducts()
        displayProducts(data)

        for (const field of [idItem, changeTitle, changePrice, changeImageUrl, changeDescription]) {
            field.value = ''
        }
    } else {
        console.error("Cannot send")
    }
}






// Funzione che elimina prodotto
async function deleteProduct(id) {

    const response = await fetch('https://striveschool-api.herokuapp.com/api/product/' + id, {
        method: "DELETE",
        headers: {

            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFhZTkzYjk2OTNhMDAwMThiOWRlYjkiLCJpYXQiOjE2OTYyNjI0NTksImV4cCI6MTY5NzQ3MjA1OX0.zDkQ9wBotUv_FGzLQHZSRMthIEqAPb40vnYwaa5RBL4"
        }

    })
    if (!confirm("Are you sure to delete?")) {
        return
    }
    if (response.ok) {

        const data = await getProducts()
        displayProducts(data)
        confirm('Delete Successfully')
    } else {
        console.error("Delete not complete")
    }

}











// <!-- Modal -->
//                             <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
//                                 <div class="modal-dialog">
//                                     <div class="modal-content">
//                                         <div class="modal-header">
//                                             <h1 class="modal-title fs-5" id="exampleModalLabel">Delete Product</h1>
//                                             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//                                         </div>
//                                         <div class="modal-body">
//                                             Are you sure you want to delete this item?
//                                         </div>
//                                         <div class="modal-footer">
//                                             <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
//                                             <button type="button" class="btn btn-primary" id="confirm-delete-btn" onclick="deleteProduct()">Confirm</button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>