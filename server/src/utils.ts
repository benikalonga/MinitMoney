import fs from "fs";
import path from "path";
import { Database, User } from "./types";

// --- Tiny JSON store ---
const DB_FILE = path.join(__dirname, "..", "data", "db.json");
function ensureDb() {
  if (!fs.existsSync(DB_FILE)) {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    fs.writeFileSync(
      DB_FILE,
      JSON.stringify({ users: [], transactions: [] }, null, 2)
    );
  }
}
export const readDb = (): Database => {
  ensureDb();
  return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
};
export const writeDb = (db: Database) => {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
};

export const removePinFromUser = (user: User): Omit<User, "pinHash"> => {
  const { pinHash, ...rest } = user;
  return rest;
};
