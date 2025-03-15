import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";

import {
  Auth,
  getAuth,
  initializeAuth,
  // @ts-ignore
  getReactNativePersistence,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "ADICIONE AQUI SUAS INFOS DO FIREBASE";
const AUTH_DOMAIN = "ADICIONE AQUI SUAS INFOS DO FIREBASE";
const DATABASE_URL = "ADICIONE AQUI SUAS INFOS DO FIREBASE";
const PROJECT_ID = "ADICIONE AQUI SUAS INFOS DO FIREBASE";
const STORAGE_BUCKET = "ADICIONE AQUI SUAS INFOS DO FIREBASE";
const MESSAGING_SENDER_ID = "ADICIONE AQUI SUAS INFOS DO FIREBASE";
const APP_ID = "ADICIONE AQUI SUAS INFOS DO FIREBASE";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASE_URL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

if (!getApps().length) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage),
  });
  db = getFirestore(app);
} else {
  app = getApp();
  auth = getAuth(app);
}

export { app, auth, db };
