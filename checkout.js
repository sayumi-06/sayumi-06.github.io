document.addEventListener("DOMContentLoaded", function() {

    const form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent form submission

        // Collect form data
        const fullName = document.querySelector("#first-name").value.trim();
        const email = document.querySelector("input[type='email']").value.trim();
        const address = document.querySelector("input[type='text']").value.trim();
        const zipCode = document.querySelector("input[placeholder='123 456']").value.trim();
        const cardName = document.querySelector("input[placeholder='Name on Card']").value.trim();
        const cardNumber = document.querySelector("input[type='number']").value.trim();
        const expMonth = document.querySelectorAll("input[type='text']")[1].value.trim(); // Assume 2nd text input is expMonth

        // Validate form data
        if (!fullName || !email || !address || !zipCode || !cardName || !cardNumber || !expMonth) {
            alert("Please fill out all fields.");
            return;
        }

        // Display confirmation message with delivery date
        const deliveryDate = calculateDeliveryDate();
        const message = `Thank you for your purchase, ${fullName}! Your order will be delivered by ${deliveryDate}.`;
        alert(message);

        // Optionally, navigate to a confirmation page or reset the form
        // form.reset();
        // window.location.href = "confirmation.html";
    });

    function calculateDeliveryDate() {
        const deliveryDays = 3; // Example delivery time of 3 days
        const today = new Date();
        today.setDate(today.getDate() + deliveryDays);
        return today.toDateString();
    }
});

