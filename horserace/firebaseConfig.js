//Public Key
export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyB1cfRwtSCcFL1k6D3xHadpUQYfoS94l7c",
  authDomain: "horserace-2c628.firebaseapp.com",
  databaseURL: "https://horserace-2c628-default-rtdb.firebaseio.com",
  projectId: "horserace-2c628",
  storageBucket: "horserace-2c628.firebasestorage.app",
  messagingSenderId: "784429529094",
  appId: "1:784429529094:web:3aa8c1bd65db56b1b6ab87",
  measurementId: "G-P6LQYXE16J"
};

function looksLikePlaceholder(cfg) {
  if (!cfg || typeof cfg !== "object") return true;
  const s = Object.values(cfg).join(" ");
  return /PASTE_|YOUR_|REPLACE_ME|<.+>/.test(s);
}

let _db = null;

/**
 * initFirebase(appMod, dbMod)
 * - appMod: dynamic module with initializeApp
 * - dbMod: dynamic module with getDatabase
 * Returns an RTDB instance or null if config is missing/invalid.
 */
export function initFirebase(appMod, dbMod) {
  try {
    if (looksLikePlaceholder(FIREBASE_CONFIG)) {
      console.warn("initFirebase: Firebase config looks like a placeholder; running in demo mode.");
      return null;
    }

    if (_db) return _db; // memoized

    const { initializeApp, getApps, getApp } = appMod;
    const { getDatabase } = dbMod;

    // Reuse existing app if one is already initialized (prevents duplicate apps during HMR/live reload)
    const app = (typeof getApps === "function" && getApps().length)
      ? getApp()
      : initializeApp(FIREBASE_CONFIG);

    _db = getDatabase(app);
    return _db;
  } catch (err) {
    console.error("initFirebase: Failed to initialize Firebase:", err);
    return null;
  }
}
