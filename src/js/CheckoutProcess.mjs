import { getLocalStorage, returnCartTotalQuantities, alertMessage, removeAllAlerts, setLocalStorage} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";

const services = new ExternalServices();

// takes a form element and returns an object where the key is the "name" of the form input.
function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};

  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
    const simplifiedItems = items.map((item) => {
      console.log(item);
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
      };
    });
    return simplifiedItems;
  }

export default class CheckoutProcess {
    constructor(key, outputSelector) {
      this.key = key;
      this.outputSelector = outputSelector;
      this.list = [];
      this.itemTotal = 0;
      this.shipping = 0;
      this.tax = 0;
      this.orderTotal = 0;
    }
    init() {
      //if local storage is empty, give an empty array instead. this is to prevent error
      //because this.list is expecting an array
      this.list = getLocalStorage(this.key) || [];
      this.calculateItemSummary();
    }
    calculateItemSummary() {
        // calculate and display the total amount of the items in the cart, and the number of items.
      const summaryElement = document.querySelector(
        this.outputSelector + " #cartTotal"

        // console.log('test', outputSelector)

      );
      const itemNumElement = document.querySelector(
        this.outputSelector + " #num-items"
      );
      //itemNumElement.innerText = this.list.length;
      
      itemNumElement.innerText = `${returnCartTotalQuantities('so-cart')} items`;
         // calculate the total of all the items in the cart
      const amounts = this.list.map((item) => item.FinalPrice * item.quantity);
      this.itemTotal = amounts.reduce((sum, item) => sum + item);
      summaryElement.innerText = "$" + this.itemTotal.toFixed(2);
    }
    calculateOrdertotal() {
        // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
      //this.shipping = 10 + (this.list.length - 1) * 2;
      console.log('test')
      this.shipping = 10 + (returnCartTotalQuantities('so-cart') - 1) * 2;
      this.tax = (this.itemTotal * 0.06).toFixed(2);
      this.orderTotal = (
        parseFloat(this.itemTotal) +
        parseFloat(this.shipping) +
        parseFloat(this.tax)
      ).toFixed(2);
      // display the totals.
      this.displayOrderTotals();
    }
    displayOrderTotals() {
        // once the totals are all calculated display them in the order summary page
      const shipping = document.querySelector(this.outputSelector + " #shipping");
      const tax = document.querySelector(this.outputSelector + " #tax");
      const orderTotal = document.querySelector(
        this.outputSelector + " #orderTotal"
      );
      shipping.innerText = "$" + this.shipping;
      tax.innerText = "$" + this.tax;
      orderTotal.innerText = "$" + this.orderTotal;
      
    }
    async checkout() {
      const formElement = document.forms["checkout"];
      const json = formDataToJSON(formElement);
      // add totals, and item details
      json.orderDate = new Date();
      json.orderTotal = this.orderTotal;
      json.tax = this.tax;
      json.shipping = this.shipping;
      json.items = packageItems(this.list);
      console.log(json);
      try {
        const res = await services.checkout(json);
        console.log(res);
        setLocalStorage("so-cart", []);
        location.assign("/checkout/success.html");
      } catch (err) {
        removeAllAlerts();
        const jsonResponse = await err.message;
        for (let message in jsonResponse) {
          alertMessage(jsonResponse[message]);
        }
  
        console.log(err);
      }
    }
  }