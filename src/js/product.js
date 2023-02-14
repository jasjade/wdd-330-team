import { getParam, loadHeaderFooter } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

loadHeaderFooter();

//used to be like this
//const dataSource = new ProductData('tents');
//removing the 'tents'
const dataSource = new ProductData();
const productId = getParam('product');
const product = new ProductDetails(productId, dataSource);
product.init();

//Manually set the breadcrumbs feature is done via init in 
//ProductDetails class


