// TODO: PASTE YOUR GOOGLE APPS SCRIPT URL HERE
const GOOGLE_APPS_SCRIPT_URL = https://script.google.com/macros/s/AKfycbxSKQhb8ekbah_yOadjUMsALvtRWafwMCNuKP--ZITqvrKlq_D5VuF3JpQ49bfCqyS7/exec;

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    const messageDiv = document.getElementById('form-message');
    messageDiv.textContent = 'Sending...';
    messageDiv.className = '';
    messageDiv.classList.add('sending');

    fetch(GOOGLE_APPS_SCRIPT_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.result === 'success') {
            messageDiv.textContent = result.message;
            messageDiv.className = 'success';
            form.reset();
        } else {
            messageDiv.textContent = result.message;
            messageDiv.className = 'error';
        }
    })
    .catch(error => {
        messageDiv.textContent = 'An error occurred. Please try again.';
        messageDiv.className = 'error';
        console.error('Error:', error);
    });
});
