import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "@/db/schema";

function resolveDbPath(): string {
  const url = process.env.DATABASE_URL ?? "file:./data/portfolio.db";
  if (url.startsWith("file:")) {
    const raw = url.slice("file:".length);
    return path.isAbsolute(raw)
      ? raw
      : path.join(/* turbopackIgnore: true */ process.cwd(), raw.replace(/^\.\//, ""));
  }
  return path.join(/* turbopackIgnore: true */ process.cwd(), "data", "portfolio.db");
}

const globalForDb = globalThis as unknown as {
  sqlite: Database.Database | undefined;
  drizzle: ReturnType<typeof drizzle<typeof schema>> | undefined;
};

export function getSqlite(): Database.Database {
  if (!globalForDb.sqlite) {
    const dbPath = resolveDbPath();
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    globalForDb.sqlite = new Database(dbPath);
    globalForDb.sqlite.pragma("journal_mode = WAL");
  }
  return globalForDb.sqlite;
}

export function getDb() {
  if (!globalForDb.drizzle) {
    globalForDb.drizzle = drizzle(getSqlite(), { schema });
  }
  return globalForDb.drizzle;
}

export type Db = ReturnType<typeof getDb>;
