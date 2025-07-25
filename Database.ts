import { DatabaseSync } from 'node:sqlite';
import path from "node:path";
import fs from "node:fs";

const DATA_DIR = path.join(import.meta.dirname, "data");
const DB_PATH = path.join(DATA_DIR, "whatsapp.db");

let dbInstance: DatabaseSync | null = null;

function getDb(): DatabaseSync {
  if (!dbInstance) {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    dbInstance = new DatabaseSync(DB_PATH);
  }
  return dbInstance;
}

export function initializeDatabase(): DatabaseSync {
    const db = getDb();
    db.exec("PRAGMA journal_mode = WAL");
    return db;
}