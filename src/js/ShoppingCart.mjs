import { getLocalStorage } from "./utils.mjs"; 

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
    <p class="cart-remove__item"><span data-id=${item.Id}>X</span></p>
    <p class="cart-card__quantity">Quantity: ${item.quantity}</p>
    <p class="cart-card__unit_price">Unit Price: $${item.FinalPrice}</p>
    <p class="cart-card__total_price">Total: $${subtotal}</p>
    </li>`;
      return newItem;
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

  
  
 