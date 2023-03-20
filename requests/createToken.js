import { compare } from "bcrypt";
import jwt from "jsonwebtoken";

import createDatabaseConnection from "../config/database.js";

const { JWT_SECRET } = process.env;

export default async function createToken(req, res) {
  console.log(
    `CREATE TOKEN --- Username: ${req.body.username}, Password: ${req.body.password}`
  );

  try {
    // Get Database Connection
    const connection = await createDatabaseConnection();

    // Get User
    const [rows] = await connection.execute(
      "SELECT * FROM user WHERE username = ?",
      [req.body.username]
    );

    // First User
    const user = rows[0];

    // Check if First user exists
    if (!user) return res.status(404).send({ error: "User not found" });

    // Passwords should be hashed in database and compared to incoming password
    if (!(await compare(req.body.password, user.password)))
      return res.status(401).send({ error: "Unauthorized" });

    // Create token
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: 1000 * 60 * 60 * 24 * 30, // 30 days in ms
      }
    );

    // Saving token in database (potentially could save token in redis too or similar faster cache databases)
    await connection.execute("UPDATE user SET token = ? WHERE id = ?", [
      token,
      user.id,
    ]);

    console.log(`CREATE TOKEN --- Token: ${token}`);

    res.send({ token: token });
  } catch (err) {
    console.error(err);
    return res.status(403).send({ error: "Could not create token" });
  }
}
