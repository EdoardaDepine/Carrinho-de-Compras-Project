//GET PRODUCTS API, CREATE PRODUCT AND EXIBITION:
async function getProductsAPI(productsList) {
    const response = await fetch(
        `https://api.mercadolibre.com/sites/MLB/search?q=${productsList}`
    );
    const products = await response.json();
    return products;
}
const products = await getProductsAPI("computador");
const productsList = products.results;

const insertionProducts = document.querySelector(".itens");

function createProductItemElement(arrayProducts) {
    return arrayProducts.map((product) => {
        insertionProducts.innerHTML += `
    <div class=product>
    <img class="img-product" src="${product.thumbnail}"/>
    <p id="id-product">${product.id}</p>
    <div class="div-title-product">
    <p id="title-product">${product.title}</p>
    </div>
    <p id="price-product">R$${product.price}</p>
    <button class="button-add-product">Adicionar ao carrinho</button>
    </div>
    `;
    });
}
createProductItemElement(productsList);

//GET ITEM API, CREATE ITEM AND ADD IN CART:
async function getItemAPI(id) {
    const response = await fetch(`https://api.mercadolibre.com/items/${id}`);
    const item = response.json();
    return item;
}

const insertionCartItens = document.querySelector(".cart-itens")

function createCartItemElement(item) {
    return insertionCartItens.innerHTML += `
  <div class="item">
  <img class="img-item" src="${item.thumbnail}"/>
  <p id="id-item">${item.id}</p>
  <div class="div-title-item">
  <p id="title-item">${item.title}</p>
  </div>
  <p id="price-item">${item.price}</p>
  <button class="button-removeItem">x</button>
  </div>
  `;
}

function exibitionItensInCart() {
    const buttonsAddItemCartNode = document.querySelectorAll(".button-add-product");
    const buttonsAddItemCartList = Array.from(buttonsAddItemCartNode);
    return buttonsAddItemCartList.map((button) => {
        button.addEventListener("click", async function() {
            const buttonProduct = button.parentNode;
            const entireProduct = buttonProduct.children;
            const productId = entireProduct[1].innerHTML;
            const entireItem = await getItemAPI(productId);
            const item = createCartItemElement(entireItem);
            saveCartItems(item);
            window.location.reload();
        })
    })
}
exibitionItensInCart()

//REMOVE ITEM CART WITH CLICK:
function cartItemClickListener() {
    const ul = document.querySelector(".cart-itens");
    return ul.addEventListener("click", (event) => {
        const eventClick = event.target;
        if (eventClick.innerHTML === "x") {
            return eventClick.parentNode.remove()
        }
    })
}
cartItemClickListener()

//LOCAL STORAGE:
function getSavedCartItems() {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
}

function saveCartItems(product) {
    if (localStorage.hasOwnProperty("cartItems")) {
        return localStorage.setItem("cartItems", JSON.stringify([...getSavedCartItems(), product]));
    } else {
        localStorage.setItem('cartItems', JSON.stringify([product]))
    }
}

function exibitionCartItensLocalStorage() {
    const ul = document.querySelector(".cart-itens")
    const cartItens = getSavedCartItems();
    return cartItens.map((item) => {
        ul.innerHTML = `${item}`
    })
}
window.onload = exibitionCartItensLocalStorage()

function removeCartItemLocalStorage(product) {
    const cartItemsLocalStorage = getSavedCartItems();
    return cartItemsLocalStorage.filter((item) => item !== product);
}


//CALCUATED ALL PRICES CART ITENS:
function calculateAllPriceCartItems() {
    const subtotal = document.querySelector(".total-price");
    const pricesNode = document.querySelectorAll("#price-item")
    const pricesList = Array.from(pricesNode);
    const pricesValue = pricesList.map((item) => item.innerHTML);
    const somePricesString = pricesValue.reduce((pv, cv) => {
        return (pv) + (cv);
    })
    const somePricesNumber = parseInt(somePricesString);
    return subtotal.innerText = `Subtotal: R$${somePricesNumber.toFixed(2)}`;
}
calculateAllPriceCartItems();

//CLEAR CART:
function clearAllCartItens() {
    const buttonClear = document.querySelector(".empty-cart");
    const clear = buttonClear.addEventListener("click", () => {
        localStorage.clear();
        window.location.reload();
    })
    return clear;
}
clearAllCartItens();