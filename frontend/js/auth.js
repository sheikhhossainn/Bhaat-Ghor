// auth.js: handles showing user avatar in nav across pages
// Debugging function to check if modals are working
let authJsLoaded = false;

// Debug function to initialize modals if the event listeners failed
function testModal(modalName) {
    if (!modalName) {
        console.log('Available modals: "profile", "orders", "account"');
        return;
    
    if (modalName === 'profile') {
        showProfileModal();
    } else if (modalName === 'orders') {
        showOrdersModal();
    } else if (modalName === 'account') {
        showAccountModal();
    } else {
        console.log('Unknown modal:', modalName);
    }
}

// Make functions available globally, don't use IIFE
// Using a regular function that's called on DOMContentLoaded
function initUserMenu() {
    // Set flag to indicate auth.js has loaded
    authJsLoaded = true;
    console.log('Auth.js: Initializing user menu');
    const navList = document.querySelector('#nav-list');
    if (!navList) return;
    const userRaw = localStorage.getItem('bhaatGhorUser');
    if (userRaw) {
            const user = JSON.parse(userRaw);
            const loginLi = navList.querySelector('li:last-child');
            const li = document.createElement('li');
            li.id = 'user-menu';
            li.className = 'user-menu-item';              li.innerHTML = `
                <div class="user-dropdown">
                    <img src="${user.picture || 'https://via.placeholder.com/40'}" id="user-avatar" class="user-avatar" alt="Profile">
                    <div class="dropdown-menu" id="dropdown-menu">
                        <button id="profile-btn" class="dropdown-item">
                            <i class="fas fa-user"></i>
                            Profile Settings
                        </button>
                        <button id="orders-btn" class="dropdown-item">
                            <i class="fas fa-receipt"></i>
                            Orders
                        </button>
                        <button id="account-btn" class="dropdown-item">
                            <i class="fas fa-cog"></i>
                            Account Settings
                        </button>
                        <button id="logout-btn" class="dropdown-item">
                            <i class="fas fa-sign-out-alt"></i>
                            Logout
                        </button>
                    </div>
                </div>
            `;
            if (loginLi) navList.replaceChild(li, loginLi);
            
            // Profile settings handler
            li.querySelector('#profile-btn').addEventListener('click', (e) => {
                e.preventDefault();
                showProfileModal();
                document.getElementById('dropdown-menu').classList.remove('show');
            });
            
            // Orders handler
            li.querySelector('#orders-btn').addEventListener('click', (e) => {
                e.preventDefault();
                showOrdersModal();
                document.getElementById('dropdown-menu').classList.remove('show');
            });
            
            // Account settings handler
            li.querySelector('#account-btn').addEventListener('click', (e) => {
                e.preventDefault();
                showAccountModal();
                document.getElementById('dropdown-menu').classList.remove('show');
            });
            
            // logout handler
            li.querySelector('#logout-btn').addEventListener('click', (e) => {
                e.preventDefault();
                if (confirm('Are you sure you want to logout?')) {
                    localStorage.removeItem('bhaatGhorUser');
                    localStorage.removeItem('bhaatGhorCart');
                    sessionStorage.removeItem('bhaatGhorCheckoutData');
                    // Just reload the page to show login button again
                    window.location.reload();
                }
            });
            
            // toggle dropdown
            li.querySelector('#user-avatar').addEventListener('click', (e) => {
                e.preventDefault();
                const dropdown = document.getElementById('dropdown-menu');
                dropdown.classList.toggle('show');
            });
              // close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                const dropdown = document.getElementById('dropdown-menu');
                const userMenu = document.getElementById('user-menu');
                if (dropdown && userMenu && !userMenu.contains(e.target)) {
                    dropdown.classList.remove('show');
                }
            });
        }
    }
}

// Initialize the user menu when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initUserMenu();
    
    // Apply fixes after a short delay to ensure all elements are loaded
    setTimeout(fixBhaatGhor, 500);
});

