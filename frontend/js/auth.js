// auth.js: handles showing user avatar in nav across pages
(function() {
    document.addEventListener('DOMContentLoaded', () => {
        const navList = document.querySelector('#nav-list');
        if (!navList) return;
        const userRaw = sessionStorage.getItem('bhaatGhorUser');
        if (userRaw) {
            const user = JSON.parse(userRaw);
            const loginLi = navList.querySelector('li:last-child');
            const li = document.createElement('li');
            li.id = 'user-menu';
            li.innerHTML = `
                <div class="user-dropdown">
                    <img src="${user.picture || 'https://via.placeholder.com/40'}" id="user-avatar" class="user-avatar">
                    <div class="dropdown-menu" id="dropdown-menu">
                        <a href="profile.html">Profile</a>
                        <a href="account.html">Account Settings</a>
                        <a href="#" id="logout-btn">Logout</a>
                    </div>
                </div>
            `;
            if (loginLi) navList.replaceChild(li, loginLi);
            // logout handler
            li.querySelector('#logout-btn').addEventListener('click', () => {
                sessionStorage.removeItem('bhaatGhorUser');
                window.location.reload();
            });
            // toggle dropdown
            li.querySelector('#user-avatar').addEventListener('click', () => {
                document.getElementById('dropdown-menu').classList.toggle('show');
            });
        }
    });
})();
