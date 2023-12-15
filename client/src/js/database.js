import { openDB } from "idb";

const DB_NAME = "pwatext";
const OBJ_STORE_NAME = "text";

const initdb = async () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(OBJ_STORE_NAME)) {
        console.log(`"${DB_NAME}" database with "${OBJ_STORE_NAME}" object store already exists`);
        return;
      }
      db.createObjectStore(OBJ_STORE_NAME, { keyPath: "id", autoIncrement: true });
      console.log(`"${DB_NAME}" database with "${OBJ_STORE_NAME}" object store created`);
    },
  });

/**
 * Adds string to the first index of the indexed database.
 * @param {string} content
 */
export const putDb = async (content) =>
{
  const db = await openDB(DB_NAME, 1);
  const keyOfUpdatedIndex = await db.put(OBJ_STORE_NAME, content, 1);
  console.log(`Saved to database index ${keyOfUpdatedIndex}:\n"""\n${await db.get(OBJ_STORE_NAME, keyOfUpdatedIndex)}\n"""`);
};

/**
 * Gets the string content from the indexed database.
 * @returns {Promise<string>} String content from indexed database.
 */
export const getDb = async () =>
{
  const db = await openDB(DB_NAME, 1);
  const content = await db.get(OBJ_STORE_NAME, 1);
  console.log(content !== undefined ? `Retrieved from database:\n"""\n${content}\n"""` : "Data not found in the database");
  return content;
};

initdb();
