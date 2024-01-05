import {addedItems} from "./main.js"
const tbody = document.querySelector('#tbody')

const allProducts =await fetch('products.json')
            .then(response => response.json())
            .then(products => {return products})
console.log(allProducts);
const filtredProducts = []
addedItems.forEach((value,key)=>{
filtredProducts.push(allProducts.find((product)=>product.productId === Number(key)))

})
console.log(filtredProducts);


filtredProducts.forEach((product)=> {
const container = document.getElementById("tbody")

if(container){
    //select elemente eventlistener koy
    //bu event listener onChange baksın
    //onchange'de updateItem(itemId) yap bu şekilde localstorage içerisindeki datayı düzenle
    //sonrasında tekrar addedItems güncelle 
    const item = `<tr>
                    <td>
                        <figure class="itemside align-items-center">
                            <div class="aside"><img src="${product.productImg}" class="img-sm mr-2"></div>
                            <figcaption class="info"> <a href="#" class="title text-dark" data-abc="true">${product.productName}</a>
                            </figcaption>
                        </figure>
                    </td>
                    <td> <select class="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                        </select> </td>
                    <td>
                        <div class="price-wrap"> <var class="price">₺${product.productPrice}</var></div>
                    </td>
                    <td class="text-right d-none d-md-block"> <a data-original-title="Save to Wishlist" title="" href="" class="btn btn-light" data-toggle="tooltip" data-abc="true"> <i class="fa fa-heart"></i></a> <a id= delete-${product.productId} href="" class="btn btn-site" data-abc="true"> Kaldır</a> </td>
                </tr>`
    container.insertAdjacentHTML("beforeend",item)
    const deleteBtn = document.getElementById(`delete-${product.productId}`);
    deleteBtn.addEventListener("click",(event)=> {
        event.preventDefault();
        deleteItem(product.productId)
        console.log(event);
    })
    document.addEventListener('click', (event) => {
        let totalPrice = 0;
        console.log(event.target)
        const products = document.querySelectorAll('.price');
        products.forEach(product => {
            totalPrice += parseFloat(product.textContent.substring(1));
            
            document.getElementById('total').textContent = '₺' + totalPrice.toFixed(2);
        }); 
    
        });
}
})

function deleteItem(itemId) {
    // Retrieve the addedItems from the local storage
    const addedItems = JSON.parse(localStorage.getItem('addedItems')) || [];

    // Find the index of the item with the given itemId in the addedItems array
    const index = addedItems.findIndex(item => item[0] === itemId.toString());

    // If the item was found, remove it from the addedItems array
    if (index !== -1) {
        addedItems.splice(index, 1);
    }

    // Store the updated addedItems back to the local storage
    localStorage.setItem('addedItems', JSON.stringify(addedItems));

    // Update the UI
    const itemElement = document.getElementById(`delete-${itemId}`).parentNode.parentNode;
    itemElement.parentNode.removeChild(itemElement);
}
                                   
// Calculate total price
let totalPrice = 0;
filtredProducts.forEach(product => {
    totalPrice += product.productPrice;
});

// Update total price in HTML
document.getElementById('total').textContent = '₺' + totalPrice.toFixed(2);


    
    



