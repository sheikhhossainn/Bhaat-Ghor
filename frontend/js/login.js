/**
 * Global variable to store Google user information
 */
let googleUser = null;

/**
 * Toggle password visibility in the login form
 */
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.getElementById('toggleIcon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.remove('fa-eye');
        toggleIcon.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.remove('fa-eye-slash');
        toggleIcon.classList.add('fa-eye');
    }
}

/**
 * Handle Google Login via our custom button
 * This triggers the Google One Tap dialog
 */
function continueWithGoogle() {
    try {
        // Ensure the Google Sign-In button is available
        const googleButton = document.querySelector('.g_id_signin div[role=button]');
        if (googleButton) {
            googleButton.click();
        } else {
            console.error("Google sign-in button not found");
            alert("Google sign-in is not available right now. Please try again later or use another sign-in method.");
        }
    } catch (error) {
        console.error("Error triggering Google sign-in:", error);
    }
    document.querySelector('.g_id_signin div[role=button]').click();
}

/**
 * Handle the response from Google OAuth
 * This function will be called by Google's OAuth client
 * @param {Object} response - The Google Sign-In response object
 */
function handleGoogleCredentialResponse(response) {
    // Decode the JWT token to get the user information
    const payload = parseJwt(response.credential);
    googleUser = payload;
    
    // Show the modal with the user information
    showModal('google-signin-modal');
    
    // Update the modal with user info
    updateGoogleModalWithUserInfo(payload);
}

/**
 * Parse the JWT token from Google
 * @param {string} token - The JWT token from Google
 * @returns {Object} The decoded payload
 */
function parseJwt(token) {
    try {
        // Get the payload part of the JWT (second part)
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        
        return JSON.parse(jsonPayload);
    } catch (e) {
        console.error('Error parsing Google JWT token:', e);
        return {};
    }
}

/**
 * Update the Google modal with user information
 * @param {Object} user - The Google user information
 */
function updateGoogleModalWithUserInfo(user) {
    if (!user) return;
    
    // Update profile image
    const profileImg = document.getElementById('google-profile-img');
    if (profileImg && user.picture) {
        profileImg.src = user.picture;
    }
      // Update user name and email
    const userName = document.getElementById('google-user-name');
    const userEmail = document.getElementById('google-user-email');
    
    if (userName) {
        userName.textContent = "Hello, " + user.name;
    }
    
    if (userEmail) {
        userEmail.textContent = user.email;
    }
    
    // Show continue button
    const continueBtn = document.getElementById('google-auth-continue');
    if (continueBtn) {
        continueBtn.style.display = 'block';
    }
}

/**
 * Complete the Google login process after user confirms
 * This would typically send the token to your backend
 */
function completeGoogleLogin() {
    if (!googleUser) {
        alert('Authentication error. Please try again.');
        return;
    }
    
    // In a real implementation, you would send the token to your backend
    // for verification and user authentication
      // For demo purposes, we'll just show a success message
    alert("Successfully logged in with Google as " + googleUser.name + " (" + googleUser.email + ")");
    // Store user in localStorage for persistence across pages
    localStorage.setItem('bhaatGhorUser', JSON.stringify({
        name: googleUser.name,
        email: googleUser.email,
        picture: googleUser.picture
    }));    // Close the modal
    closeModal('google-signin-modal');

    setTimeout(() => {
        // Check if there's a redirect URL stored
        const redirectPath = sessionStorage.getItem('bhaatGhorRedirectAfterLogin');
        if (redirectPath) {
            sessionStorage.removeItem('bhaatGhorRedirectAfterLogin');
            window.location.href = redirectPath;
        } else {
            window.location.href = '../index.html';
        }
    }, 1000);
}

/**
 * Handle Phone Login
 * Shows the phone verification modal
 */
function continueWithPhone() {
    showModal('phone-signin-modal');
}

/**
 * Show a modal dialog
 * @param {string} modalId - The ID of the modal to show
 */
function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'block';
    }
}

/**
 * Hide a modal dialog
 * @param {string} modalId - The ID of the modal to hide
 */
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
    }
}

/**
 * Send verification code to phone number
 */
