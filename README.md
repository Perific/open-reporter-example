# Open Reporter Example

## Enegic Integrations
### Local Development
#### Prerequisites
* Access to a MySql database
* Node installed
* npm or yarn installed

#### Start
1. Fork or clone the repository
2. Run `npm install` or `yarn` to install packages
3. Create a new database in MySql
3.1. Import the `user.sql` file
3.2. Create a .env file (see [example env](.env.example)) with your credentials
4. Start the server with `npm run dev` or `yarn dev`

### Purpose

This projects purpose is to show in a very simple way what we expect from the two endpoints. How you ultimately choose to implement this is up to you. How you validate the login credentials or how you handle the tokens is up to you. Even the names of the two endpoints are up to you.

#### Requirements
* The "[Create Token](/requests/createToken.js)" endpoint.
    
    * Accepts a stringified body with username and password, all lowercase. This function needs to return a token (same token needed for the "Update" endpoint).
    Example: `{ "username": "<USERNAME>", "password": "<PASSWORD>" }`

    * This request needs to return a token in a json format:
    Example: `{ "token": "<TOKEN>" }`

* The "[Update](/requests/update.js)" endpoint.
    * Accepts a 'Authorization' header with a bearer token. If the token is expired or not accepted, we expect a 401 (Unauthorized) or 403 (Forbidden) response. In this case we will run "Create Token" again.
    Example: `"Authorization": "Bearer <TOKEN>"`
