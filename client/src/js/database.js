import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
   const jateDb = await openDB('jate', 1);
   const tx = jateDb.transaction('jate', 'readwrite');
   const store = tx.objectStore('jate');
   const request = store.put({ id: 1, value: content });
   const result = await request;
   console.log('Data saved to the database', result);
}

export const getDb = async () => {
  console.log('GET from the database');
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log(result);
  return result;
}

initdb();