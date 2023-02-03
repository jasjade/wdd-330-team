import ProductData from './ProductData.mjs';
import ProductList  from './ProductList.mjs';
import  { loadHeaderFooter }  from './utils.mjs';
//console.log('no paso :(')
loadHeaderFooter();

const dataSource = new ProductData('tents');
//listElement is the element from the HTML were the cards will be placed
const listElement = document.querySelector('.product-list');
const productList = new ProductList ('Tents', dataSource, listElement);

//check list of products in the console
productList.init();


