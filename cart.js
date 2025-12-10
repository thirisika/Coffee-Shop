function displayCart() {
     // Select the cart container element and the total amount element.
    const cartContainer = document.getElementById('cart-container');
    const totalAmountEl = document.getElementById('total-amount');


    // Function to load the cart data from localStorage and render it.
    function loadCart() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];  // Get cart items or initialize an empty array.
        renderCart(cart);  // Render the cart.
    }

    // Function to render cart items and calculate the total amount.
    function renderCart(cart) {
        cartContainer.innerHTML = ''; // Clear the cart container.
        let total = 0; // Initialize total price.

        cart.forEach((item, index) => {
            total += item.price;  // Add item price to the total.


              // Create a div for each cart item.
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            // Set the HTML content for the cart item.
            cartItem.innerHTML = `
                <div>
                    <img src="${item.image_url}" alt="${item.name}">
                    
                </div>
                <div><strong>${item.name}</strong> </div>
                <div> $${item.price.toFixed(2)}</div>
                
                  <i class="fas fa-trash delete-icon" data-index="${index}" style="cursor: pointer; color: #E2F2B0;"></i>
            `;
            cartContainer.appendChild(cartItem); // Append the cart item to the container.
        });
// <button class="delete-btn" data-index="${index}">Delete</button>
        totalAmountEl.textContent = `Total: $${total.toFixed(2)}`;  // Update the total amount in the DOM.

         // Add event listeners to all delete icons for removing items.
        document.querySelectorAll('.delete-icon').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index'); // Get the index of the item to remove.
                removeFromCart(index); // Remove the item from the cart.
            });
        });
    }


     // Function to remove an item from the cart by index.
    function removeFromCart(index) {
        const cart = JSON.parse(localStorage.getItem('cart')) || []; // Get the cart items.
        cart.splice(index, 1); // Remove the item at the specified index.
        localStorage.setItem('cart', JSON.stringify(cart)); // Update localStorage with the modified cart.
        // loadCart();
        renderCart(cart); // Re-render the cart after removal.
    }

    loadCart();  // Load the cart when the page is ready.
}

document.addEventListener('DOMContentLoaded', displayCart);

// const cartForm = document.getElementById('cart-container');
//   const cartNowButton = document.getElementById('click');
//   const amount=document.getElementById('amount');

//   cartNowButton.addEventListener('submit', function (event) {
//     event.preventDefault();
//     // Redirect to index.html
//     window.location.href = 'payment.html';

//     cartForm.clear();
   
//   });

const cartNowButton = document.getElementById('click');

// cartNowButton.addEventListener('click', function () {
//     // Clear cart in localStorage
//     localStorage.removeItem('cart');
//     // Clear cart display
//     const cartContainer = document.getElementById('cart-container');
//     cartContainer.innerHTML = '';
//     // Redirect to payment.html
//     window.location.href = 'payment.html';
// });

