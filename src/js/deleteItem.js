
const remove = document.querySelector(".cart-remove__item");
if (remove) {
remove.addEventListener('click', deleteProduct);
} else {
    document.querySelector(".list-total").textContent = "Your cart is empty";
}

 function deleteProduct() {
    //get the parent element of the button that was clicked
    //const productCard = event.target.closest(".cart-card");
    //const productCard = document.querySelector(".cart-remove__item")
    
    //get the Id of the product
    const itemIdRemoved = remove.dataset.id;
    console.log(itemIdRemoved);
    
    //remove the product from the localstorage
    let cart = JSON.parse(localStorage.getItem("so-cart"));
    cart = cart.filter((item) => item.Id !== itemIdRemoved);
    //set the localstorage
    localStorage.setItem("so-cart", JSON.stringify(cart));


    window.location.reload();
}

