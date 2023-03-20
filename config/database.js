import mysql from "mysql2/promise"

const { MYSQL_URI } = process.env;

export default async function createDatabaseConnection() {
  return await mysql.createConnection({
    uri: MYSQL_URI,
  });
}
