//Feature to remove an item from the cart-- Natalia

import { doc } from "prettier";

//store all the X's existing in the cart 
const remove = document.querySelectorAll(".remove-btn");
//if there is an X present in the card, iterate as follows
if (remove.length > 0) {
    remove.forEach((button) => {
    //add event listener to the item selected
        button.addEventListener('click', (e) => {
        //get the Id of the item selected from the DOM
        const item = e.target.dataset.id;
        //delete the item, pass it as argument to the deleteProduct function
        deleteProduct(item);
    });
    })
} else {
    //if no X (length=0), display a message
    document.querySelector(".list-total").textContent = "Your cart is empty";
}

function deleteProduct(itemIdRemoved) { 
    //remove the product from the localstorage
    let cart = JSON.parse(localStorage.getItem("so-cart"));
    cart = cart.filter((item) => item.Id !== itemIdRemoved);
    //set the localstorage
    localStorage.setItem("so-cart", JSON.stringify(cart));

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