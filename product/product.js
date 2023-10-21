const params = new URLSearchParams(window.location.search)
const id = params.get('id')
let detailsContainer = document.querySelector('#product-result > div')


detailsContainer.innerHTML = /*html*/ `
        <div id="loader" class="loading p-5 mt-5">
            <div></div>
            <div></div>
            <div></div>
        </div>
       
    `


fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTM0MTQ0YWJlNDYzZTAwMTgzZTc4MjQiLCJpYXQiOjE2OTc5MTE4ODMsImV4cCI6MTY5OTEyMTQ4M30.vhvrrAJyKPhbzKEH-8XJveo2u4d4n0lXktpoV2A5YuE"
    }
})
    .then(r => r.json())
    .then(displayProduct)

    
    // .finally(() => {
        
    //     detailsContainer.querySelector("#loader").remove()
    // })

function displayProduct(data) {

    detailsContainer.innerHTML = /*html*/`
    
                <div  class="card mb-3 p-3">
                    <div class="row justify-content-between mt-2 p-0">
                        <div class="col-7 col-md-3 d-flex align-items-center p-md-3">
                            <a class="link-body-emphasis" href="../index.html">
                                    <i class="fs-3 bi bi-arrow-left"></i>
                            </a>

                            <p class="em ms-3 m-0">
                            <a class="link-offset-2 link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover text-dark link-body-emphasis "
                                    href="../index.html">Back to all Plants</a>

                            </p>
                        </div>
                        <div id="favorites-icon" class="col-2 d-flex position-relative fs-3 p-3">

                                <i id="favorite-unsaved" class="bi bi-suit-heart"></i>
                                <i id="favorite-saved" class="bi bi-suit-heart-fill d-none"></i>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <img class="img-product img-fluid rounded" src="${data.imageUrl}" alt="${data.title}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body p-0 pt-2">
                                    <h3 class="card-title">${data.name}</h3>
                                    <p class="card-title text-body-secondary">${data.brand}</p>
                                    <hr>
                                    <div class="col d-flex justify-content-end my-4">
                                        <p class="h3 m-0">${data.price} €</p>
                                       
                                    </div>
                                    <p class="card-text">${data.description}</p>
                                <div class="col d-flex justify-content-end p-3">
                                    <button type="button" class="btn btn-dark">Add to Cart</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        
`

}


// Funzione per riempire cuore icona preferiti

// const favoritesIcon = document.querySelector('#favorites-icon')

// favoritesIcon.addEventListener('click',)



