import { openDB } from 'idb'

const DB_NAME = 'vipera-notebooks'
const STORE_NAME = 'notebooks'
const VERSION = 1

async function getDB() {
  return openDB(DB_NAME, VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' })
      }
    },
  })
}

export async function saveNotebook(notebook) {
  const db = await getDB()
  return db.put(STORE_NAME, notebook)
}

export async function getNotebook(id) {
  const db = await getDB()
  return db.get(STORE_NAME, id)
}

export async function getAllNotebooks() {
  const db = await getDB()
  return db.getAll(STORE_NAME)
}

export async function deleteNotebook(id) {
  const db = await getDB()
  return db.delete(STORE_NAME, id)
}

export async function updateNotebook(notebook) {
  const db = await getDB()
  return db.put(STORE_NAME, notebook)
}
