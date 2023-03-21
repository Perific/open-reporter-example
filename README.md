# Open Reporter Example

## Enegic Integrations
### Local Development
#### Prerequisites
* Access to a MySql database
* Node installed
* npm or yarn installed

#### Start
* Fork or clone the repository
*  Run `npm install` or `yarn` to install packages
*  Create a new database in MySql
    * Import the `user.sql` file
    * Create a .env file (see [example env](.env.example)) with your credentials
* Start the server with `npm run dev` or `yarn dev`

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

The Update request body, this is what we send to you through the update endpoint.
| Property | Type | Description |
| -------- | -------- | ------- | 
| externalid | string | A reference to your internal user or installation |
| reporterid | number | The ID of the installation in our system |
| timestamp | date time | The timestamp of when we sent the object |
| protopcolversion | string | - |
| meterstatus | [MeterStatus Enum](#meterstatus) | The status of all the meters in the installation |
| calculationmode | [CalculationModes Enum](#calculationmodes) | The type of calculations done on the meter data in the enegic backend |
| calculated | [Calculated](#calculated) | Calculated values based on all meters |
| meters | [Meters](#meters)[] | A list of the meters used in the installation |

#### MeterStatus

| Property | Description |
| -------- |------- |
| online | All of the meters are online |
| offline | All of the meters are offline |
| partial | Some of the meters are offline and some are online |
| unknown | One or more of the meters have not sent data at any point |

#### CalculationModes

| Property | Description |
| -------- |------- |
| OpenLoop | We send the raw values, meaning there is no smart stepping up or down in |

#### Calculated

| Property | Type | Description |
| -------- |------- | --------- |
| direct | [Phases](#phases) | The direct measurements values from all the meters |
| relative | [Phases](#phases) | How much room is left before reaching the main fuse level |

#### Meters
| Property | Type | Description |
| -------- |------- | ------- |
| lasteupdate | date time | When this specific meter was last updated |
| monitorid | number | Enegics internal ID of the monitor/measuring device |
| type | string | If the device is measuring "consumption" or "production" of electricity | 
| fuse | number | the fuse level this measuring device is  attached to |
| online | boolean | If the meter is considered online or not. This is based on how long ago the  last packet enegics system received |

#### Phases
| Property | Type | Description |
| -------- | ------- | ------- |
| l1 | number | The measurement value of Phase 1 |
| l2 | number | The measurement value of Phase 2 |
| l3 | number | The measurement value of Phase 3 |