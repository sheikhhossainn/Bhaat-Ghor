# How to Fix Google OAuth Authorization Error

The "Authorization Error" you're encountering is a common issue with Google OAuth. Follow these steps to resolve it completely:

## 1. Fix Your Google Cloud Console Settings

1. **Go to your Google Cloud Console**:
   - Visit [https://console.cloud.google.com/](https://console.cloud.google.com/)
   - Select the project you're using for Bhaat Ghor

2. **Navigate to OAuth consent screen**:
   - Go to APIs & Services > OAuth consent screen
   - Ensure you have properly set up the consent screen
   - Make sure all required fields are filled out
   - Verify that your app name "Bhaat Ghor" is properly set

3. **Add JavaScript Origins and Redirect URIs**:
   - Go to APIs & Services > Credentials
   - Find your OAuth 2.0 Client ID and click to edit it
   - Under "Authorized JavaScript origins", add:
     - `http://localhost`
     - `http://localhost:5500` (if using VS Code Live Server)
     - `http://127.0.0.1`
     - `http://127.0.0.1:5500`
   - Under "Authorized redirect URIs", add:
     - `http://localhost`
     - `http://localhost:5500`
     - `http://127.0.0.1`
     - `http://127.0.0.1:5500`

4. **Add Test Users** (if in testing mode):
   - If your app is in "Testing" mode, you must add your email address (`skhossain799@gmail.com`) as a test user
   - Go to OAuth consent screen > Test users
   - Add your email address as a test user

## 2. Use the Local Development Server

Since you need a proper origin for Google OAuth to work, use a local development server:

1. **Install a simple HTTP server** (if you don't already have one):
   ```
   npm install -g http-server
   ```

2. **Run the server from your project root**:
   ```
   cd d:\Coding\Bhaat Ghor\frontend
   http-server
   ```

3. **Access your site through** `http://localhost:8080`

## 3. Verify Your Implementation

Make sure the Google Sign-In button is implemented correctly:

1. **Check that you're using the proper client ID**
2. **Verify the callback function is correctly defined**
3. **Make sure you're not missing any required attributes**

## 4. Testing Mode Limitations

If your Google Cloud project is in "Testing" mode (which it likely is):

1. Only users you explicitly add as test users can use your OAuth flow
2. Your email address must be added as a test user in the Google Cloud Console
3. There's a limit to the number of test users you can add

## 5. Common Causes of "invalid_request" Error

The "invalid_request" error typically occurs when:

- The origin your app is running on is not authorized in Google Cloud Console
- There's a mismatch between the client ID in the code and in Google Cloud Console
- The OAuth consent screen is not properly configured
- You're trying to use OAuth from an HTTP URL (instead of HTTPS) without proper local origins set
- You're using a test account that's not added to the test users list

By following these steps, you should be able to resolve your Google OAuth Authorization Error.
