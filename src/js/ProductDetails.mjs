import { setLocalStorage} from './utils.mjs';

function addProductToCart(product) {
  setLocalStorage('so-cart', product);
}
  
export default class ProductDetails {
  constructor(productId, dataSource){
      this.productId = productId;
      this.product = {};
      this.dataSource = dataSource;
    }

  async init() {
  // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
  // once we have the product details we can render out the HTML
  // once the HTML is rendered we can add a listener to Add to Cart button
  // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
  this.product = await this.dataSource.findProductById(this.productId);
  this.renderProductDetails(this.product)
  document.getElementById('addToCart')
          .addEventListener('click', this.addToCart.bind(this));
  }



  async addToCart() {
      addProductToCart(this.product);
  }

  renderProductDetails(product) {
    //console.log(product)
    let mainHTML = document.querySelector(".divider.main-product-page")

    mainHTML.innerHTML = `
    <section class="product-detail">
      <h3>${product.Brand.Name}</h3>

      <h2 class="divider">${product.NameWithoutBrand}</h2>

      <img
        class="divider"
        src="${product.Image}"/>

      <p class="product-card__price">${product.FinalPrice}</p>

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