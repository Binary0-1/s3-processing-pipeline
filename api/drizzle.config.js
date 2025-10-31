import dotenv from "dotenv";
dotenv.config({ path: ".env" });

/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./src/models/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DB_URL,
  },
};
