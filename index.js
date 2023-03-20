// importing the dependencies
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import cons from "console-stamp";

// Enable environment
import "dotenv/config.js";

// importing functions
import tokens from "./cache.js"; // Redis or some other cache system
import createUser from "./requests/createUser.js";
import createToken from "./requests/createToken.js";
import update from "./requests/update.js";

// Prettier Console Logs
cons(console,  "[HH:MM:ss.l]");

// defining the Express app
const app = express();

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(
  cors({
    origin: "*",
  })
);

// Create user
app.post("/createuser", createUser);

// Create Token
app.post("/createtoken", createToken);

// Update
app.post("/update", update);

// starting the server
app.listen(3001, () => {
  console.log("listening on port 3001");
});