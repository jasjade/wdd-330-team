// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  // let existingData = getLocalStorage(key)
  // //console.log(existingData)
  // if (existingData == null) {existingData = []}
  // existingData.push(data)
  // //console.log(existingData)
  // localStorage.setItem(key, JSON.stringify(existingData));
  //code above refactored and added to add to cart ProductDetails.mjs -Greg

  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}
export function getParam() {
///export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  //console.log(urlParams.get(param))
  const queryParameters = urlParams.toString().split("=");
  return queryParameters;
}

export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = 'afterbegin',
  clear = false
) {
  const htmlStrings = list.map(templateFn);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = '';
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export function renderSuperscripts(data) {
  const cartSuperscript = document.querySelector("header .cart");
  cartSuperscript.style.cssText = `--item : '${data[0]}';`

  const wishSuperscript = document.querySelector("header .wish-link");
  wishSuperscript.style.cssText = `--item : '${data[1]}';`

}
 
export function renderWithTemplate(
  template,
  parentElement,
  data,
  callback
) { 
  parentElement.insertAdjacentHTML(`afterbegin`, template);
  if (callback) {
    callback(data);
  }
}

export function returnTotalQuantities(key) {
  let localStorageItems = getLocalStorage(key) || [];
  let localStorageTotalQuantity = 0
  // keys.forEach(key => {
  //   let innerCart = getLocalStorage(key);
  //   if (innerCart) {
  //     innerCart.forEach( item => cartItems.push(item));
  //   }
  // });
  localStorageItems.forEach(item => {
    localStorageTotalQuantity += item.quantity;
  });

  return localStorageTotalQuantity
}


async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate('../partials/header.html');
  const headerElement = document.querySelector('#main-header');
  const footerTemplate = await loadTemplate('../partials/footer.html');
  const footerElement = document.querySelector('#main-footer');
  const cartTotalQuantity = returnTotalQuantities('so-cart');
  const wishTotalQuantity = returnTotalQuantities('so-wish');
  let data = [cartTotalQuantity, wishTotalQuantity]
  //const cartQuantity = returnCartItems(['so-cart']).length;

  renderWithTemplate(headerTemplate, headerElement, data, renderSuperscripts);
  renderWithTemplate(footerTemplate, footerElement);
}

export function alertMessage(message, scroll=true, duration = 3000) {

    // create element to hold our alert
    const alert = document.createElement('div');
    // add a class to style the alert
    alert.classList.add('alert');
    // set the contents. You should have a message and an X or something the user can click on to remove
    alert.innerHTML = `<p>${message}</p><span>X</span>`;
    // add a listener to the alert to see if they clicked on the X
    // if they did then remove the child
    alert.addEventListener('click', function(e) {
        if(e.target.tagName == "SPAN") { // how can we tell if they clicked on our X or on something else?  hint: check out e.target.tagName or e.target.innerText
          main.removeChild(this);
        }
    })
    // add the alert to the top of main
    const main = document.querySelector('main');
    main.prepend(alert);
    // make sure they see the alert by scrolling to the top of the window
    //we may not always want to do this...so default to scroll=true, but allow it to be passed in and overridden.
    if(scroll) window.scrollTo(0,0);

    // setTimeout(function () {
    //   main.removeChild(alert);
    // }, duration);

}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll(".alert");
  alerts.forEach((alert) => document.querySelector("main").removeChild(alert));
}

export function addToLocalByArray(product, productId, key) {
  let Data = getLocalStorage(key);
  if (Data) {
    let tent = 1;
    for (let i = 0; i < Data.length; i++) {
      if (Data[i].Id == productId) {
        
        Data[i].quantity++;
        tent = 0;
      }
    }
    if (tent == 1) {
      product.quantity = 1;
      Data.push(product);
    }
  } else {
    Data = [];
    product.quantity = 1;
    Data.push(product);
  }
  setLocalStorage(key, Data);
   
}

export function deleteProductLocalStorage(itemIdRemoved, key) { 
  let cart = JSON.parse(localStorage.getItem(key));
  cart = cart.filter((item) => item.Id !== itemIdRemoved);
  //set the localstorage
  localStorage.setItem(key, JSON.stringify(cart));
}


export function toggleToLocalByArray(product, key) {
  // this.list = getLocalStorage(this.key) || [];
  let Data = getLocalStorage(key) || []

  if (Data.length == 0) {
    Data.push(product)
    setLocalStorage(key , Data)
  }
  // console.log(Data.length)

  if(Data) {
    let duplicate = Data.filter((item) => {
      // console.log("item.Id", item.Id)
      // console.log("this.product.Id",this.product.Id)
       if (item.Id == product.Id) {
         return 1
       }
    })

    // console.log("duplicate.length",duplicate.length)
    if (duplicate == 0) {
      // console.log("no duplicate -called")
        Data.push(product)
        setLocalStorage(key , Data);
    }
  }

  // console.log("last", Data.length)
   
}










/*

export function addToLocalByArray(product, key) {
  // this.list = getLocalStorage(this.key) || [];
  let Data = getLocalStorage(key) || []

  if (Data.length == 0) {
    Data.push(product)
    setLocalStorage(key , Data)
  }
  // console.log(Data.length)

  if(Data) {
    let duplicate = Data.filter((item) => {
      // console.log("item.Id", item.Id)
      // console.log("this.product.Id",this.product.Id)
       if (item.Id == product.Id) {
         return 1
       }
    })

    // console.log("duplicate.length",duplicate.length)
    if (duplicate == 0) {
      // console.log("no duplicate -called")
        Data.push(product)
        setLocalStorage(key , Data);
    }
  }

  // console.log("last", Data.length)
   
}




*/
