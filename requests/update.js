import jwt from "jsonwebtoken";

import createDatabaseConnection from "../config/database.js";

const { JWT_SECRET } = process.env;

export default async function update(req, res) {
  console.log(`Update --- Body: ${JSON.stringify(req.body)}`);

  try {
    // Check token
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader === "undefined")
      return res.status(403).send({ error: "Token not provided" });

    // Split token on space
    const bearer = bearerHeader.split(" ");
    // [0] => "Bearer", [1] => "<TOKEN>"
    const bearerToken = bearer[1];

    console.log(`Update --- Token: ${bearerToken}`);

    // Decoding the token
    let decoded;
    try {
      decoded = jwt.verify(bearerToken, JWT_SECRET);
    } catch (err) {
      return res.status(401).send({ error: "Invalid Token" });
    }

    // creating database connection
    const connection = await createDatabaseConnection();

    // Getting th use from the decoded token
    const [result] = await connection.execute("SELECT * FROM user WHERE id = ?", [
      decoded.userId,
    ]);

    // Check if the user has the correct token
    if (result[0].token !== bearerToken)
        return res.status(401).send({ error: "Invalid Token for user" });

    return res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    return res
      .status(403)
      .send({ error: "Something went wrong with the update" });
  }
}
