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
                        <a href="profile.html" class="dropdown-item">
                            <i class="fas fa-user"></i>
                            Profile Settings
                        </a>
                        <a href="account.html" class="dropdown-item">
                            <i class="fas fa-cog"></i>
                            Account Settings
                        </a>
                        <a href="#" id="logout-btn" class="dropdown-item">
                            <i class="fas fa-sign-out-alt"></i>
                            Logout
                        </a>
                    </div>
                </div>
            `;
            if (loginLi) navList.replaceChild(li, loginLi);
            
            // logout handler
            li.querySelector('#logout-btn').addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('bhaatGhorUser');
                localStorage.removeItem('bhaatGhorCart');
                sessionStorage.removeItem('bhaatGhorCheckoutData');
                window.location.href = 'login.html';
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
