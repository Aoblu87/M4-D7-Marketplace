let title = document.querySelector("#titleInput")
let price = document.querySelector("#priceInput")
let imageUrl = document.querySelector("#imageUrl")
let description = document.querySelector("#descriptionInput")
let brand = document.querySelector('#brandInput')
let productsContainer = document.querySelector('#products-container')

// fetch(`https://striveschool-api.herokuapp.com/api/product/`, {
//     headers: {
//         "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFhZTkzYjk2OTNhMDAwMThiOWRlYjkiLCJpYXQiOjE2OTYyNjI0NTksImV4cCI6MTY5NzQ3MjA1OX0.zDkQ9wBotUv_FGzLQHZSRMthIEqAPb40vnYwaa5RBL4"
//     }
// })
//     .then(r => r.json())
//     .then(displayProducts)
//     productsContainer = document.querySelector('#products-container')

window.onload = async function () {
    try {
        allProducts = await getProducts()

        console.log(allProducts)


        // Varibili per identificare nodi
        
        let productsContainer = document.querySelector('#products-container')
       


       

        // Mostro tutti i prodotti nel DOM
        displayProducts(allProducts)

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

    productsContainer.innerHTML = data.map(({ _id, name, price, imageUrl, description }) => /*html*/`
                    <div class="col-md-3">
                        <div class="card h-100 border border-0">
                        <a href="../product/product.html?id=${_id}">
                        <img src="${imageUrl}" class="card-img-top" alt="${name}">
                            <div class="card-body">
                                <h5 class="card-title text-center"> <a href="../product/product.html?id=${_id}" class="link-underline link-underline-opacity-0 link-dark">
                                ${name}</a></h5>
                                <p class="card-text text-center">${price}€</p>
                
                            </div>
                            <div class= "justify-content-evenly align-items-center">
                                <button type="button" class="btn btn-transparent">Change</i></button>
                                <button type="button" class="cartButton btn btn-transparent"  >Delete</i> </button>
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
    console.log(response)

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

