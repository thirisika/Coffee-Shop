function displayCoffee() {
    const container = document.getElementById('card-container');  // Select the container where coffee cards will be displayed.
    const roastSelect = document.getElementById('roastSelect');     // Select the dropdown for roast level filtering.
    const searchInput = document.getElementById('searchInput');    // Select the search input field for filtering by name.


    // Function to fetch coffee data from an API and display it with filters.
    async function fetchAndDisplayCoffees(roastLevel = 'all', searchQuery = '') {
        container.innerHTML = '';    // Clear the container to avoid duplicating cards.
        try {
            const response = await fetch('./data/coffeedata.json');   // Fetch data from the coffee API.
            const cof = await response.json(); // Parse the response as JSON.

             // Sort the coffees alphabetically by name (case-insensitive).
            const coffees = [...cof].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));


            // Filter coffees based on roast level and search query.
            const filteredCoffees = coffees.filter(coffee => {
                const matchesRoast = roastLevel === 'all' || coffee.roast_level == roastLevel;
                const matchesSearch = coffee.name.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesRoast && matchesSearch;          // Include only coffees matching both conditions.
            });

             // Generate and display coffee cards for each filtered coffee.

            filteredCoffees.forEach(coffee => {
                const card = document.createElement('div');
                card.className = 'col';

                 // Set the HTML content for the coffee card.

                card.innerHTML = `
                     <div class="card" style="background-color:#101010;border:1px solid #E2F2B0">
                        <img src="${coffee.image_url}" class="card-img-top" alt="${coffee.name}">
                        <div class="card-body text-center">
                            <h4 class="card-title" style="color:#FFFFFF">${coffee.name}</h4>
                            <p class="card-text" style="color:#FFFFFF">$${coffee.price}</p>
                            <p class="card-text" style="color:#FFFFFF">${coffee.roast_level}</p>
                            
                            <button class="btn btn-primary add-to-cart-btn"data-name="${coffee.name}" 
                                data-price="${coffee.price}" data-image="${coffee.image_url}" data-coffee='${JSON.stringify(coffee)}'>Add to Cart</button>
                                </div>
                    </div>
                `;
                container.appendChild(card);  // Append the card to the container.
            });

            // Add event listeners to all "Add to Cart" buttons for functionality.
            document.querySelectorAll('.add-to-cart-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const coffee = JSON.parse(button.getAttribute('data-coffee'));   // Parse the coffee data from the button's dataset.
                    addToCart(coffee);  // Add the coffee to the cart.
                    window.location.href = 'cart.html';   // Redirect to the cart page.
                });
            });
        } catch (error) {
            console.error('Error fetching data:', error);
            container.innerHTML = '<p>Failed to load coffees. Please try again later.</p>';
        }
    }


      // Function to add a coffee item to the cart and save it to localStorage.
    function addToCart(coffee) {
         // Retrieve the existing cart from localStorage or initialize an empty array.
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(coffee); // Add the new coffee to the cart.
        //updateCart();
        localStorage.setItem('cart', JSON.stringify(cart));  // Save the updated cart back to localStorage.
    }

    // searchInput.addEventListener('input', () => fetchAndDisplayCoffees(roastSelect.value, searchInput.value));
    // roastSelect.addEventListener('change', () => fetchAndDisplayCoffees(roastSelect.value, searchInput.value));


  
    

    // Debounced function to handle search input
      // Debounced input handler for search to limit API calls while typing.
    let debounceTimer;   // Timer to delay the search action.
    searchInput.addEventListener('input', () => {
        clearTimeout(debounceTimer);  // Clear the previous timer.
        debounceTimer = setTimeout(() => {
            const searchQuery = searchInput.value.trim();  // Get the trimmed search query.
            fetchAndDisplayCoffees(roastSelect.value, searchQuery); // Fetch coffees with the query.
        }, 800); // Delay for 800ms to avoid excessive API calls
    });

    // Reload coffees when the roast level filter changes.
    roastSelect.addEventListener('change', () => {
        const selectedRoast = roastSelect.value;  // Get the selected roast level.
        fetchAndDisplayCoffees(selectedRoast, searchInput.value); // Fetch coffees with the new roast level.
    });
    fetchAndDisplayCoffees();   // Initial call to load coffees on page load.
}

document.addEventListener('DOMContentLoaded', displayCoffee);  // Run the displayCoffee function after the DOM is fully loaded.


// Moment.js code to display the current date.
// moment
(function() {
    let nowMoment = moment();  // Get the current moment.
    let eDisplayMoment = document.getElementById('date'); // Select the element to display the date.
eDisplayMoment.innerHTML = nowMoment.format("D MMMM YYYY"); // Format and display the date.
})();


// -----contact--------


// Contact form validation and submission handling.
const contactForm = document.getElementById('contact-form'); // Select the contact form element.
  const contactNowButton = document.getElementById('contact-now'); // Select the submit button.

  contactForm.addEventListener('input', () => {
    // Get all inputs from the form and check their validity.
    const allInputs = Array.from(contactForm.querySelectorAll('input'));  // Ensure all inputs are valid.
    const allValid = allInputs.every(input => input.checkValidity());  // Ensure all inputs are valid.
    contactNowButton.disabled = !allValid;  // Enable/disable the button based on validity.
  });

  contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior.
    alert('Message send Successful!'); // Display a success message.

    contactForm.reset(); // Reset the form fields
   
  });
