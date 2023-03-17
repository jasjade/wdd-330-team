import { loadHeaderFooter, getParam } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";
//console.log('no paso :(')
loadHeaderFooter();

const category = getParam();
// console.log("prd-listing", category)
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


//Manually set the breadcrumbs -Greg
//I have transferred this feature in ProductListmjs init
