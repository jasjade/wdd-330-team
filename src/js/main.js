import { doc } from 'prettier';
import  { loadHeaderFooter, getLocalStorage, setLocalStorage }  from './utils.mjs';
//console.log('no paso :(')
loadHeaderFooter();

//New register modal --- Natalia //
const visit = getLocalStorage('currentVisit');
const modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close-modal');

if (!visit) {
    modal.showModal();
    setLocalStorage('currentVisit', 'firstVisit');
    };
    
    closeModal.addEventListener('click', () =>{
    modal.close();
})

//End of new register modal //







/*

import ExternalServices from './ExternalServices.mjs';
import ProductList  from './ProductList.mjs';
import  { loadHeaderFooter }  from './utils.mjs';
//console.log('no paso :(')
loadHeaderFooter();

const dataSource = new ExternalServices('tents');
//listElement is the element from the HTML were the cards will be placed
const listElement = document.querySelector('.product-list');
const productList = new ProductList ('Tents', dataSource, listElement);

//check list of products in the console
productList.init();

*/





