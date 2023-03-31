//Feature to remove an item from the cart-- Natalia
import {addToLocalByArray, deleteProductLocalStorage} from '../js/utils.mjs';
console.log("deleteItem.js working")
//store all the X's existing in the cart 
const remove = document.querySelectorAll(".remove-btn");
//if there is an X present in the card, iterate as follows
console.log("remove.length", remove.length)
if (remove.length > 0) {
    remove.forEach((button) => {
    //add event listener to the item selected
        button.addEventListener('click', (e) => {
        //get the Id of the item selected from the DOM
        console.log("I was clicked x button")
        const item = e.target.dataset.id;
        const key = e.target.dataset.key;
        //delete the item, pass it as argument to the deleteProduct function
        deleteProduct(item, key);
    });
    })
} else {
    //if no X (length=0), display a message
    document.querySelector(".list-total").textContent = "Wishlist is empty";
}

const move = document.querySelectorAll(".moveToCart");
if (move.length > 0) {
    move.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            console.log("I was clicked move button")
            const itemID = e.target.dataset.id;
            const key = e.target.dataset.key;
            moveProduct(itemID, key)
            deleteProduct(itemID, key);
        })
    })
}

function moveProduct(itemID, key) {
    let wish = JSON.parse(localStorage.getItem(key));
    let wishItem = wish.filter((item) => item.Id == itemID);
    addToLocalByArray(wishItem[0], itemID, "so-cart")
}

//move the functionality to local storage that I may reuse
function deleteProduct(itemID, key) {
    deleteProductLocalStorage(itemID, key)
    //reload the page
    window.location.reload();
}

const increase = document.querySelectorAll('.increase_units');

if (increase.length > 0) {

    increase.forEach((button) => {
    //add event listener to the item selected
        button.addEventListener('click', (e) => {
            //console.log('hello');
            //get the Id of the item selected from the DOM
            const item = e.target.dataset.id;
            console.log(item);
        //delete the item, pass it as argument to the deleteProduct function
            increaseProduct(item);
    });
    })}


function increaseProduct(itemIdIncreased) { 
    
    //increase the product from the localstorage
    let cart = JSON.parse(localStorage.getItem("so-cart"));
   
    for (let i=0; i < cart.length; i++) {
        console.log(itemIdIncreased)
        if (cart[i].Id == itemIdIncreased) {
           console.log(cart[i].Id)
            cart[i].quantity++;
        }
    }
    // cart = cart.filter((item) => {
    //     console.log(cart)
    //     if (item.Id === itemIdIncreased)
    //     return item.quantity++;
    // });
    //set the localstorage
    localStorage.setItem("so-cart", JSON.stringify(cart));
   
    //reload the page
    window.location.reload();
}

const decrease = document.querySelectorAll('.decrease_units');
if (decrease.length > 0) {
    decrease.forEach((button) => {
    //add event listener to the item selected
        button.addEventListener('click', (e) => {
        //get the Id of the item selected from the DOM
        const item = e.target.dataset.id;
        //delete the item, pass it as argument to the deleteProduct function
        decreaseProduct(item);
    });
    })}

    function decreaseProduct(itemIdDecreased) { 
        //increase the product from the localstorage
        let cart = JSON.parse(localStorage.getItem("so-cart"));
        
        for (let i=0; i < cart.length; i++) {
            console.log(itemIdDecreased)
            if (cart[i].Id == itemIdDecreased && cart[i].quantity > 0) {
                cart[i].quantity--;
            }
        }
        
        
        // cart = cart.filter((item) => item.Id === itemIdDecreased);
        // cart.quantity--;
        //set the localstorage
        localStorage.setItem("so-cart", JSON.stringify(cart));
    
        //reload the page
        window.location.reload();
    }