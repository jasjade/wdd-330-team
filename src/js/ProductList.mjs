import { renderListWithTemplate } from './utils.mjs';

function UrlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
}

function productCardTemplate(product) {
    //computing the discount in amount and percentage -GREG
    let discountDollars = product.SuggestedRetailPrice - product.FinalPrice
    let discountPercent = (discountDollars/product.SuggestedRetailPrice) * 100
    // I have also included the discount details in the template -GREG
    if (UrlExists(product.Image)) {
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Image}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price"><strong>${product.FinalPrice.toFixed(2)}</strong> &nbsp; <span class="disc-ind">-${discountPercent.toFixed(2)}%</span></p>
    <p class="product-card__suggested"><em>${product.SuggestedRetailPrice.toFixed(2)}</em></p>
    </a>
    
  </li>`;
  }   
}



export default class ProductList {
    constructor(category, dataSource, listElement) {
      // We passed in this information to make our class as reusable as possible.
      // Being able to define these things when we use the class will make it very flexible
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = listElement;
    }
    async init() {
      // our dataSource will return a Promise...so we can use await to resolve it.
      const list = await this.dataSource.getData();
      // render the list 
      this.renderList(list);
    }
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }//productCardTemplate: The template function we will use is hard coded
    
}

   


  