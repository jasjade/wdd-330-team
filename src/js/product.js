import { setLocalStorage, getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './json/ProductDetails.mjs';


const dataSource = new ProductData('tents');
const productId = getParam('product');
const product = new ProductDetails(productId, dataSource);
product.init();
