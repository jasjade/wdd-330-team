import { getParam, loadHeaderFooter } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs';
import ProductDetails from './ProductDetails.mjs';

loadHeaderFooter();

//used to be like this
//const dataSource = new ExternalServices('tents');
//removing the 'tents'
const dataSource = new ExternalServices();
const productId = getParam('product');
const product = new ProductDetails(productId, dataSource);
product.init();

//Manually set the breadcrumbs feature is done via init in 
//ProductDetails class


