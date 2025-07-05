import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: "postgresql",
    schema: "./utils/schema.jsx",
    dbCredentials: {
      url: "postgresql://neondb_owner:npg_dmOatswU86nB@ep-royal-credit-a58vqtlk-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
    },
  });