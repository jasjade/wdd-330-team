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
    let discountPercent = (discountDollars / product.SuggestedRetailPrice) * 100
    
    // I have also included the discount details in the template -GREG

    //if (UrlExists(product.Images)) {
    return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="Image of ${product.Name}"
    />
    <h3 class="card__brand">${product.Brand.Name}</h3>
    <h2 class="card__name">${product.Name}</h2>
    <p class="product-card__price"><strong>$${product.FinalPrice.toFixed(2)}</strong> &nbsp; <span class="disc-ind">-${discountPercent.toFixed(2)}%</span></p>
    <p class="product-card__suggested"><em>$${product.SuggestedRetailPrice.toFixed(2)}</em></p>
    </a>
    <button class="quick-view-button">Quick View</button>
  </li>`;
  //}   
}

function productModalTemplate(product) {

  return `
  <h2 class="divider">${product.NameWithoutBrand}</h2>

  <picture class="divider">
    <source media="(min-width:850px)" srcset="${product.Images.PrimaryMedium}">
    <source media="(min-width:500px)" srcset="${product.Images.PrimarySmall}">
    <img src="${product.Images.PrimaryExtraLarge}">
  </picture>

  <p class="product__description">
    ${product.DescriptionHtmlSimple}
  </p>

  <div class="close-button-container">
    <button id="close-button">X</button>
  </div>
  
  `
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
      
      const modalContainer = document.querySelector('.product-detail.quick-view .product-detail-wrapper')
      // our dataSource will return a Promise...so we can use await to resolve it.
      //const list = await this.dataSource.getData();
      // console.log('ProdList', this.category[1])
      const breadcrumbsHome = document.querySelector('.breadcrumbs-container .breadcrumbs-ul .breadcrumbs-li.home');
      breadcrumbsHome.innerHTML = `<a href="/">Home</a>`;
      const breadcrumbsCategory = document.querySelector('.breadcrumbs-container .breadcrumbs-ul .breadcrumbs-li.category');
      

      if(this.category[0] == 'category') {
        let list
        //Change the header based on the category
        const productHeader = document.querySelector('.products > h2');
        productHeader.innerHTML = `Top Product ${this.category[0].charAt(0).toUpperCase() + this.category[0].slice(1)}: ${this.category[1].charAt(0).toUpperCase() + this.category[1].slice(1)}`

        list = await this.dataSource.getData(this.category[1]);
        //Manually set the breadcrumbs -Greg
        breadcrumbsCategory.innerHTML = `${this.category[1].charAt(0).toUpperCase() + this.category[1].slice(1)} (${list.length} items)`;
        this.renderList(list);
        //add event listener to quick view buttons
        this.addQuickViewListener(list, modalContainer);
      }

      if(this.category[0] == 'search') {
        
          let categories = ['tents', 'backpacks', 'sleeping-bags', 'hammocks']
          let sanitizedKeyword = this.category[1].replace('+', ' ')
          //Change the header based on the category
          const productHeader = document.querySelector('.products > h2');
          breadcrumbsCategory.innerHTML = `Search Results: ${sanitizedKeyword.charAt(0).toUpperCase() + sanitizedKeyword.slice(1)}`

          let list = []
          let counter = 0

          categories.forEach(async category => {
            
            let temps = await this.dataSource.getData(category);
            temps = temps.filter((x) => {
              // console.log('x', x)
              if (x.Brand.Name.toLowerCase().includes(sanitizedKeyword.toLowerCase()) 
                || x.NameWithoutBrand.toLowerCase().includes(sanitizedKeyword.toLowerCase()) 
                || x.Category.toLowerCase().includes(sanitizedKeyword.toLowerCase()) ) {
                return x
              }
            })
            list = list.concat(temps)
            console.log('list', list)
            counter = counter + 1
            if (counter == 4) {
              if(list.length) {
                productHeader.innerHTML = `Search Results: ${sanitizedKeyword.charAt(0).toUpperCase() + sanitizedKeyword.slice(1)}`
                this.renderList(list);
              } else {
                productHeader.innerHTML = `0 search results`
              }
            }
          })
      }

    }

    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }//productCardTemplate: The template function we will use is hard coded

    addQuickViewListener(list, modalContainer) {
      //adding event listeners for each quick view buttons
      const quickViewButtons = document.querySelectorAll('.quick-view-button')
      quickViewButtons.forEach((button) =>{ 
        button.addEventListener('click', (e) => {
          //extracting the  href value
          //after extracting the href value, extract the product id
          const prodId = e.target.parentNode.querySelector('a').href.split('=')[1];

          //call the displayModal function to render the html
          this.displayModal(list, prodId, modalContainer)
        })
      })
    } 
    
    displayModal(list, prodId, modalContainer) {
      //let's do promises to ensure that the listItem is returned
      //before we proceed to the next steps
      let promise = new Promise(function(resolve, reject) {
        //experimenting on promises and delaying the completion of the 
        //tast to see if promises really work
        // setTimeout(() => {
              //return the list item based on the product Id
        //   resolve(list.find(listItem => listItem.Id == prodId ))
        // }, 5000)

        //return the list item based on the product Id
        resolve(list.find(listItem => listItem.Id == prodId ))
        
      })
      
      //once list item is returned, proceed to the next steps
      promise.then(
        function(result) {
          //add classname to the modalContainer to display
          modalContainer.parentNode.classList.add('show-modal')
          //render the HTML content
          renderListWithTemplate(productModalTemplate, modalContainer, [result]);
          //add an eventListener to the close button
          const closeBtn = document.querySelector('.close-button-container');
          closeBtn.addEventListener('click', () => {
            modalContainer.parentNode.classList.remove('show-modal')
            modalContainer.innerHTML = ""
          })

        }
      )
    }
}

   


  