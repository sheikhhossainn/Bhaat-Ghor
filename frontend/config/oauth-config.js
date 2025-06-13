/**
 * Google OAuth Configuration
 * 
 * This file contains the configuration for Google OAuth.
 * For security, do not expose sensitive information like client secrets in frontend code.
 * In a production environment, your backend should handle secrets and token validation.
 */

// Google OAuth Client ID
const GOOGLE_CLIENT_ID = "361972462193-tb3sasu5610tvo1hpet07k5d2laub5m2.apps.googleusercontent.com";

// Determine if we're in the production environment (Vercel deployment)
const isProduction = window.location.hostname === 'bhaat-ghor.vercel.app';

// URLs for privacy policy and terms of service
const PRIVACY_POLICY_URL = isProduction 
    ? 'https://bhaat-ghor.vercel.app/pages/privacy-policy.html'
    : '/pages/privacy-policy.html';
    
const TERMS_OF_SERVICE_URL = isProduction
    ? 'https://bhaat-ghor.vercel.app/pages/terms-of-service.html'
    : '/pages/terms-of-service.html';

// Configuration object for Google Sign-In
const googleAuthConfig = {
    clientId: GOOGLE_CLIENT_ID,
    uxMode: "popup",  // Use a popup for the auth flow
    scope: "email profile", // Request access to email and basic profile info
};

// Initialize Google Sign-In configuration when the page loads
window.onload = function() {
    // Configure Google Sign-In
    const googleSignInElements = document.querySelectorAll('#g_id_onload');
    googleSignInElements.forEach(element => {
        element.setAttribute('data-client_id', GOOGLE_CLIENT_ID);
        
        // Set privacy policy and terms of service URLs
        if (element.hasAttribute('data-auto_select')) {
            element.setAttribute('data-context', 'signin');
            element.setAttribute('data-ux_mode', 'popup');
            element.setAttribute('data-itp_support', 'true');
            element.setAttribute('data-privacy_policy_url', PRIVACY_POLICY_URL);
            element.setAttribute('data-terms_of_service_url', TERMS_OF_SERVICE_URL);
        }
    });
};

// Export the configuration for use in other files
