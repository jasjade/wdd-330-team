import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
//console.log('no paso :(')
loadHeaderFooter();

const category = getParam();
console.log("prd-listing", category[0])
// first create an instance of our ExternalServices class.
const dataSource = new ExternalServices();
// then get the element we want the product list to render in
//listElement is the element from the HTML were the cards will be placed
const element = document.querySelector(".product-list");
// then create an instance of our ProductList class and send it the correct information.
const listing = new ProductList(category, dataSource, element);
// finally call the init method to show our products
//check list of products in the console
listing.init();

//Change the header based on the category
const productHeader = document.querySelector('.products > h2');
productHeader.innerHTML = `Top Product ${category[0].charAt(0).toUpperCase() + category[0].slice(1)}: ${category[1].charAt(0).toUpperCase() + category[1].slice(1)}`


//Manually set the breadcrumbs -Greg
//I have transferred this feature in ProductListmjs init
