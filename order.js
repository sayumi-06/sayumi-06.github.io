document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartItems = document.getElementById('cartItems');
    const totalPriceElement = document.getElementById('totalPrice');
    const addToFavouritesButton = document.getElementById('addToFavourites');
    const applyFavouritesButton = document.getElementById('applyFavourites');
    const clearCartButton = document.getElementById('clearCartButton');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.dataset.product;
            const price = parseFloat(button.dataset.price);
            const quantityInput = button.previousElementSibling;
            const quantity = parseFloat(quantityInput.value) || 0;

            if (quantity > 0) {
                addToCart(product, price, quantity);
                quantityInput.value = '';
            } else {
                alert('Please enter a valid quantity');
            }
        });
    });

    function addToCart(product, price, quantity) {
        const existingItem = cart.find(item => item.product === product);
        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.totalPrice += price * quantity;
        } else {
            cart.push({ product, price, quantity, totalPrice: price * quantity });
        }
        updateCart();
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${item.product}</td>
                <td>${item.quantity}</td>
                <td>Rs ${item.totalPrice.toFixed(2)}</td>
            `;
            cartItems.appendChild(tr);
            total += item.totalPrice;
        });
        totalPriceElement.textContent = `Rs ${total.toFixed(2)}`;
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    document.getElementById('buyNow').addEventListener('click', () => {
        if (cart.length > 0) {
            localStorage.setItem('order', JSON.stringify(cart));
            window.location.href = 'checkout.html';
        } else {
            alert('Your cart is empty');
        }
    });

    addToFavouritesButton.addEventListener('click', () => {
        localStorage.setItem('favouriteOrder', JSON.stringify(cart));
        alert('Order saved as favourite');
    });

    applyFavouritesButton.addEventListener('click', () => {
        const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder')) || [];
        cart = favouriteOrder;
        updateCart();
        fillOrderForm(favouriteOrder);
    });

    function fillOrderForm(favouriteOrder) {
        const firstItem = favouriteOrder[0]; // Example to fill form based on the first item in favourite

        if (firstItem) {
            document.getElementById('name').value = "John Doe"; // Example name, you can change it as needed
            document.getElementById('email').value = "johndoe@example.com"; // Example email
            document.getElementById('phone').value = "1234567890"; // Example phone number
            document.getElementById('address').value = "123 Example Street"; // Example address
            document.getElementById('city').value = "Colombo"; // Example city
            document.getElementById('zip').value = "10000"; // Example zip code
        }
    }

    // Updated code for clearing the cart
    clearCartButton.addEventListener('click', () => {
        cart = []; // Clear the cart array
        updateCart(); // Update the UI
        localStorage.removeItem('cart'); // Remove the cart from localStorage
        alert('Cart has been cleared.');
    });

    updateCart();
});
