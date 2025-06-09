import { openDB } from "idb";

const openDatabase = async (storeName: string) => {
    return openDB("medcrm-db", 1, {
        upgrade(db) {
            if (!db.objectStoreNames.contains(storeName)) {
                db.createObjectStore(storeName, { keyPath: "id" });
            }
        },
    });
};

export const createStorage = (storeName: string, storageKey: string) => {
    return {
        getItem: async () => {
            const db = await openDatabase(storeName);
            const result = await db.get(storeName, storageKey);
            return result?.value;
        },
        setItem: async (value: string) => {
            const db = await openDatabase(storeName);
            await db.put(storeName, { id: storageKey, value });
        },
        removeItem: async () => {
            const db = await openDatabase(storeName);
            await db.delete(storeName, storageKey);
        },
    };
};