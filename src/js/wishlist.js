import { loadHeaderFooter } from './utils.mjs';
import WishList from './WishList.mjs';

loadHeaderFooter();

const wish = new WishList('so-wish', '.product-list');

wish.init();
