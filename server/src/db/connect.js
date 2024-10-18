// This function is responsible for the connection with the DB.
import { Pool } from "pg";

export const connectDB = async () => {
  const pool = new Pool({
    user: "your_db_user", // Replace with your database user
    host: "localhost", //  where your database is running
    database: "your_db_name", // Your database name
    password: "your_db_password", // Your database user's password
    port: 5432, // Default PostgreSQL port
  });
  try {
  } catch (error) {
    console.log("db connection FAILED ", error);
    process.exit(1);
  }
};
