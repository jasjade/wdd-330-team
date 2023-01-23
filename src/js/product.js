import {getParam } from './utils.mjs';
import ProductDetails from './ProductDetails.mjs';
import ProductData from './ProductData.mjs';


const dataSource = new ProductData('tents');
const productId = getParam('product');
//console.log(dataSource.findProductById(productId));

const product = new ProductDetails(productId, dataSource);
product.init();
















/*
// add to cart button event handler

function addProductToCart(product) {
  setLocalStorage('so-cart', product);
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}
*/
