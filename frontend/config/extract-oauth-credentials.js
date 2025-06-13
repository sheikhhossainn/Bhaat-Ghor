/**
 * OAuth JSON Extractor Tool
 * 
 * This is a helper script to extract credentials from your Google OAuth JSON file.
 * Run this script with Node.js to automatically update your oauth-config.js file.
 * 
 * Usage:
 * 1. Save your OAuth JSON file as "oauth-credentials.json" in this directory
 * 2. Run: node extract-oauth-credentials.js
 * 3. The script will update oauth-config.js with your client ID
 */

const fs = require('fs');
const path = require('path');

// Paths for input and output files
const jsonFilePath = path.join(__dirname, 'oauth-credentials.json');
const configFilePath = path.join(__dirname, 'oauth-config.js');

try {
    // Check if the JSON file exists
    if (!fs.existsSync(jsonFilePath)) {
        console.error('Error: oauth-credentials.json not found!');
        console.log('Please copy your OAuth JSON file to:');
        console.log(jsonFilePath);
        process.exit(1);
    }
    
    // Read and parse the JSON file
    const jsonContent = fs.readFileSync(jsonFilePath, 'utf8');
    const credentials = JSON.parse(jsonContent);
    
    // Extract the client ID
    let clientId = '';
    
    if (credentials.web) {
        // For web application credentials
        clientId = credentials.web.client_id;
    } else if (credentials.installed) {
        // For desktop/native application credentials
        clientId = credentials.installed.client_id;
    } else {
        console.error('Error: Could not find client_id in the JSON file!');
        process.exit(1);
    }
    
    if (!clientId) {
        console.error('Error: client_id is empty in the JSON file!');
        process.exit(1);
    }
    
    // Read the current config file
    const configContent = fs.readFileSync(configFilePath, 'utf8');
    
    // Replace the placeholder with the actual client ID
    const updatedConfig = configContent.replace(
        /const GOOGLE_CLIENT_ID = ".*";/,
        `const GOOGLE_CLIENT_ID = "${clientId}";`
    );
    
    // Write the updated config back to the file
    fs.writeFileSync(configFilePath, updatedConfig);
    
    console.log('Success! Your OAuth client ID has been updated in oauth-config.js');
    console.log('Client ID: ' + clientId);
    
} catch (err) {
    console.error('An error occurred:', err.message);
}
