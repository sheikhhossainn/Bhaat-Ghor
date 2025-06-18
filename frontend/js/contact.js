// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.question');
        const answer = item.querySelector('.answer');
        
        // Initially show all answers for better UX, remove the display:none in CSS
        answer.style.display = 'block';
        
        question.addEventListener('click', function() {
            // Toggle answer visibility
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
            } else {
                answer.style.display = 'block';
            }
        });
    });
    
    // Simple form validation
    const reservationForm = document.querySelector('.reservation-form');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const date = document.getElementById('date').value.trim();
            const time = document.getElementById('time').value.trim();
            const guests = document.getElementById('guests').value.trim();
            
            if (!name || !email || !date || !time || !guests) {
                alert('Please fill in all fields');
                return;
            }
            
            // Form validation passed
            alert('Thank you for your reservation request! We will get back to you shortly.');
            reservationForm.reset();
        });
    }
});