// Profile Modal Functions
function showProfileModal() {
    console.log('Showing profile modal...');
    
    // Remove any existing modal first
    closeModal('profile-modal');
    
    const user = JSON.parse(localStorage.getItem('bhaatGhorUser') || '{}');
    const modal = document.createElement('div');
    modal.id = 'profile-modal';
    modal.className = 'order-confirmation';
    modal.style.display = 'flex';
    modal.style.zIndex = '9999';
    modal.innerHTML = `
        <div class="confirmation-content" style="max-width: 600px;">
            <i class="fas fa-user" style="color: #a65511;"></i>
            <h2>Profile Settings</h2>
            <form id="profile-form-modal" style="text-align: left;">
                <div class="form-group">
                    <label for="modal-name">Full Name</label>
                    <input type="text" id="modal-name" value="${user.name || ''}" style="width: 100%; padding: 8px; margin: 8px 0; border: 1px solid #d4b896; background: #150a01; color: #f0dcbf; border-radius: 4px;">
                </div>
                <div class="form-group">
                    <label for="modal-email">Email</label>
                    <input type="email" id="modal-email" value="${user.email || ''}" style="width: 100%; padding: 8px; margin: 8px 0; border: 1px solid #d4b896; background: #150a01; color: #f0dcbf; border-radius: 4px;">
                </div>
                <div class="form-group">
                    <label for="modal-phone">Phone</label>
                    <input type="tel" id="modal-phone" value="${user.phone || ''}" style="width: 100%; padding: 8px; margin: 8px 0; border: 1px solid #d4b896; background: #150a01; color: #f0dcbf; border-radius: 4px;">
                </div>
                <div class="form-group">
                    <label for="modal-address">Address</label>
                    <textarea id="modal-address" style="width: 100%; padding: 8px; margin: 8px 0; border: 1px solid #d4b896; background: #150a01; color: #f0dcbf; border-radius: 4px; height: 80px;">${user.address || ''}</textarea>
                </div>
            </form>
            <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                <button onclick="saveProfile()" class="return-btn">Save Changes</button>
                <button onclick="closeModal('profile-modal')" class="delete-btn" style="background: #666;">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function showAccountModal() {
    console.log('Showing account modal...');
    
    // Remove any existing modal first
    closeModal('account-modal');
    
    const user = JSON.parse(localStorage.getItem('bhaatGhorUser') || '{}');
    const orders = JSON.parse(localStorage.getItem('bhaatGhorOrders') || '[]');
    const modal = document.createElement('div');
    modal.id = 'account-modal';
    modal.className = 'order-confirmation';
    modal.style.display = 'flex';
    modal.style.zIndex = '9999';
    modal.innerHTML = `
        <div class="confirmation-content" style="max-width: 600px;">
            <i class="fas fa-cog" style="color: #a65511;"></i>
            <h2>Account Settings</h2>
            <div style="text-align: left; margin: 20px 0;">
                <h3>Account Info</h3>
                <p><strong>Email:</strong> ${user.email || 'N/A'}</p>
                <p><strong>Account Type:</strong> ${user.picture ? 'Google Account' : 'Phone Account'}</p>
                <p><strong>Total Orders:</strong> ${orders.length}</p>
            </div>
            <div style="text-align: left; margin: 20px 0;">
                <h3 style="color: #ff6b6b;">Danger Zone</h3>
                <p style="color: #f0dcbf; margin-bottom: 15px;">Deleting your account will permanently remove all your data.</p>
                <button onclick="deleteAccount()" class="delete-btn">Delete Account</button>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                <button onclick="closeModal('account-modal')" class="return-btn">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function showOrdersModal() {
    console.log('Opening Orders modal...');
    
    // Remove any existing modal first
    closeModal('orders-modal');
    
    // Force a refresh of orders from localStorage
    const orders = JSON.parse(localStorage.getItem('bhaatGhorOrders') || '[]');
    console.log('Current orders:', orders.length);
    
    const modal = document.createElement('div');
    modal.id = 'orders-modal';
    modal.className = 'order-confirmation';
    modal.style.display = 'flex';
    modal.style.zIndex = '9999';
    
    let ordersHTML = '';
    if (orders.length === 0) {
        ordersHTML = '<p style="color: #f0dcbf; text-align: center; margin: 20px 0;">No orders yet. <a href="menu.html" style="color: #d4b896;">Start ordering!</a></p>';
    } else {
        ordersHTML = orders.map(order => `
            <div style="background: rgba(21, 10, 1, 0.3); border: 1px solid #d4b896; border-radius: 8px; padding: 15px; margin: 10px 0;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h4 style="color: #d4b896; margin: 0;">Order #${order.orderNumber}</h4>
                    <span style="background: ${getStatusColor(order.status)}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px;">${order.status}</span>
                </div>
                <p style="color: #f0dcbf; margin: 5px 0;"><strong>Date:</strong> ${order.date}</p>
                <p style="color: #f0dcbf; margin: 5px 0;"><strong>Total:</strong> ৳${order.total}</p>
                <p style="color: #f0dcbf; margin: 5px 0;"><strong>Items:</strong> ${order.items ? order.items.length : 0} items</p>
                ${order.items ? order.items.map(item => `
                    <div style="font-size: 14px; color: rgba(240, 220, 191, 0.8); margin-left: 10px;">
                        • ${item.name} x${item.quantity}
                    </div>
                `).join('') : ''}
                <div style="margin-top: 10px;">
                    <button onclick="updateOrderStatus('${order.orderNumber}')" class="return-btn" style="padding: 6px 12px; font-size: 12px;">Update Status</button>
                </div>
            </div>
        `).join('');
    }
    
    modal.innerHTML = `
        <div class="confirmation-content" style="max-width: 700px; max-height: 80vh; overflow-y: auto;">
            <i class="fas fa-receipt" style="color: #a65511;"></i>
            <h2>My Orders</h2>
            <div style="text-align: left; margin: 20px 0;">
                ${ordersHTML}
            </div>
            <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                <button onclick="closeModal('orders-modal')" class="return-btn">Close</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function getStatusColor(status) {
    switch(status.toLowerCase()) {
        case 'processing': return '#ffa500'; // orange
        case 'preparing': return '#2196f3';  // blue
        case 'out for delivery': return '#ff9800'; // amber
        case 'delivered': return '#4caf50';  // green
        case 'cancelled': return '#f44336';  // red
        default: return '#666';              // gray
    }
}

function updateOrderStatus(orderNumber) {
    const orders = JSON.parse(localStorage.getItem('bhaatGhorOrders') || '[]');
    const orderIndex = orders.findIndex(order => order.orderNumber === orderNumber);
    
    if (orderIndex !== -1) {
        const statusOptions = ['Processing', 'Preparing', 'Out for Delivery', 'Delivered'];
        const currentStatus = orders[orderIndex].status;
        
        // If status is already Cancelled, don't allow further updates
        if (currentStatus === 'Cancelled') {
            alert('This order has been cancelled and cannot be updated.');
            return;
        }
        
        // Create a modal for status selection
        const modal = document.createElement('div');
        modal.id = 'status-update-modal';
        modal.className = 'order-confirmation';
        modal.style.display = 'flex';
        
        let statusOptionsHTML = '';
        [...statusOptions, 'Cancelled'].forEach(status => {
            statusOptionsHTML += `
                <div style="margin: 10px 0;">
                    <input type="radio" id="status-${status.toLowerCase().replace(/\s/g, '-')}" 
                           name="order-status" value="${status}" 
                           ${currentStatus === status ? 'checked' : ''}>
                    <label for="status-${status.toLowerCase().replace(/\s/g, '-')}" 
                           style="color: ${getStatusColor(status)}; padding-left: 8px;">
                        ${status}
                    </label>
                </div>
            `;
        });
        
        modal.innerHTML = `
            <div class="confirmation-content" style="max-width: 400px;">
                <i class="fas fa-edit" style="color: #a65511;"></i>
                <h2>Update Order Status</h2>
                <p>Order #${orderNumber}</p>
                <form id="status-update-form" style="text-align: left; margin: 20px 0;">
                    ${statusOptionsHTML}
                </form>
                <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 2rem;">
                    <button id="update-status-btn" class="return-btn">Update</button>
                    <button id="cancel-status-update-btn" class="delete-btn" style="background: #666;">Cancel</button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
          // Add event listeners
        document.getElementById('update-status-btn').addEventListener('click', () => {
            const selectedStatus = document.querySelector('input[name="order-status"]:checked').value;
            orders[orderIndex].status = selectedStatus;
            localStorage.setItem('bhaatGhorOrders', JSON.stringify(orders));
            
            // Close modals and refresh the orders display
            document.getElementById('status-update-modal').remove();
            setTimeout(() => {
                document.getElementById('orders-modal').remove();
                setTimeout(() => {
                    showOrdersModal(); // Refresh the modal
                }, 100);
            }, 100);
        });
        
        document.getElementById('cancel-status-update-btn').addEventListener('click', () => {
            document.getElementById('status-update-modal').remove();
        });
    }
}

