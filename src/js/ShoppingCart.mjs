import { getLocalStorage } from "./utils.mjs";
//import { deleteItem } from "./deleteItem.js"; 



function cartItemTemplate(item) {
  
  const subtotal = item.quantity * item.FinalPrice

  const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <button><span data-id=${item.Id} class="cart-remove__item">X</span></button>
    <p class="cart-card__quantity">Quantity: ${item.quantity}</p>
    <p class="cart-card__unit_price">Unit Price: $${item.FinalPrice}</p>
    <p class="cart-card__total_price">Total: $${subtotal}</p>
    </li>`;
      return newItem;
      //document.querySelector(".cart-remove__item").addEventListener('click', deleteProduct);
      //deleteProduct();
  }

export default class ShoppingCart {
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
    }

    renderCartContents() {
        const cartItems = getLocalStorage(this.key) || [];
        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
        document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    }   
}


function deleteProduct() {
  //get the parent element of the button that was clicked
  //const productCard = event.target.closest(".cart-card");
  //const productCard = document.querySelector(".cart-remove__item")
  //get the name of the product
  const dataId = document.querySelector("#data-id").value;
  console.log(dataId);
  //remove the product from the localstorage
  let cart = JSON.parse(localStorage.getItem("so-cart"));
  cart = cart.filter((item) => item.Id !== dataId);
  //set the localstorage
  localStorage.setItem("so-cart", JSON.stringify(cart));
  //remove the product from the DOM
  // productCard.remove();
  // //if the cart is empty, display a message
  // if (cart.length === 0) {
  // const messageEmptyCart = document.createElement("p");
  // document.querySelector(".cart-total").style.display = "none;";
  // messageEmptyCart.textContent = "Your cart is empty!";
  // messageEmptyCart.style.fontSize = "2rem";
  // messageEmptyCart.style.fontWeight = "bold";
  // myCartContainer.appendChild(messageEmptyCart);
  // messageEmptyCart.style.textAlign = "center";
  //}
  window.location.reload();
}

  
  
 