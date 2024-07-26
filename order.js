let cart = [];

function addToCart() {
    const sections = ['fruits', 'vegetables', 'dairy', 'meatSeafood', 'bakingCooking'];
    const prices = {
        apple: 3,
        carrot: 2,
        milk: 1.5,
        chicken: 5,
        flour: 0.5
    };

    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const inputs = section.getElementsByTagName('input');

        for (let input of inputs) {
            const amount = parseFloat(input.value);
            if (amount > 0) {
                const item = input.name;
                const price = prices[item] * amount;
                cart.push({ item, amount, price });
            }
        }
    });

    updateCartTable();
}

function updateCartTable() {
    const tbody = document.querySelector('#cartTable tbody');
    tbody.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.item}</td><td>${item.amount}</td><td>${item.price.toFixed(2)}</td>`;
        tbody.appendChild(row);
        total += item.price;
    });

    document.getElementById('totalPrice').textContent = total.toFixed(2);
}

function saveAsFavourite() {
    localStorage.setItem('favouriteOrder', JSON.stringify(cart));
}

function applyFavourites() {
    const favouriteOrder = JSON.parse(localStorage.getItem('favouriteOrder'));

    if (favouriteOrder) {
        cart = favouriteOrder;
        updateCartTable();
    } else {
        alert('No favourite order saved.');
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    window.location.href = 'checkout.html';
}
