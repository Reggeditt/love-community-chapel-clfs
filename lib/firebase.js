import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { initializeFirestore, collection, enableIndexedDbPersistence, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const db = initializeFirestore(app, {
  localCache:
    persistentLocalCache(/*settings*/{ tabManager: persistentMultipleTabManager() })
});

// Enable offline data persistence
// initializeFirestore(app, 
//   {localCache: 
//     persistentLocalCache(/*settings*/{tabManager: persistentMultipleTabManager()})
//   });

// enableIndexedDbPersistence(db).catch((err) => {
//   if (err.code === 'failed-precondition') {
//     console.error("Persistence failed: Multiple tabs open");
//   } else if (err.code === 'unimplemented') {
//     console.error("Persistence is not available in this browser");
//   }
// });

// Database references
const generalDatabase = collection(db, "general");
const membersCollection = collection(db, "members");
const visitorsCollection = collection(db, "visitors");
const childrenCollection = collection(db, "children");
const staffCollection = collection(db, "staff");
const youthCollection = collection(db, "youth");
const menCollection = collection(db, "men");
const womenCollection = collection(db, "women");
const eventsCollection = collection(db, "events");
const eventCategoriesCollection = collection(db, "eventCategories");
const groupsCollection = collection(db, "groups");
const groupCategoriesCollection = collection(db, "groupCategories");
const financialCollection = collection(db, "financial");
const attendanceCollection = collection(db, "attendance");
const assetsCollection = collection(db, "assets");
const communicationsCollection = collection(db, "communications");
const usersCollection = collection(db, "users");

export { app, analytics, db, membersCollection, visitorsCollection, childrenCollection, staffCollection, youthCollection, menCollection, womenCollection, eventsCollection, eventCategoriesCollection, groupsCollection, groupCategoriesCollection, financialCollection, attendanceCollection, assetsCollection, communicationsCollection, usersCollection };
