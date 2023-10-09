
// PUNTO DOVE MOSTRARE TUTTI I PRODOTTI
let contentContainer = document.querySelector('#main-content >div')


// TASTO CANCELLA ARTICOLO
let cancelItem = document.querySelector('#cancel-item')



let allProducts = []



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
                                        <a href="../product/product.html?id=${_id}">
                                        <img class="img-fluid img-responsive rounded product-image"src="${imageUrl}"></a>
                                    </div>
                                    <div class="col-md-6 mt-1">
                                        <a href="../product/product.html?id=${_id}">
                                        <h5>${name}</h5></a>
                                        <p class="text-justify text-truncate para mb-0">${description}<br><br></p>
                                    </div>
                                    <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                                         <div class="d-flex flex-row align-items-center justify-content-end">
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
                                        

                                                
        