function sendVerificationCode() {
    const phoneInput = document.getElementById('phone-number-input');
    const phone = phoneInput ? phoneInput.value : '';
    
    if (!phone) {
        alert('Please enter a phone number');
        return;
    }
    
    // In a real implementation, you would send an API request to your backend    // which would trigger sending an SMS verification code to the user
    alert("Verification code sent to " + phone + ". Please enter it below.");
    
    // Show verification code input
    document.getElementById('verification-code-section').style.display = 'block';
}

/**
 * Verify the code entered by the user
 */
function verifyCode() {
    const codeInput = document.getElementById('verification-code');
    const code = codeInput ? codeInput.value : '';
    
    if (!code) {
        alert('Please enter the verification code');
        return;
    }
    
    // In a real implementation, you would verify this code with your backend
    // For demonstration purposes, we'll accept any code
    alert('Phone number verified successfully! You are now logged in.');    // Store user in localStorage with phone as identifier
    const phone = codeInput.value; // actually revert to phoneInput value above
    const phoneNumber = document.getElementById('phone-number-input').value;
    localStorage.setItem('bhaatGhorUser', JSON.stringify({
        name: phoneNumber,
        email: phoneNumber,
        phone: phoneNumber,
        picture: 'https://via.placeholder.com/40'
    }));
    closeModal('phone-signin-modal');
    
    // Check if there's a redirect URL stored
    const redirectPath = sessionStorage.getItem('bhaatGhorRedirectAfterLogin');
    if (redirectPath) {
        sessionStorage.removeItem('bhaatGhorRedirectAfterLogin');
        window.location.href = redirectPath;
    } else {
        window.location.href = '../index.html';
    }
}

// Add event listener when the document is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Set up the Google OAuth callback
    window.handleGoogleCredentialResponse = handleGoogleCredentialResponse;
    
    // Make sure the callback is globally accessible
    if (typeof window.handleGoogleCredentialResponse === 'undefined') {
        window.handleGoogleCredentialResponse = handleGoogleCredentialResponse;
    }
    
    try {
        // Debug client ID to make sure it's loaded
        console.log("Using Google Client ID:", GOOGLE_CLIENT_ID);
        
        // Update the client ID in the Google Sign-In button
        const googleSignInElement = document.getElementById('g_id_onload');
        if (googleSignInElement) {
            // Use the client ID from our config file
            googleSignInElement.setAttribute('data-client_id', GOOGLE_CLIENT_ID);
            
            // Make sure callback is set
            googleSignInElement.setAttribute('data-callback', 'handleGoogleCredentialResponse');
            
            console.log("Google Sign-In configured successfully");
        } else {
            console.error("Google Sign-In element not found");
        }
    } catch (error) {
        console.error("Error setting up Google Sign-In:", error);
    }
      // Handle form submission
    const loginForm = document.querySelector('.login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // In a real implementation, you would validate credentials with your backend
            alert('Successfully logged in!');
            
            // Get email/username from the form
            const email = document.getElementById('username').value;
            
            // Store user information
            localStorage.setItem('bhaatGhorUser', JSON.stringify({
                name: email.split('@')[0],
                email: email,
                picture: 'https://via.placeholder.com/40'
            }));
            
            // Check if there's a redirect URL stored
            const redirectPath = sessionStorage.getItem('bhaatGhorRedirectAfterLogin');
            if (redirectPath) {
                sessionStorage.removeItem('bhaatGhorRedirectAfterLogin');
                window.location.href = redirectPath;
            } else {
                window.location.href = '../index.html';
            }
        });
    }
      // Close modal when clicking outside of it
    window.addEventListener('click', function(event) {
        const googleModal = document.getElementById('google-signin-modal');
        const phoneModal = document.getElementById('phone-signin-modal');
        
        if (event.target === googleModal) {
            closeModal('google-signin-modal');
        }
        
        if (event.target === phoneModal) {
            closeModal('phone-signin-modal');
        }
    });
    
    // Check if user is already logged in and redirect if needed
    const userRaw = localStorage.getItem('bhaatGhorUser');
    if (userRaw) {
        console.log('User already logged in, redirecting...');
        const redirectPath = sessionStorage.getItem('bhaatGhorRedirectAfterLogin');
        if (redirectPath) {
            sessionStorage.removeItem('bhaatGhorRedirectAfterLogin');
            window.location.href = redirectPath;
        } else {
            window.location.href = '../index.html';
        }
    }
});