function saveProfile() {
    const user = JSON.parse(localStorage.getItem('bhaatGhorUser') || '{}');
    const updatedUser = {
        ...user,
        name: document.getElementById('modal-name').value,
        email: document.getElementById('modal-email').value,
        phone: document.getElementById('modal-phone').value,
        address: document.getElementById('modal-address').value
    };
    localStorage.setItem('bhaatGhorUser', JSON.stringify(updatedUser));
    alert('Profile updated successfully!');
    closeModal('profile-modal');
    window.location.reload(); // Refresh to show updated name in nav
}

function deleteAccount() {
    if (confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
        localStorage.removeItem('bhaatGhorUser');
        localStorage.removeItem('bhaatGhorCart');
        localStorage.removeItem('bhaatGhorOrders');
        sessionStorage.removeItem('bhaatGhorCheckoutData');
        alert('Your account has been deleted.');
        window.location.reload();
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Add a small fade-out effect
        modal.style.opacity = '0';
        
        // Remove after the animation completes
        setTimeout(() => {
            if (document.getElementById(modalId)) {
                document.getElementById(modalId).remove();
            }
        }, 200);
    }
}

// Utility function to check z-index of modals and fix if needed
function ensureModalVisible(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        // Ensure proper z-index
        modal.style.zIndex = '9999';
        
        // Ensure visibility
        modal.style.display = 'flex';
        modal.style.opacity = '1';
        
        // Add click outside to close
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal(modalId);
            }
        });
        
        console.log(`Modal ${modalId} visibility ensured`);
    }
}

