
const addCartBtn = document.querySelector('.add-to-cart');  

eventListeners();

function eventListeners(){
    document.addEventListener('DOMContentLoaded', () => {
        fetch('products.json')
            .then(response => response.json())
            .then(products => {
                const productsContainer = document.querySelector('.products');
    
                products.forEach(product => {
                    const productCard = document.createElement('div');
                    productCard.className = 'product-card';
                    productCard.id = product.productId;
    
                    productCard.innerHTML = `
                        <div class="product-image">
                            <img src="${product.productImg}" alt="${product.productName}" />
                        </div>
                        <div class="product-info">
                            <h2 class="product-name">${product.productName}</h2>
                            <div class="product-price-cart">
                                <p class="product-price">Fiyat: ₺${product.productPrice}</p>
                                <button class="add-to-cart">Sepete ekle</button>
                            </div>
                        </div>
                    `;
    
                    productsContainer.appendChild(productCard);
                });
            })
            .catch(error => console.error('Error:', error));
    });
    addCartBtn.addEventListener('click', (event) => {
        const productCard = event.target.parentElement.parentElement.parentElement;
        const product = {
            id: productCard.id,
            name: productCard.querySelector('.product-name').textContent,
            price: productCard.querySelector('.product-price').textContent,
            img: productCard.querySelector('.product-image img').src,
        }
      
        fetch('/add-to-cart', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        })
        .then(response => response.text())
        .then(data => console.log(data))
        .catch((error) => {
          console.error('Error:', error);
        });
      });
}


