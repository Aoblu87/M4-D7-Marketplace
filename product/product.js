const params = new URLSearchParams(window.location.search)
const id = params.get('id')
let detailsContainer = document.querySelector('#details-container')

// window.onload = async function () {

//     try {
//         const product = await getDetailsProduct()

//         detailsContainer = document.querySelector('#main-container')

//         displayProduct(product)

//     } catch (error) {
//         console.log(error)
//     }
// }






// async function getDetailsProduct() {
//     try {
//         const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {

//             headers: {
//                 "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFhZTkzYjk2OTNhMDAwMThiOWRlYjkiLCJpYXQiOjE2OTYyNjI0NTksImV4cCI6MTY5NzQ3MjA1OX0.zDkQ9wBotUv_FGzLQHZSRMthIEqAPb40vnYwaa5RBL4"
//             }
//         })
//         const jsonData = await response.json()
//         return jsonData
//     } catch (error) {
//         console.log(error)
//     }

// }

fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
    headers: {
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTFhZTkzYjk2OTNhMDAwMThiOWRlYjkiLCJpYXQiOjE2OTYyNjI0NTksImV4cCI6MTY5NzQ3MjA1OX0.zDkQ9wBotUv_FGzLQHZSRMthIEqAPb40vnYwaa5RBL4"
    }
})
    .then(r => r.json())
    .then(displayProduct)

function displayProduct(data) {

    detailsContainer.innerHTML += /*html*/`
        <div class="col-md-3 d-flex g-5">
            <img src="${data.imageUrl}" class="img-fluid" alt="${data.name}">
        </div>
        <div class="col d-flex flex-column p-5 g-5">
        
            <div class="col d-flex flex-column align-items-center">
                <h5 class="f-6">${data.name}</h5>
                <h6 class="">${data.price} €</h6>
        
            </div>
            <div class="col d-flex align-items-center">
                <button class="btn btn-outline-secondary dropdown-toggle" type="button"
                    data-bs-toggle="dropdown" aria-expanded="false">1</button>
                <ul class="dropdown-menu dropdown-menu-end">
                    <select class="form-select" size="3" aria-label="Size 3 select example">
                        <option selected>1</option>
                        <option value="1">2</option>
                        <option value="2">3</option>
                        <option value="3">4</option>
                    </select>
                </ul>
                <button type="button" class="btn btn-success">Aggiungi al carrello</button>
        
        
            </div>
        
        </div>
        
`

}









