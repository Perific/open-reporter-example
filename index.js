// importing the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid");

// importing constants
const { tokens } = require("./cache"); // Redis or some other cache system
const { users } = require("./db"); // Database with users

// defining the Express app
const app = express();

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// Create Token
app.post("/createtoken", (req, res) => {
  const user = users.find((u) => u.username === req.body.username);

  if (!user) return res.status(404).send({ error: "User not found" });

  // Passwords should be hashed in database and compared to incoming password
  if (user.password !== req.body.password)
    return res.status(401).send({ error: "Unauthorized" });

  // Create token
  const token = uuidv4();

  //  Save token to cache, probably for a limited time
  tokens.push(token);

  res.send({ token: token });
});

// Update
app.post("/update", (req, res) => {
  // Check token
  // Should probably exist in some kind of middleware
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader === "undefined")
    return res.status(403).send({ error: "Token not provided" });

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];

  if (!tokens.includes(bearerToken))
    return res.status(403).send({ error: "Token does not exist" });

  return res.status(200).send({ success: true });
});

// starting the server
app.listen(3001, () => {
  console.log("listening on port 3001");
});
