import { getLocalStorage, setLocalStorage, returnCartTotalQuantities, renderCartSuperscript} from '../js/utils.mjs';

//import { getLocalStorage, setLocalStorage } from '../js/utils.mjs'; --


function productDetailsDisplay(product) {
    let discountDollars = product.SuggestedRetailPrice - product.FinalPrice
    let discountPercent = (discountDollars / product.SuggestedRetailPrice) * 100
    return `<h3>${product.Brand.Name}</h3>
      <h2 class='divider'>${product.NameWithoutBrand}</h2>
      <img
        class='divider'
        src='${product.Images.PrimaryLarge}'
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
      </div>

      <!-- animated flying image 
      <img
      class='divider image active'
      src='${product.Image}'
      alt='${product.NameWithoutBrand}'
      /> 
      -->`;
  }

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    console.log(this.product);
    //I will change the 'main' selector to 'product-detail'
    // because int the product-pages/index.html
    // we already have this section prepared
    //<section class="product-detail"></section>
    //changing this:
    //this.renderProductDetails('main');
    //to this:
    this.renderProductDetails('.product-detail');
    //upon changing the selector, we will need to remove 
    //<section class='product-detail'> opening and  </section> closing 
    //in the productDetailsDisplay function 
    // NOTES FROM GREG ABOVE

    //Manually set the breadcrumbs -Greg
    const breadcrumbsHome = document.querySelector('.breadcrumbs-container .breadcrumbs-ul .breadcrumbs-li.home');
    console.log(window.location.hostname)
    breadcrumbsHome.innerHTML =`<a href="/">Home</a>`;

    const breadcrumbsCategory = document.querySelector('.breadcrumbs-container .breadcrumbs-ul .breadcrumbs-li.category');
    breadcrumbsCategory.innerHTML = `<a href="/product-listing/index.html?category=${this.product.Category}">${this.product.Category.charAt(0).toUpperCase() + this.product.Category.slice(1)}</a>`;

    const breadcrumbsProductName = document.querySelector('.breadcrumbs-container .breadcrumbs-ul .breadcrumbs-li.product-name');
    breadcrumbsProductName.innerHTML = this.product.NameWithoutBrand;


    //flyToCart()
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }

  addToCart() {
    let Data = getLocalStorage('so-cart');
      if (Data) {
        let tent = 1;
        for (let i = 0; i < Data.length; i++) {
          if (Data[i].Id == this.productId) {
            
            Data[i].quantity++;
            tent = 0;
          }
        }
        if (tent == 1) {
          this.product.quantity = 1;
          Data.push(this.product);
        }
      } else {
        Data = [];
        this.product.quantity = 1;
        Data.push(this.product);
      }
      setLocalStorage('so-cart', Data);
    
    flyToCart()
    //setLocalStorage('so-cart', this.product);
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      'afterBegin',
      productDetailsDisplay(this.product)
    );
  }
}



function flyToCart() {
  const cartElement = document.querySelector('.cart');
  const productImg = document.querySelector('.product-detail > img.divider');
  const boundingCart = cartElement.getBoundingClientRect();
  const boundingImage = productImg.getBoundingClientRect();
  const xDistance = boundingCart.left - boundingImage.left;
  const yDistance = boundingImage.top - boundingCart.top;
  //const cartQuantity = returnCartItems(['so-cart', 'do-cart']).length;

  //clone the image
  const imageClone = productImg.cloneNode();
  imageClone.classList.add('flying-img');
  cartElement.appendChild(imageClone);
  cartElement.classList.add('shake');
  //set var
  imageClone.style.cssText = `
    --width : ${boundingImage.width.toFixed(2)}px;
    --left : -${xDistance.toFixed(2)}px;
    --top : ${yDistance.toFixed(2)}px;
  `;

  setTimeout(() => {
    cartElement.removeChild(imageClone);
    cartElement.classList.remove('shake');
    renderCartSuperscript(returnCartTotalQuantities('so-cart'));
    //renderCartSuperscript(cartQuantity)
}, 2000);

}



