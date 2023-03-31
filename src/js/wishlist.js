import { loadHeaderFooter } from './utils.mjs';
import WishList from './WishList.mjs';

loadHeaderFooter();

const wish = new WishList('so-wish', '.product-list');
//cart.renderCartContents();

//imclude the renderContents() in the ShoppingCart method as per instrutor's example
wish.init();
//if cart is empty, hide the checkout button part


// if (cart.total > 0) {
//     // show our checkout button and total if there are items in the cart.
//     document.querySelector(".list-footer").classList.remove("hide");
// }