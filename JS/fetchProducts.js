async function getProductsAPI() {
    const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=$computador`)
    const products = await response.json()
    return products;
}

export { getProductsAPI }