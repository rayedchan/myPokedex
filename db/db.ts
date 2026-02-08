import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import postgres from "postgres";
import * as schema from "./schema"; // Import your schema definitions

const client = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Global variable to store the database connection in development
const globalForDb = global as unknown as {
  conn: postgres.Sql | undefined;
};

const conn = globalForDb.conn ?? client;
if (process.env.NODE_ENV !== "production") globalForDb.conn = conn;

export const db = drizzle({ client, schema });
