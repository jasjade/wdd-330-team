import { getLocalStorage, setLocalStorage } from '../js/utils.mjs';

function productDetailsDisplay(product) {
    let discountDollars = product.SuggestedRetailPrice - product.FinalPrice
    let discountPercent = (discountDollars / product.SuggestedRetailPrice) * 100
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
      </div>

      <!-- animated flying image 
      <img
      class='divider image active'
      src='${product.Image}'
      alt='${product.NameWithoutBrand}'
      /> 
      -->
      
      </section>`;
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
}, 2000);
}













/*

  imageClone.style.cssText = `
    --width : ${boundingImage.width.toFixed(2)}px;
    --left : ${boundingImage.left}px;
    --top : ${(boundingImage.top - boundingBody.top).toFixed(2)}px;
    --xa : ${(xDistance*.20).toFixed(2)}px;
    --xb : ${(xDistance*.40).toFixed(2)}px;
    --xc : ${(xDistance*.60).toFixed(2)}px;
    --xd : ${(xDistance*.80).toFixed(2)}px;
    --xe : ${xDistance.toFixed(2)}px;
    --ya : ${(yDistance*.20).toFixed(2)}px;
    --yb : ${(yDistance*.40).toFixed(2)}px;
    --yc : ${(yDistance*.60).toFixed(2)}px;
    --yd : ${(yDistance*.80).toFixed(2)}px;
    --ye : ${yDistance.toFixed(2)}px;
  `;


@keyframes fly_to_cart {
  0% {
    left: var(--left);
    top: var(--top);
  }

  20% {
    left: calc(var(--left) + var(--xa));
    top: calc(var(--top) - var(--ya));
    transform: scale(.8);
  }

  40% {
    left: calc(var(--left) + var(--xb));
    top: calc(var(--top) - var(--yb));
    transform: scale(.6);
  }

  60% {
    left: calc(var(--left) + var(--xc));
    top: calc(var(--top) - var(--yc));
    transform: scale(.4);
  }

  80% {
    left: calc(var(--left) + var(--xd));
    top: calc(var(--top) - var(--yd));
    transform: scale(.2);

  }

  100% {
    left: calc(var(--left) + var(--xe));
    top: calc(var(--top) - var(--ye));
    transform: scale(.001);
  }

}

*/