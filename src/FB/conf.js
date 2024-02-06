import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAHmUZkho3iwTPYKaQhkKzp29aQOu9GXjk",
    authDomain: "app-2---feb-2024.firebaseapp.com",
    projectId: "app-2---feb-2024",
    databaseURL: "https://app-2---feb-2024-default-rtdb.firebaseio.com/",
    storageBucket: "app-2---feb-2024.appspot.com",
    messagingSenderId: "636563492414",
    appId: "1:636563492414:web:acc45a257accc3c8034b6f",
    measurementId: "G-Y7ZJLFXJNN"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();

export {db,app}