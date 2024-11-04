import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import dotenv from "dotenv";
import * as schema from "./schema";

dotenv.config({
    path: ".env.local",
});

const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
export const db = drizzle({ client: sql }, { schema });
