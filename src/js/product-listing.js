import { loadHeaderFooter, getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
//console.log('no paso :(')
loadHeaderFooter();

const category = getParam("category");
// first create an instance of our ProductData class.
const dataSource = new ProductData();
// then get the element we want the product list to render in
//listElement is the element from the HTML were the cards will be placed
const element = document.querySelector(".product-list");
// then create an instance of our ProductList class and send it the correct information.
const listing = new ProductList(category, dataSource, element);
// finally call the init method to show our products
//check list of products in the console
listing.init();

//Change the header based on the category
const productHeader = document.querySelector(".products > h2");
productHeader.innerHTML = `Top Products: ${
  category.charAt(0).toUpperCase() + category.slice(1)
}`;

//Manually set the breadcrumbs -Greg
//I have transferred this feature in ProductListmjs init

/*
https://stackoverflow.com/questions/18998797/create-breadcrumbs-dynamically-on-client-side-using-javascript

*/
