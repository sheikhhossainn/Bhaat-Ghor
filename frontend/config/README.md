# Google OAuth Setup Instructions

This document explains how to set up Google OAuth authentication for the Bhaat Ghor application.

## Using Your OAuth JSON File

1. You've downloaded a JSON file from the Google Developer Console. This file contains your OAuth credentials.

2. **IMPORTANT SECURITY NOTE:** Never commit this JSON file to a public repository or expose it in client-side code.

3. Extract the Client ID from your JSON file:
   - Open the JSON file in a text editor
   - Look for the `client_id` field
   - Copy its value (it will look something like `123456789012-abcdefghijklmnopqrstuvwxyz123456.apps.googleusercontent.com`)

4. Configure the application:
   - Open `d:\Coding\Bhaat Ghor\frontend\config\oauth-config.js`
   - Replace `YOUR_CLIENT_ID_GOES_HERE` with the client ID you copied

## Security Best Practices

In a production environment:

1. Store sensitive credentials like `client_secret` on your backend server only
2. Use environment variables for sensitive values, not hardcoded values
3. Implement proper token validation on your backend
4. Set up proper authorized redirect URIs in your Google Developer Console

## Additional Configuration

You may need to configure the following in your Google Developer Console:

1. **Authorized JavaScript origins:**
   - Add `http://localhost` for local testing
   - Add your production domain when deployed

2. **Authorized redirect URIs:**
   - Add `http://localhost/auth/callback` for local testing
   - Add your production callback URL when deployed

## Troubleshooting

If you encounter authentication issues:

1. Verify your client ID is correctly copied to the config file
2. Check that your application's origins are authorized in Google Developer Console
3. Ensure your redirect URIs are properly configured
4. Check browser console for any errors during the authentication process
