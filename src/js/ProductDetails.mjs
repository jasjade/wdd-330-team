import { setLocalStorage } from '../js/utils.mjs';

function productDetailsDisplay(product) {
    let discountDollars = product.SuggestedRetailPrice - product.FinalPrice
    let discountPercent = (discountDollars/product.SuggestedRetailPrice) * 100
    return `<section class='product-detail'> <h3>${product.Brand.Name}</h3>
      <h2 class='divider'>${product.NameWithoutBrand}</h2>
      <img
        class='divider'
        src='${product.Image}'
        alt='${product.NameWithoutBrand}'
      />
      <!-- FROM GREG -->
      <h4 class="price_header">Final Price</h4>
      <p class="product-card__price"><span class="final_price"><strong>$${product.FinalPrice}</strong></span>&nbsp; &nbsp;<span class="suggested_price">$${product.SuggestedRetailPrice.toFixed(2)}</span></p>
      <p class="discount_indicator">You saved: <span class="discount-amount">$${discountDollars.toFixed(2)} (${discountPercent.toFixed(2)}%)</span></p>
      <!-- FROM GREG -->
      <p class='product__color'>${product.Colors[0].ColorName}</p>
      <p class='product__description'>
      ${product.DescriptionHtmlSimple}
      </p>
      <div class='product-detail__add'>
        <button id='addToCart' data-id='${product.Id}'>Add to Cart</button>
      </div></section>`;
  }

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails('main');
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    setLocalStorage('so-cart', this.product);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      'afterBegin',
      productDetailsDisplay(this.product)
    );
  }
}