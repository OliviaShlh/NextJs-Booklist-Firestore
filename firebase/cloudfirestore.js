import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyB8Ubil8eS8wVr1Bm9uuV3gsU4M1Cca1VY",
    authDomain: "readingisfun-67682.firebaseapp.com",
    projectId: "readingisfun-67682",
    storageBucket: "readingisfun-67682.appspot.com",
    messagingSenderId: "375427931655",
    appId: "1:375427931655:web:1fa8e2b5a51af629f394a2",
    measurementId: "G-7B0W11GYN0"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export {db};
export default firebaseConfig;
