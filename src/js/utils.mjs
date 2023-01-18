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
  let existingData = getLocalStorage(key)
  //console.log(existingData)
  if (existingData == null) {existingData = []}
  existingData.push(data)
  //console.log(existingData)
  localStorage.setItem(key, JSON.stringify(existingData));

  //localStorage.setItem(key, JSON.stringify(data));
  //console.log(`from stringify ${JSON.stringify(data)}`)
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
export function getParam(param) {
  const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('product');
return product;
}