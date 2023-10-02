// Funzione che aggiunge prodotti 
async function addProduct() {
    const response = await fetch("https://striveschool-api.herokuapp.com/api/product/", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            name: name.value,
            description: description.value,
            price: price.value,
            img: img.value
        })
    })
}
