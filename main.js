
export const addedItems = new Map();
populateMapWithStorage();
    document.addEventListener('DOMContentLoaded', () => {
        fetch('products.json')
            .then(response => response.json())
            .then(products => {
                const productsContainer = document.querySelector('.products');

                if(productsContainer){products.forEach(product => {
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
                                <button id=add-to-cart-${product.productId} class="add-to-cart">Sepete ekle</button>
                            </div>
                        </div>
                    `;
                    productsContainer.appendChild(productCard);
                    const addBtn = document.getElementById(`add-to-cart-${product.productId}`)
                    addBtn.addEventListener("click",(event)=> {
                        addItemToCart(productCard.id)
                    })

                    
                })}
                
            })
            .catch(error => console.error('Error:', error));
    });



    function populateMapWithStorage() {
  const storage = JSON.parse(localStorage.getItem("addedItems"));
  storage
    ? storage.map((a) => {
        addedItems.set(a[0], a[1]);
      })
    : localStorage.setItem("addedItems", JSON.stringify([]));
}


  function addItemToCart(itemId) {
  if (addedItems.has(itemId)) {
    addedItems.set(itemId, addedItems.get(itemId) + 1);
  } else {
    addedItems.set(itemId, 1);
  }
  localStorage.setItem(
    "addedItems",
    JSON.stringify(addedItems, (key, value) =>
      value instanceof Map ? [...value] : value
    )
  );
}  

