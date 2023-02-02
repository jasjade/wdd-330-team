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

  localStorage.setItem(key, JSON.stringify(data));
  //console.log(`from stringify ${JSON.stringify(data)}`)
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}
export function getParam(param) {
  const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get(param);
return product;
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
//this.listElement: The element we want to insert the new HTML into is being provided by the class
 
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

//this.listElement: The element we want to insert the new HTML into is being provided by the class
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

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}