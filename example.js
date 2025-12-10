function displayCoffee() {
    const container = document.getElementById('card-container');
    const roastSelect = document.getElementById('roastSelect');
    const searchInput = document.getElementById('searchInput');

    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Retrieve cart from localStorage

    async function fetchAndDisplayCoffees(roastLevel = 'all', searchQuery = '') {
        container.innerHTML = ''; // Clear previous coffees
        try {
            const response = await fetch('./data/coffeedata.json');
            const coffees = await response.json();

            // Filter coffees
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
                            <button class="btn btn-primary add-to-cart-btn" data-name="${coffee.name}" 
                                data-price="${coffee.price}" data-image="${coffee.image_url}">
                                Add to Cart
                            </button>
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

    function addToCart(coffee) {
        cart.push(coffee); // Add to cart array
        localStorage.setItem('cart', JSON.stringify(cart)); // Save cart to localStorage
        alert(`${coffee.name} added to cart!`);
    }

    // Reload coffees when roast level changes
    roastSelect.addEventListener('change', () => {
        const selectedRoast = roastSelect.value;
        fetchAndDisplayCoffees(selectedRoast, searchInput.value);
    });

    // Debounced search
    let debounceTimer;
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            fetchAndDisplayCoffees(roastSelect.value, searchInput.value.trim());
        }, 300);
    });

    // Initial load
    fetchAndDisplayCoffees();
}

document.addEventListener('DOMContentLoaded', displayCoffee);
