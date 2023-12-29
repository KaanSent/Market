const addCartBtn = document.querySelector('.add-to-cart');

const ui = new UI();


eventListeners();

function eventListeners(){
    addCartBtn.addEventListener('click',ui.displayMessage);
}