import { sql } from "drizzle-orm/sql";
import { db } from "./db";
import app from "./app";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    // Test database connection
    await db.execute(sql`SELECT 1`);
    console.log("Database connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to database", err);
    process.exit(1);
  }
};

startServer();
