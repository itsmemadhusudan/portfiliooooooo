import fs from "fs";
import path from "path";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { migrate } from "drizzle-orm/better-sqlite3/migrator";

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

const dbPath = resolveDbPath();
fs.mkdirSync(path.dirname(dbPath), { recursive: true });
const sqlite = new Database(dbPath);
const db = drizzle(sqlite);
migrate(db, { migrationsFolder: path.join(process.cwd(), "drizzle") });
sqlite.close();
console.log("Migrations applied.");
