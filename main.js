
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
}


