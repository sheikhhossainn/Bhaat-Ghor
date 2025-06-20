// auth.js: handles showing user avatar in nav across pages
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const navList = document.querySelector('#nav-list');
        if (!navList) return;
        const userRaw = localStorage.getItem('bhaatGhorUser');
        if (userRaw) {
            const user = JSON.parse(userRaw);
            const loginLi = navList.querySelector('li:last-child');
            const li = document.createElement('li');
            li.id = 'user-menu';
            li.className = 'user-menu-item';            
            li.innerHTML = `
                <div class="user-dropdown">
                    <img src="${user.picture || 'https://via.placeholder.com/40'}" id="user-avatar" class="user-avatar" alt="Profile">
                    <div class="dropdown-menu" id="dropdown-menu">
                        <a href="#" id="profile-btn" class="dropdown-item">
                            <i class="fas fa-user"></i>
                            Profile Settings
                        </a>
                        <a href="#" id="account-btn" class="dropdown-item">
                            <i class="fas fa-cog"></i>
                            Account Settings
                        </a>
                        <a href="#" id="logout-btn" class="dropdown-item">
                            <i class="fas fa-sign-out-alt"></i>
                            Logout
                        </a>
                    </div>
                </div>            `;
            if (loginLi) navList.replaceChild(li, loginLi);
            
            // Profile settings handler
            li.querySelector('#profile-btn').addEventListener('click', (e) => {
                e.preventDefault();
                showProfileModal();
            });
            
            // Account settings handler
            li.querySelector('#account-btn').addEventListener('click', (e) => {
                e.preventDefault();
                showAccountModal();
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
    });
})();

// Profile Modal Functions
function showProfileModal() {
    const user = JSON.parse(localStorage.getItem('bhaatGhorUser') || '{}');
    const modal = document.createElement('div');
    modal.id = 'profile-modal';
    modal.className = 'order-confirmation';
    modal.style.display = 'flex';
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
    const user = JSON.parse(localStorage.getItem('bhaatGhorUser') || '{}');
    const orders = JSON.parse(localStorage.getItem('bhaatGhorOrders') || '[]');
    const modal = document.createElement('div');
    modal.id = 'account-modal';
    modal.className = 'order-confirmation';
    modal.style.display = 'flex';
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
        modal.remove();
    }
}

// Style for delete button
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
`;
document.head.appendChild(style);
