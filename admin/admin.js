let title = document.querySelector("#titleInput")
let price = document.querySelector("#priceInput")
let imageUrl = document.querySelector("#imageUrl")
let description = document.querySelector("#descriptionInput")
let brand = document.querySelector('#brandInput')


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
        alert("Yohoo! Added Event")
        // const data = await getAgenda()
        // displayAgenda(data)

        for (const field of [title, price, imageUrl, description]) {
            field.value = ''
        }
    } else {
        console.error("Cannot send")
    }
}

