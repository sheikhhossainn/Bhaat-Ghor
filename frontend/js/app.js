document.addEventListener('DOMContentLoaded', function() {
    // Book table button functionality (from homepage)
    const bookTableBtn = document.getElementById('book-table-btn');
    if (bookTableBtn) {
        bookTableBtn.addEventListener('click', function() {
            window.location.href = 'pages/booking.html';
        });
    }
      // Menu page functionality
    // Category filtering
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    
    // Initialize category counts
    updateCategoryCounts();
    
    if (categoryButtons.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get the category to filter by
                const selectedCategory = this.getAttribute('data-category');
                
                // Filter menu items
                filterMenuItems(selectedCategory);
            });
        });
    }
    
    // Function to update category counts
    function updateCategoryCounts() {
        const categoryCounts = {
            'all': menuItems.length,
            'rice-biriyani': 0,
            'curry': 0,
            'appetizers': 0,
            'desserts': 0,
            'drinks': 0
        };
        
        // Count items in each category
        menuItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (categoryCounts.hasOwnProperty(category)) {
                categoryCounts[category]++;
            }
        });
        
        // Update button text with counts
        categoryButtons.forEach(button => {
            const category = button.getAttribute('data-category');
            const count = categoryCounts[category] || 0;
            const originalText = button.textContent.split(' (')[0]; // Remove existing count
            if (count > 0) {
                button.textContent = `${originalText} (${count})`;
            }
        });
    }    // Function to filter menu items by category
    function filterMenuItems(category) {
        const menuContainer = document.querySelector('.menu-categories');
        const noItemsMessage = document.getElementById('no-items-message');
        
        // Add loading state
        menuContainer.classList.add('loading');
        
        // Add filtering class for smooth transitions
        menuItems.forEach(item => {
            item.classList.add('filtering');
        });
        
        setTimeout(() => {
            let visibleCount = 0;
            
            menuItems.forEach(item => {
                if (category === 'all') {
                    // Show all items
                    item.classList.remove('hide');
                    item.classList.add('show');
                    item.style.display = 'flex';
                    visibleCount++;
                } else {
                    // Check if item belongs to selected category
                    const itemCategory = item.getAttribute('data-category');
                    if (itemCategory === category) {
                        item.classList.remove('hide');
                        item.classList.add('show');
                        item.style.display = 'flex';
                        visibleCount++;
                    } else {
                        item.classList.remove('show');
                        item.classList.add('hide');
                        // Hide completely after animation
                        setTimeout(() => {
                            if (item.classList.contains('hide')) {
                                item.style.display = 'none';
                            }
                        }, 300);
                    }
                }
            });
            
            // Show/hide empty state message
            if (visibleCount === 0 && category !== 'all') {
                noItemsMessage.classList.add('show');
            } else {
                noItemsMessage.classList.remove('show');
            }
            
            // Remove filtering class and loading state after animation
            setTimeout(() => {
                menuItems.forEach(item => {
                    item.classList.remove('filtering');
                });
                menuContainer.classList.remove('loading');
            }, 300);
        }, 50);
    }
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    if (addToCartButtons.length > 0) {
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
    }
});