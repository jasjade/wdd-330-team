import { getLocalStorage } from "./utils.mjs";
//import { deleteItem } from "./deleteItem.js"; 



function cartItemTemplate(item) {
  //calculate the subtotal of each item rendered -- Natalia
  const subtotal = item.quantity * item.FinalPrice

  const newItem = `<li class="cart-card divider">
    <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <img
        src="${item.Images.PrimarySmall}"
        alt="${item.Name}"
      />
    </a>
    <a href="/product_pages/index.html?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <div class="remove-btn">
    <button class="cart-remove__item" data-id=${item.Id} data-key="so-cart">X</></button></div>
    <div class="cart_qty">
    <button class="decrease_units" data-id=${item.Id}>-</button>
    <p class="cart-card__quantity">${item.quantity}</p>
    <button class="increase_units" data-id=${item.Id}>+</button>
    </div>
    <p class="cart-card__unit_price">Unit Price: $${item.FinalPrice}</p>
    <p class="cart-card__total_price">Total: $${subtotal.toFixed(2)}</p>
    </li>`;
      return newItem;
      //document.querySelector(".cart-remove__item").addEventListener('click', deleteProduct);
      //deleteProduct();
  }

export default class ShoppingCart {
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
        this.total = 0;
        this.list = [];
    }

    async init() {
      this.list = getLocalStorage(this.key) || [];
      this.calculateListTotal(this.list);
      this.renderCartContents(this.list);
    }

    renderCartContents() {
        //const cartItems = getLocalStorage(this.key) || [];
        const htmlItems = this.list.map((item) => cartItemTemplate(item));
        document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
        document.querySelector(".list-total").innerText += ` $${this.total.toFixed(2)}`;
    }
    
    //compute the sub-total price of the cart
    calculateListTotal(list) {
      //price for each item is computed by finalPrice times quantity
      const amounts = list.map((item) => item.FinalPrice * item.quantity);
      //execute the code below if amounts array is not empty
      if (amounts.length) {
        this.total = amounts.reduce((sum, item) => sum + item);
      }
    }

}


  
  
 