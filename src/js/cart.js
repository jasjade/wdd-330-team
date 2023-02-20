import { loadHeaderFooter } from './utils.mjs';
import ShoppingCart from './ShoppingCart.mjs';

loadHeaderFooter();

const cart = new ShoppingCart('so-cart', '.product-list');
//cart.renderCartContents();

//imclude the renderContents() in the ShoppingCart method as per instrutor's example
cart.init();
console.log(cart.total)
//if cart is empty, hide the checkout button part
if (cart.total > 0) {
    // show our checkout button and total if there are items in the cart.
    document.querySelector(".list-footer").classList.remove("hide");
}