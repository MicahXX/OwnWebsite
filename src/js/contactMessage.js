const form = document.getElementById('contact-form');
const popup = document.getElementById('success-popup');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
        const response = await fetch('https://formspree.io/f/mdaanyjz', {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: formData
        });

        if (response.ok) {
            form.reset();
            popup.classList.add('show');

            setTimeout(() => {
                popup.classList.remove('show');
            }, 3000);

        } else {
            alert('Oops! Something went wrong.');
        }
    } catch (error) {
        alert('Oops! Something went wrong.');
    }
});