# Open Reporter Example

## Enegic Integrations

### Local Development

1. Fork or clone the repository
2. Run `npm install` or `yarn` to install packages
3. Start the server with `npm run dev` or `yarn dev`

### Purpose

This projects purpose is to show in a very simple way what we expect from the two endpoints. How you ultimately choose to implement this is up to you. How you check that the login information is correct or how you handle the tokens is also up to you. Even the names of the two functions/endpoints are up to you.

What matters to us is:
* The "Create Token" endpoint accepts a stringified body with username and password, all lowercase. This function needs to return a token (same token needed for the "Update" endpoint).
* The "Update" endpoint accepts a 'Authorization' header with a bearer token. If the token is expired or not accepted, we expect a 401 (Unauthorized) or 403 (Forbidden) response. In this case we will run "Create Token" again. 
