import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  emailAndPassword: {
    enabled: true,
    async sendResetPassword(data, request) {
      // Send an email to the user with a link to reset their password
    },
  },

  /** if no database is provided, the user data will be stored in memory.
   * Make sure to provide a database to persist user data **/
});
