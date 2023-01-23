import { setLocalStorage} from './utils.mjs';

function addProductToCart(product) {
  setLocalStorage('so-cart', product);
}


  
export default class ProductDetails {
  constructor(productId, dataSource){
      this.productId = productId;
      this.product = {};
      this.discountDollars = 0;
      this.discountPercent = 0;
      this.dataSource = dataSource;
    }

  async init() {
  // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  // once we have the product details we can render out the HTML
  // once the HTML is rendered we can add a listener to Add to Cart button
  // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
  this.product = await this.dataSource.findProductById(this.productId);
  this.computedDiscount(this.product)
  this.renderProductDetails(this.product)
  document.getElementById('addToCart')
          .addEventListener('click', this.addToCart.bind(this));
  }



  async addToCart() {
      addProductToCart(this.product);
  }

  computedDiscount(product) {
    this.discountDollars = product.SuggestedRetailPrice - product.FinalPrice;
    this.discountPercent = (this.discountDollars/product.FinalPrice)*100
  }

  renderProductDetails(product) {
    //console.log(product)
    let mainHTML = document.querySelector(".divider.main-product-page")

    mainHTML.innerHTML = `
    <section class="product-detail">
      <h3>${product.Brand.Name}</h3>

      <h2 class="divider">${product.NameWithoutBrand}</h2>

      <img class="divider" src="${product.Image}"/>

      <h4 class="price_header">Final Price</h4>
      <p class="product-card__price"><span class="final_price"><strong>$${product.FinalPrice}</strong></span>&nbsp; &nbsp;<span class="suggested_price">$${product.SuggestedRetailPrice.toFixed(2)}</span></p>
      <p class="discount_indicator">You saved: <span class="discount-amount">$${this.discountDollars.toFixed(2)} (${this.discountPercent.toFixed(2)}%)</span></p>

      <p class="product__color">$${product.Colors[0].ColorName}</p>

      <p class="product__description">
        ${product.DescriptionHtmlSimple}
      </p>

      <div class="product-detail__add">
        <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
      </div>
  </section>
    
    `
  }

}