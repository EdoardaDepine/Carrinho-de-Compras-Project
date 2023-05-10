//GET ITENS FROM API:
async function getProductsAPI() {
    const response = await fetch(
        `https://api.mercadolibre.com/sites/MLB/search?q=$computador`
    );
    const products = await response.json();
    return products;
}
const products = await getProductsAPI();
const productsList = products.results;
const insertionItens = document.querySelector(".itens");
console.log(productsList);

//CREATE ELEMENT PRODUCT:
function createProductItemElement(arrayProducts) {
    return arrayProducts.map((product) => {
        insertionItens.innerHTML += `
    <div class=product>
    <img class="img-product" src="${product.thumbnail}"/>
    <h1>${product.title}</h1>
    <p>${product.price}</p>
    <button class="button-add-product">Adicionar ao carrinho</button>
    </div>
    `;
    });
}
createProductItemElement(productsList);
console.log(createProductItemElement(productsList));