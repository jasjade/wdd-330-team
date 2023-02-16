//store the all the X's existing in the cart 
const remove = document.querySelectorAll(".cart-remove__item");
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

