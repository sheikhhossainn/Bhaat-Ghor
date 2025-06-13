// Menu page specific JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemTitle = menuItem.querySelector('.menu-item-title').textContent;
            const itemPrice = menuItem.querySelector('.menu-item-price').textContent;
            
            // Here you would add the actual cart functionality
            console.log(`Added to cart: ${itemTitle} - ${itemPrice}`);
            
            // Visual feedback
            this.innerHTML = 'Added to Cart <i class="fas fa-check"></i>';
            this.style.backgroundColor = '#27AE60';
            
            // Reset after 2 seconds
            setTimeout(() => {
                this.innerHTML = 'Add to Cart <i class="fas fa-shopping-cart"></i>';
                this.style.backgroundColor = '';
            }, 2000);
        });
    });
});
