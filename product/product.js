const params = new URLSearchParams(window.location.search)
const id = params.get('id')
let detailsContainer = document.querySelector('#details-container')



fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFhZTkzYjk2OTNhMDAwMThiOWRlYjkiLCJpYXQiOjE2OTYyNjI0NTksImV4cCI6MTY5NzQ3MjA1OX0.zDkQ9wBotUv_FGzLQHZSRMthIEqAPb40vnYwaa5RBL4"
    }
})
    .then(r => r.json())
    .then(displayProduct)

function displayProduct(data) {

    detailsContainer.innerHTML += /*html*/`
        

                <div class="card mb-3">
                    <div class="row">
                        <div class="col">

                            <i class="bi bi-arrow-left"></i>
                        </div>
                        <div class="col">
                            <h5>Back to all Plants</h5>
                        </div>
                        <div class="col">

                            <i class="bi bi-suit-heart"></i>
                        </div>
                    </div>
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img src="${data.imageUrl}" alt="${data.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">${data.name}</h5>
                                <h1>${data.price}€</h1>
                                <p class="card-text">${data.description}</p>
                                <h4 class="card-title">${data.brand}</h4>
                                <button>Add to Cart</button>
                                <button>Wishlist</button>
                            </div>
                        </div>
                    </div>
                </div>
        
`

}


// Funzione per riempire cuore icona preferiti

// const favoritesIcon = document.querySelector('#favorites-icon')

// favoritesIcon.addEventListener('click',)