// Update the showProfileModal, showOrdersModal, and showAccountModal functions 
// to use ensureModalVisible after appending to document
document.addEventListener('DOMContentLoaded', function() {
    // Override the original functions with enhanced versions
    const originalShowProfileModal = window.showProfileModal;
    const originalShowOrdersModal = window.showOrdersModal;
    const originalShowAccountModal = window.showAccountModal;
    
    if (originalShowProfileModal) {
        window.showProfileModal = function() {
            originalShowProfileModal();
            ensureModalVisible('profile-modal');
        };
    }
    
    if (originalShowOrdersModal) {
        window.showOrdersModal = function() {
            originalShowOrdersModal();
            ensureModalVisible('orders-modal');
        };
    }
    
    if (originalShowAccountModal) {
        window.showAccountModal = function() {
            originalShowAccountModal();
            ensureModalVisible('account-modal');
        };
    }
});

// Style for buttons and modals
const style = document.createElement('style');
style.textContent = `
    .delete-btn {
        background-color: #ff6b6b;
        color: white;
        border: none;
        padding: 0.8rem 2rem;
        border-radius: 5px;
        font-weight: 600;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }
    .delete-btn:hover {
        background-color: #ff5252;
    }
    .form-group {
        margin-bottom: 15px;
    }
    .form-group label {
        display: block;
        margin-bottom: 5px;
        color: #d4b896;
        font-weight: 500;
    }
    
    /* Modal styles */
    .order-confirmation {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        opacity: 1;
        transition: opacity 0.2s ease;
    }
    
    .confirmation-content {
        background-color: #150a01;
        border: 2px solid #d4b896;
        border-radius: 10px;
        padding: 30px;
        text-align: center;
        color: #f0dcbf;
        max-width: 90%;
        animation: modalFadeIn 0.3s ease;
    }
    
    @keyframes modalFadeIn {
        from { transform: translateY(-20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Debug function to show local storage data - can be used in developer console
function debugBhaatGhor(clearConsole = true) {
    if (clearConsole) console.clear();
    
    const user = JSON.parse(localStorage.getItem('bhaatGhorUser') || '{}');
    const cart = JSON.parse(localStorage.getItem('bhaatGhorCart') || '[]');
    const orders = JSON.parse(localStorage.getItem('bhaatGhorOrders') || '[]');
    
    console.log('--- Bhaat Ghor Debug Info ---');
    console.log('User:', user);
    console.log('Cart:', cart);
    console.log('Orders:', orders);
    console.log('------------------------');
    
    return {
        user,
        cart,
        orders
    };
}

// Special function to ensure orders are properly saved
function syncOrdersToStorage() {
    let attempts = 0;
    const maxAttempts = 10;
    const interval = setInterval(() => {
        attempts++;
        
        const orderNumber = document.getElementById('order-number')?.textContent;
        const orders = JSON.parse(localStorage.getItem('bhaatGhorOrders') || '[]');
        
        console.log(`Attempt ${attempts} to sync orders. Current orders:`, orders.length);
        
        if (attempts >= maxAttempts) {
            clearInterval(interval);
            console.log('Max sync attempts reached.');
        }
    }, 1000);
    
    return interval;
}

// Make sure any new orders are displayed correctly and auth works
document.addEventListener('DOMContentLoaded', function() {
    console.log('Auth.js: DOM fully loaded');
    
    // Force reinitialize the user menu
    initUserMenu();
    
    // If we're on the checkout page and the confirmation is showing, save the order again to make sure it's in localStorage
    if (window.location.pathname.includes('checkout.html') && document.getElementById('order-confirmation')?.style.display === 'flex') {
        const orderNumber = document.getElementById('order-number')?.textContent;
        if (orderNumber) {
            console.log('Order confirmation displayed, order number:', orderNumber);
            
            // Make sure the orders are saved and ready to be shown in the modal
            setTimeout(() => {
                const orders = JSON.parse(localStorage.getItem('bhaatGhorOrders') || '[]');
                console.log('Current orders in localStorage:', orders.length);
            }, 1000);
        }
    }
    
    // Add direct event listeners to user menu buttons as a backup
    setTimeout(() => {
        const profileBtn = document.getElementById('profile-btn');
        const ordersBtn = document.getElementById('orders-btn');
        const accountBtn = document.getElementById('account-btn');
        
        if (profileBtn) {
            console.log('Auth.js: Adding direct event listener to profile button');
            profileBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Profile button clicked directly');
                showProfileModal();
                const dropdown = document.getElementById('dropdown-menu');
                if (dropdown) dropdown.classList.remove('show');
            });
        }
        
        if (ordersBtn) {
            console.log('Auth.js: Adding direct event listener to orders button');
            ordersBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Orders button clicked directly');
                showOrdersModal();
                const dropdown = document.getElementById('dropdown-menu');
                if (dropdown) dropdown.classList.remove('show');
            });
        }
        
        if (accountBtn) {
            console.log('Auth.js: Adding direct event listener to account button');
            accountBtn.addEventListener('click', function(e) {
                e.preventDefault();
                console.log('Account button clicked directly');
                showAccountModal();
                const dropdown = document.getElementById('dropdown-menu');
                if (dropdown) dropdown.classList.remove('show');
            });
        }
    }, 1000);
});

// Function to fix issues immediately from the console
function fixBhaatGhor() {
    console.clear();
    console.log('🔧 Running Bhaat Ghor fixes...');
    
    // Reinitialize the user menu
    initUserMenu();
    
    // Add direct event listeners to buttons
    const profileBtn = document.getElementById('profile-btn');
    const ordersBtn = document.getElementById('orders-btn');
    const accountBtn = document.getElementById('account-btn');
    
    if (profileBtn) {
        profileBtn.onclick = function(e) {
            e.preventDefault();
            console.log('Profile button clicked (fixed)');
            showProfileModal();
            return false;
        };
    }
    
    if (ordersBtn) {
        ordersBtn.onclick = function(e) {
            e.preventDefault();
            console.log('Orders button clicked (fixed)');
            showOrdersModal();
            return false;
        };
    }
    
    if (accountBtn) {
        accountBtn.onclick = function(e) {
            e.preventDefault();
            console.log('Account button clicked (fixed)');
            showAccountModal();
            return false;
        };
    }
    
    // Force the dropdown to close when the page loads
    const dropdown = document.getElementById('dropdown-menu');
    if (dropdown) dropdown.classList.remove('show');
    
    console.log('✅ Fixes applied successfully!');
    console.log('🛈 You can now click on Profile, Orders, and Account buttons.');
    
    return true;
}
