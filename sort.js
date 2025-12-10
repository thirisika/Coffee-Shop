function displayCoffee() {
    const container = document.getElementById('card-container');
    const roastSelect = document.getElementById('roastSelect');
    const searchInput = document.getElementById('searchInput');
    const cartContainer = document.getElementById('cart-container'); // Add a container for cart items

    const cart = []; // Array to store cart items

    // Function to fetch and display coffees
    async function fetchAndDisplayCoffees(roastLevel = 'all', searchQuery = '') {
        container.innerHTML = ''; // Clear previous coffees
        try {
            const response = await fetch('./data/coffeedata.json');
            const cof = await response.json();

            // Sort cart items by name
        const coffees = [...cof].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

            // Filter coffees based on roast level and search query
            const filteredCoffees = coffees.filter(coffee => {
                const matchesRoast = roastLevel === 'all' || coffee.roast_level == roastLevel;
                const matchesSearch = coffee.name.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesRoast && matchesSearch;
            });

             

            // Display filtered coffees
            filteredCoffees.forEach(coffee => {
                const card = document.createElement('div');
                card.className = 'col';

                card.innerHTML = `
                     <div class="card" style="background-color:#101010;border:1px solid #E2F2B0">
                        <img src="${coffee.image_url}" class="card-img-top" alt="${coffee.name}">
                        <div class="card-body text-center">
                            <h4 class="card-title" style="color:#FFFFFF">${coffee.name}</h4>
                            <p class="card-text" style="color:#FFFFFF">$${coffee.price}</p>
                            <p class="card-text" style="color:#FFFFFF">${coffee.roast_level}</p>
                            
                            <button class="btn btn-primary add-to-cart-btn"data-name="${coffee.name}" 
                                data-price="${coffee.price}" data-image="${coffee.image_url}">Add to Cart</button>
                        </div>
                    </div>
                `;

                container.appendChild(card);
            });

            attachAddToCartEvents();
        } catch (error) {
            console.error('Error fetching data:', error);
            container.innerHTML = '<p class="text-danger">Failed to load posts. Please try again later.</p>';
        }
    }

    // Function to attach event listeners to Add to Cart buttons
    function attachAddToCartEvents() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const coffee = {
                    name: button.getAttribute('data-name'),
                    price: parseFloat(button.getAttribute('data-price')),
                    image: button.getAttribute('data-image')
                };
                addToCart(coffee);
            });
        });
    }

    // Function to add items to the cart
    function addToCart(coffee) {
        cart.push(coffee); // Add coffee to cart array
        updateCart(); // Update the cart display
        
    }

    // Function to update and sort the cart
    function updateCart() {
        cartContainer.innerHTML = ''; // Clear the cart display

        // Sort cart items by name
        const sortedCart = [...cart].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

        // Display sorted cart items
        sortedCart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; margin-right: 10px;">
                    <strong>${item.name}</strong> - $${item.price.toFixed(2)}
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });
    }

    // Debounced function to handle search input
    let debounceTimer;
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const searchQuery = searchInput.value.trim();
            fetchAndDisplayCoffees(roastSelect.value, searchQuery);
        }, 300); // Delay for 300ms to avoid excessive API calls
    });

    // Reload coffees when roast level changes
    roastSelect.addEventListener('change', () => {
        const selectedRoast = roastSelect.value;
        fetchAndDisplayCoffees(selectedRoast, searchInput.value);
    });

    // Initial load of all coffees
    fetchAndDisplayCoffees();
}

document.addEventListener('DOMContentLoaded', displayCoffee);


(function() {
    let nowMoment = moment();
    let eDisplayMoment = document.getElementById('date');
eDisplayMoment.innerHTML = nowMoment.format("D MMMM YYYY");
})();



