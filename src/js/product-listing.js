import ProductData from './ProductData.mjs';
import ProductList  from './ProductList.mjs';
import  { loadHeaderFooter , getParam}  from './utils.mjs';
//console.log('no paso :(')
loadHeaderFooter();

const category = getParam("category");
// first create an instance of our ProductData class.
const dataSource = new ProductData();
// then get the element we want the product list to render in
//listElement is the element from the HTML were the cards will be placed
const listElement = document.querySelector('.product-list');
// then create an instance of our ProductList class and send it the correct information.
const productList = new ProductList (category, dataSource, listElement);
// finally call the init method to show our products
//check list of products in the console
productList.init();

//Change the header based on the category
const productHeader = document.querySelector('.products > h2');
productHeader.innerHTML = `Top Products: ${category.charAt(0).toUpperCase() + category.slice(1)}`