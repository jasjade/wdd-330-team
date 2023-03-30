import { getLocalStorage } from "./utils.mjs";
//import { deleteItem } from "./deleteItem.js"; 



function cartItemTemplate(item) {

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
    <button class="cart-remove__item" data-id=${item.Id} data-key="so-wish">X</></button></div>
    <div class="cart_qty">
    <button class="moveToCart" data-id=${item.Id} data-key="so-wish">Move to Cart</button>
    </div>
    <p class="cart-card__unit_price">Unit Price: $${item.FinalPrice}</p>
    </li>`;
      return newItem;
      //document.querySelector(".cart-remove__item").addEventListener('click', deleteProduct);
      //deleteProduct();
  }

export default class WishList {
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
        this.total = 0;
        this.list = [];
    }

    async init() {
      this.list = getLocalStorage(this.key) || [];
      this.renderCartContents(this.list);
    }

    renderCartContents() {
        //const cartItems = getLocalStorage(this.key) || [];
        const htmlItems = this.list.map((item) => cartItemTemplate(item));
        document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
    }
    
    //compute the sub-total price of the cart


}


  
  
 