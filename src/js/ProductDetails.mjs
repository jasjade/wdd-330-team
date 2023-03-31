import { getLocalStorage, setLocalStorage, returnTotalQuantities, renderSuperscripts, addToLocalByArray, deleteProductLocalStorage} from '../js/utils.mjs';

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
        <button class="wish-link" data-id="${product.Id}" id="addToWishList">
          <svg class="wish-svg" width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g id="Interface / Heart_02">
              <path id="Vector" d="M19.2373 6.23731C20.7839 7.78395 20.8432 10.2727 19.3718 11.8911L11.9995 20.0001L4.62812 11.8911C3.15679 10.2727 3.21605 7.7839 4.76269 6.23726C6.48961 4.51034 9.33372 4.66814 10.8594 6.5752L12 8.00045L13.1396 6.57504C14.6653 4.66798 17.5104 4.51039 19.2373 6.23731Z" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </g>
          </svg>
        </button>
      </div>
    `;
  }

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId[1]);
    
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
    breadcrumbsHome.innerHTML =`<a href="/">Home</a>`;

    const breadcrumbsCategory = document.querySelector('.breadcrumbs-container .breadcrumbs-ul .breadcrumbs-li.category');
    breadcrumbsCategory.innerHTML = `<a href="/product-listing/index.html?category=${this.product.Category}">${this.product.Category.charAt(0).toUpperCase() + this.product.Category.slice(1)}</a>`;

    const breadcrumbsProductName = document.querySelector('.breadcrumbs-container .breadcrumbs-ul .breadcrumbs-li.product-name');
    breadcrumbsProductName.innerHTML = this.product.NameWithoutBrand;

    //this is for the wishbutton style
    let wishbutton = document.querySelector("#addToWishList")
    let Data = getLocalStorage("so-wish")
    if (Data == null) {
      wishbutton.classList.add("wishRemoved")
    }

    if (Data) {
      let duplicate = Data.filter((item) => {
        if (item.Id == this.product.Id) {
          return 1
        }
      })

      if (duplicate.length > 0) {
        wishbutton.classList.remove("wishRemoved")
      }

      if (duplicate.length == 0) {
        wishbutton.classList.add("wishRemoved")
      }
      
    }


    //flyToCart()
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
    
    document
    .getElementById('addToWishList')
    .addEventListener('click', this.toggleToWish.bind(this));
  }

  addToCart() {
    addToLocalByArray(this.product, this.productId, "so-cart")
    flyToCart()
    //setLocalStorage('so-cart', this.product);
  }

  toggleToWish() {
    let wishbutton = document.querySelector("#addToWishList")
    let Data = getLocalStorage("so-wish")
    //console.log(Data)
    if(Data == null) {
      addToLocalByArray(this.product, this.productId, "so-wish")
    }

    if(Data) {
      let duplicate = Data.filter((item) => {
         if (item.Id == this.product.Id) {
           return 1
         }
      })
      if (duplicate == 0) {
        addToLocalByArray(this.product, this.productId, "so-wish")
        wishbutton.classList.remove("wishRemoved")
        wishListPromt("Added to Wishlist")
      } else {
        deleteProductLocalStorage(this.product.Id, "so-wish")
        wishbutton.classList.add("wishRemoved")
        wishListPromt("Removed from Wishlist")
      }

    }
    
  }



  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      'afterBegin',
      productDetailsDisplay(this.product)
    );
  }
}

function wishListPromt(prompt) {
  const wishPrompt = document.createElement("div");
  wishPrompt.classList.add("wishStatus")
  wishPrompt.innerHTML = prompt
  document.querySelector(".product-detail").appendChild(wishPrompt)
  setTimeout(() => {
    document.querySelector(".product-detail").removeChild(wishPrompt);
    renderSuperscripts([returnTotalQuantities('so-cart'),returnTotalQuantities('so-wish')]);
  }, 2000)
  

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
    renderSuperscripts([returnTotalQuantities('so-cart'),returnTotalQuantities('so-wish')]);
    //renderCartSuperscript(cartQuantity)
}, 2000);

}



