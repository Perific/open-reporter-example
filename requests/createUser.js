import bcrypt from "bcrypt";

import createDatabaseConnection from "../config/database.js";

export default async function createUser(req, res) {
  try {
    // Encrypt password
    const hash = await bcrypt.hash(req.body.password, 10);

    // Get Database Connection
    const connection = await createDatabaseConnection();

    // Create User
    await connection.execute(
      "INSERT INTO user(username, password) VALUES(?, ?)",
      [req.body.username, hash]
    );

    return res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(403).send({ error: "Could not create user" });
  }
}
