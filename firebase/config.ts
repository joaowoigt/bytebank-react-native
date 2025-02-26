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

const firebaseConfig = {
  apiKey: "AIzaSyC9YyCJPk13Zs5oxLNctju435ZjUJf02fQ",
  authDomain: "fiap-644bb.firebaseapp.com",
  databaseURL: "https://fiap-644bb-default-rtdb.firebaseio.com",
  projectId: "fiap-644bb",
  storageBucket: "fiap-644bb.firebasestorage.app",
  messagingSenderId: "836373666755",
  appId: "1:836373666755:web:a84c98bcc933afc2783b76",
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
